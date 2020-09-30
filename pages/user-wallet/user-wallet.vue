<template>
	<view>
		
		<view class="p-3 Mgb line-h p-r top">
			<image src="../../static/images/my-img3.png" mode="widthFix"></image>
			<view class="topTxt p-aX">
				<view class="font-40 pb-3">总资产 <text class="color8">（推广佣金+买铝返钱）</text></view>
				<view class="font-60 font-w price">{{compute.all?compute.all:0}}</view>
			</view>
		</view>
		
		<view class="wallet radius50-T bg-white font-32 color3 line-h p-r px-3 pt-2">
			<view class="pb-3 bB-f5" @click="Router.navigateTo({route:{path:'/pages/user-extend/user-extend'}})">
				<view class="flex1 py-3">
					<view class="font-w">推广佣金</view>
					<image src="../../static/images/qian-icon.png" class="q-icon"></image>
				</view>
				<view class="flex1">
					<view class="d-flex flex-column a-start">
						<view class="font-26 color8 pb-2">总金额</view><view class="price">{{compute.tg?compute.tg:0}}</view>
					</view>
					<view class="d-flex flex-column a-center">
						<view class="font-26 color8 pb-2">已发放</view><view class="price">{{-compute.tgHas?-compute.tgHas:0}}</view>
					</view>
					<view class="d-flex flex-column a-end">
						<view class="font-26 color8 pb-2">未发放</view><view class="price">{{tgCan}}</view>
					</view>
				</view>
			</view>
			
			<view class="pb-3" @click="Router.navigateTo({route:{path:'/pages/user-refund/user-refund'}})">
				<view class="flex1 py-3">
					<view class="font-w">买铝返现</view>
					<image src="../../static/images/qian-icon.png" class="q-icon"></image>
				</view>
				<view class="flex1">
					<view class="d-flex flex-column a-start">
						<view class="font-26 color8 pb-2">总金额</view><view class="price">{{compute.ml?compute.ml:0}}</view>
					</view>
					<view class="d-flex flex-column a-center">
						<view class="font-26 color8 pb-2">已发放</view><view class="price">{{-compute.mlHas?-compute.mlHas:0}}</view>
					</view>
					<view class="d-flex flex-column a-end">
						<view class="font-26 color8 pb-2">未发放</view><view class="price">{{mlCan}}</view>
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Router:this.$Router,
				compute:{},
				tgCan:0,
				mlCan:0
			}
		},
		onLoad() {
			const self = this;
			//self.paginate = self.$Utils.cloneForm(self.$AssetsConfig.paginate);
			self.$Utils.loadAll(['getFlowLogData'], self);
		},
		methods: {
			
			getFlowLogData() {
				const self = this;
				const postData = {};
				postData.tokenFuncName = 'getProjectToken';
				postData.searchItem = {
					thirdapp_id:2,
					type:['in',[2,3]]
				};
				postData.noLoading = true;
				postData.compute = {
				  tg:[
					'sum',
					'count',
					{user_no:wx.getStorageSync('user_info').user_no,type:3,count:['>',0],status:1}
				  ],
				  tgHas:[
					'sum',
					'count',
					{user_no:wx.getStorageSync('user_info').user_no,type:3,count:['<',0],status:1}
				  ],
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
				  all:[
					'sum',
					'count',
					{user_no:wx.getStorageSync('user_info').user_no,type:['in',[2,3]],count:['>',0],status:1}  
				  ],

				};
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.flowLogData = res.info.data;
						self.compute = res.info.compute;
						self.tgCan = self.compute.tg + self.compute.tgHas;
						self.mlCan = self.compute.ml + self.compute.mlHas
					};
				};
				self.$apis.flowLogGet(postData, callback);
			},
			
		}
	}
</script>
<style>page{background-color: #F7F9FB;}</style>

<style scoped>
.top{padding-bottom: 100rpx;}
.topTxt{top: 53%;padding-left: 80rpx;}
.price{color: #333;}
.wallet{margin-top: -50rpx;}
</style>
