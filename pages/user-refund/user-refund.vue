<template>
	<view>
		
		<view class="p-3 p-r">
			<image src="../../static/images/qian-img.png" mode="widthFix"></image>
			<view class="p-aXY p-4 m-3 colorf line-h">
				<view class="pb-3">
					<view class="o5">可提现</view><view class="price1">{{mlCan}}</view>
				</view>
				<view class="flex1 pt-3">
					<view>
						<view class="o5">已提现</view><view class="price1">{{-compute.mlHas?-compute.mlHas:0}}</view>
					</view>
					<view>
						<view class="o5">累计返钱(≈{{achievementCompute.count?achievementCompute.count:0}}吨)</view><view class="price1">{{compute.ml?compute.ml:0}}</view>
					</view>
				</view>
				<view class="sign flex" @click="Router.navigateTo({route:{path:'/pages/user-tixianRecord/user-tixianRecord'}})">
					<image src="../../static/images/qian-icon1.png" class="wh28 mr-1"></image>
					<view>提现记录</view>
				</view>
			</view>
		</view>
		<view class="f720"></view>
		
		<view class="line-h">
			<view class="font-32 p-3 bB-e1">累计返钱记录</view>
			
			<view class="p-3 bB-e1" v-if="flowLogData.length>0" v-for="(item,index) in flowLogData" :key='index'>
				<view class="font-32 font-w pb-3">买铝</view>
				<view class="flex1">
					<view>
						<view>{{item.ach&&item.ach.weight?item.ach.weight:''}}吨</view> <view class="font-24 color8 pt-2">数量</view>
					</view>
					<view>
						<view>{{item.count?item.count:''}}</view> <view class="font-24 color8 pt-2">返钱</view>
					</view>
					<view class="text-right">
						<view>{{item.create_time?item.create_time:''}}</view> <view class="font-24 color8 pt-2">入账时间</view>
					</view>
				</view>
			</view>
			
			<view v-if="flowLogData.length==0" style="width: 100%;text-align: center;margin-top: 50rpx;">暂无返佣记录</view>
		</view>
		
		<view style="height: 190rpx;"></view>
		<view class="px-3 pb-2 p-fX bottom-0 bT-e1 bg-white">
			<view class="font-32 pt-3 pb-3 flex1 line-h">
				<view class="color8">可提现数量</view>
				<view>￥{{mlCan}}</view>
			</view>
			<view class="btnM" :style="mlCan==0?'opacity:0.5':''" 
			@click="Router.navigateTo({route:{path:'/pages/user-tixianApply/user-tixianApply?type=2&num='+mlCan}})">申请提现</view>
		</view>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Router:this.$Router,
				compute:{},
				flowLogData:[],
				mlCan:0,
				achievementCompute:{}
			}
		},
		
		onLoad() {
			const self = this;
			self.paginate = self.$Utils.cloneForm(self.$AssetsConfig.paginate);
			self.$Utils.loadAll(['getFlowLogData','getAchievementData'], self);
		},
		
		onReachBottom() {
			console.log('onReachBottom')
			const self = this;
			if (!self.isLoadAll && uni.getStorageSync('loadAllArray')) {
				self.paginate.currentPage++;
				self.getFlowLogData()
			};
		},
		
		methods: {
			
			getAchievementData() {
				const self = this;
				const postData = {};
				postData.tokenFuncName = 'getProjectToken';
				postData.searchItem = {
					thirdapp_id:2,
				};
				postData.noLoading = true;
				postData.compute = {
				  count:[
					'sum',
					'weight',
				  ],
				};
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.achievementCompute = res.info.compute;
					};
					self.$Utils.finishFunc('getAchievementData');
				};
				self.$apis.achievementGet(postData, callback);
			},
			
			getFlowLogData() {
				const self = this;
				const postData = {};
				postData.paginate = self.$Utils.cloneForm(self.paginate);
				postData.tokenFuncName = 'getProjectToken';
				postData.searchItem = {
					thirdapp_id:2,
					type:2,
					count:['>',0]
				};
				postData.noLoading = true;
				postData.compute = {
				  ml:[
					'sum',
					'count',
					{user_no:wx.getStorageSync('user_info').user_no,type:2,count:['>',0],status:1}
				  ],
				  mlHas:[
					'sum',
					'count',
					{user_no:wx.getStorageSync('user_info').user_no,type:2,count:['<',0],status:1}
				  ],		
				};
				postData.getAfter = {
					ach:{
						tableName:'Achievement',
						middleKey:'relation_id',
						key:'id',
						searchItem:{status:1},
						condition:'=',
						info:['weight']
					}
				};
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.flowLogData.push.apply(self.flowLogData,res.info.data);
						self.compute = res.info.compute;
						self.mlCan = self.compute.ml + self.compute.mlHas;
						for (var i = 0; i < self.flowLogData.length; i++) {
							self.flowLogData[i].create_time  = self.flowLogData[i].create_time.substr(0,10);
						}
					};
					self.$Utils.finishFunc('getFlowLogData');
				};
				self.$apis.flowLogGet(postData, callback);
			},
		}
	}
</script>

<style scoped>
.price1{color: #fff;font-size: 48rpx;font-weight: bold;padding-top: 25rpx;}
.price1::before{font-size: 32rpx;}
.sign{line-height: 57rpx;border-radius: 28rpx 0 0 28rpx;position: absolute;right: 0;top: 50rpx;color: #fff;;padding: 0 30rpx;background-color: #FCA50F;}
</style>
