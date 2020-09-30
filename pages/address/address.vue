<template>
	<view>
		
		<view v-if="mainData.length==0">
			<image src="../../static/images/address.png" class="null"></image>
			<view class="color8 font-34 text-center">您还没有收货地址哦~</view>
		</view>
		
		<view>
			<view v-for="(item,index) in mainData" :key="index">
				<view class="p-3">
					<view class="font-34 pb-3 line-h" @click="choose(index)">{{item.name}} <text class="font-30 color8 pl-3">{{item.phone}}</text></view>
					<view class="font-30 color8 bB-f5 pb-3">{{item.city+item.detail}}</view>
					<view class="flex1 pt-3 line-h">
						<view class="flex colorM">
							<image :src="item.isdefault==1?'../../static/images/add2.png':'../../static/images/add1.png'" class="wh30 mr-1"></image>
							<view>{{item.isdefault==1?'已设为默认':'设为默认'}}</view>
						</view>
						<view class="flex color8">
							<view class="flex" :data-id="item.id" @click="Router.navigateTo({route:{path:'/pages/addAddress/addAddress?id='+$event.currentTarget.dataset.id}})">
								<image src="../../static/images/add3.png" class="wh30 mr-1"></image>
								<view>编辑</view>
							</view>
							<view class="flex pl-3" :data-id="item.id" @click="deleteAddress($event.currentTarget.dataset.id)">
								<image src="../../static/images/add4.png" class="wh30 mr-1"></image>
								<view>删除</view>
							</view>
						</view>
					</view>
				</view>
				<view class="f720"></view>
			</view>
		</view>
		
		
		<view style="height: 175rpx;"></view>
		<view class="p-fX py-4 bg-white bottom-0">
			<view class="btnM" @click="Router.navigateTo({route:{path:'/pages/addAddress/addAddress'}})">添加地址</view>
		</view>
		
	</view>
</template>

<script>
	export default {

		data() {
			return {
				mainData: [],
				Router: this.$Router,
				choosedIndex: -1
			}
		},

		onShow(options) {
			const self = this;
			self.mainData = [];
			self.paginate = self.$Utils.cloneForm(self.$AssetsConfig.paginate);
			self.$Utils.loadAll(['getMainData'], self)
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

			choose(index) {
				const self = this;
				self.choosedIndex = index;
				uni.setStorageSync('choosedAddressData', self.mainData[index]);
				console.log('choosedIndex', self.choosedIndex);
				uni.navigateBack({
					delta: 1
				})
			},

			getMainData() {
				const self = this;

				const postData = {};
				postData.paginate = self.$Utils.cloneForm(self.paginate);
				postData.tokenFuncName = 'getProjectToken';
				postData.order = {
					isdefault:'desc'
				};
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.mainData.push.apply(self.mainData, res.info.data);
					} else {
						self.$Utils.showToast('没有更多了', 'none');
					};
					self.$Utils.finishFunc('getMainData');
				};
				self.$apis.addressGet(postData, callback);
			},





			deleteAddress(id) {
				const self = this;
				uni.showModal({
					title: '提示',
					content: '确认是否删除这个地址',
					success: function(res) {
						if (res.confirm) {
							const postData = {};
							postData.searchItem = {};
							postData.searchItem.id = id;
							postData.tokenFuncName = 'getProjectToken';
							const callback = (res) => {
								if (res) {
									self.mainData = [];
									self.getMainData();
								}
							};
							self.$apis.addressDelete(postData, callback)
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},


			updateAddress(id) {
				const self = this;
				const postData = {};

				postData.tokenFuncName = 'getProjectToken';

				postData.searchItem = {};
				postData.searchItem.id = id;
				postData.data = {
					isdefault: 1
				}
				const callback = (res) => {
					if (res) {
						self.mainData = [];
						self.getMainData();
					}
				};
				self.$apis.addressUpdate(postData, callback);
			},

		}
	}
</script>


<style scoped>
.null{width: 473rpx;height: 336rpx;margin: 40% auto 30rpx;}
.btnM{height: 94rpx;border-radius: 47rpx;margin: 0 30rpx;line-height: 94rpx;}
</style>
