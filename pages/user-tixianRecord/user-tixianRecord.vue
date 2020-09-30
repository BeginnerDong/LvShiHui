<template>
	<view class="line-h">
		
		<view class="p-3 bB-e1" v-for="(item,index) in mainData" :key="index">
			<view class="font-w pb-3 font-32">提现</view>
			<view class="flex1">
				<view>
					<view>{{item.count?item.count:''}}</view> <view class="font-24 color8 pt-2">金额</view>
				</view>
				<view>
					<view :class="item.withdraw_status!=1?'colorM':''">{{item.withdraw_status==0?'审核中':(item.withdraw_status==1?'已发放':'已拒绝')}}</view> <view class="font-24 color8 pt-2">状态</view>
				</view>
				<view class="text-right">
					<view>{{item.create_time}}</view> <view class="font-24 color8 pt-2">时间</view>
				</view>
			</view>
		</view>

		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mainData:[]
			}
		},
		onLoad() {
			const self = this;
			self.paginate = self.$Utils.cloneForm(self.$AssetsConfig.paginate);
			self.$Utils.loadAll(['getMainData'], self);
		},
		onReachBottom() {
			console.log('onReachBottom')
			const self = this;
			if (!self.isLoadAll && uni.getStorageSync('loadAllArray')) {
				self.paginate.currentPage++;
				self.getMainData()
			};
		},
		methods: {
			getMainData() {
				const self = this;
				const postData = {};
				postData.paginate = self.$Utils.cloneForm(self.paginate);
				postData.tokenFuncName = 'getProjectToken';
				postData.searchItem = {
					thirdapp_id:2,
					type:['in',[2,3]],
					count:['<',0],
					status:['in',[1,-1]]
				};
				postData.noLoading = true;
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.mainData.push.apply(self.mainData,res.info.data);
						for (var i = 0; i < self.mainData.length; i++) {
							self.mainData[i].create_time  = self.mainData[i].create_time.substr(0,10);
						}
					};
					self.$Utils.finishFunc('getMainData');
				};
				self.$apis.flowLogGet(postData, callback);
			},
		}
	}
</script>

<style>

</style>
