<template>
	<view>
		<image src="../../static/images/myVip-img.jpg" mode="widthFix" class="p-fX"></image>
		<view class="font-38 text-center colorf line-h100 p-r" :style="{paddingTop:statusBar+'px'}">我的会员</view>
		<view class="p-3 p-f" :style="{top:statusBar+'px'}" @click="Router.back({route:{path:-1}})">
			<image src="../../static/images/back.png" class="back"></image>
		</view>
		
		<view class="p-r pt-4 top">
			<image src="../../static/images/card2.png" class="bgImg"></image>
			
			<view class="p-r pt-4 px-3 flex1 vipCon1">
				<view class="font-40 colorf flex">
					<view class="wh55 radius-5 mr-2" style="overflow: hidden;border-radius: 50%"><open-data type="userAvatarUrl"></open-data></view>
					<!-- <image src="../../static/images/user.png" class="wh55 radius-5 mr-2"></image> -->
					<view v-if="userInfoData.is_check!=2"><open-data type="userNickName"></open-data></view>
					<view v-else>{{userInfoData.name?userInfoData.name:''}}</view>
				</view>
				<view class="line-h text-right">
					<view class="font-32 colorf">金牌会员</view>
					<view class="colorZ pt-2">{{less}}天后到期</view>
				</view>
			</view>
			
			<view class="btnBox p-r">
				<image src="../../static/images/vipBtn.png" mode="widthFix"></image>
				<view class="p-aXY flex color8">
					<view class="w-50 pl-4 c1"><text class="price1">{{cardData.price?cardData.price:''}}</text>/年</view>
					<view class="w-50 font-36 colorG pl-3" @click="Utils.stopMultiClick(message)">立即续费</view>
				</view>
			</view>
		</view>
		
		<view class="mt-4">
			<image v-for="(item,index) in artData.mainImg" :key="index" :src="item.url" mode="widthFix"></image>
		</view>
		
	</view>
</template>

<script>
	const app = getApp();
	export default {
		data() {
			return {
				Router:this.$Router,
				statusBar: app.globalData.statusBar,
				less:0,
				userInfoData:{},
				cardData:{},
				artData:{},
				Utils:this.$Utils
			}
		},
		onLoad() {
			const self = this;
			self.$Utils.loadAll(['getUserInfoData','getCardData','getArtData'], self);
			//self.paginate = self.$Utils.cloneForm(self.$AssetsConfig.paginate);
		},
		methods: {
			
			message(){
				const self = this;
				 //self.goPay()
				uni.setStorageSync('canClick', false);
				wx.requestSubscribeMessage({
				  tmplIds: ['Jai1dlDTUQq9dlLyiHeRUF0VXlKq7Zz2VR_au-g5PNQ'],
				  success (res) { 
					  console.log(res)
					  if(res){
						  self.submit()
					  }
				  },
				  fail(err) {    //失败
				  					
				  	self.submit()
				  }
				})
			},
			
			getArtData() {
				const self = this;
				const postData = {};
				postData.searchItem = {
					thirdapp_id: 2,
					menu_id:2,
					title:'会员权益'
				};
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.artData = res.info.data[0]
					}
					self.$Utils.finishFunc('getArtData');
				};
				self.$apis.articleGet(postData, callback);
			},
			
			getCardData() {
				const self = this;
				const postData = {};
				postData.searchItem = {
					thirdapp_id: 2,
					type:2
				};
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.cardData = res.info.data[0];
						self.cardData.price = parseFloat(self.cardData.price);
						/* self.yearLater = (new Date()).getTime()+86400000*self.cardData.duration; */
					}
					self.$Utils.finishFunc('getCardData');
				};
				self.$apis.productGet(postData, callback);
			},
			
			submit(){
				const self = this;
				uni.setStorageSync('canClick', false);
				var orderList = []
				var data = {
					type:2,
					level:1
				};
				orderList.push({product_id:self.cardData.id,count:1,data:data})
				self.addOrder(orderList)
			},
			
			addOrder(orderList) {
				const self = this;	
				const postData = {}; 
				postData.orderList = self.$Utils.cloneForm(orderList);
				postData.tokenFuncName = 'getProjectToken';
				const callback = (res) => {
					uni.setStorageSync('canClick', true);
					if (res && res.solely_code == 100000) {
						self.orderId = res.info.id;
						self.goPay()
					} else {		
						uni.showToast({
							title: res.msg,
							duration: 2000
						});
					};		
				};
				self.$apis.addOrder(postData, callback);
			},
			
			goPay() {
				const self = this;	
				const postData = {};
				postData.wxPay = {
					price:parseFloat(self.cardData.price).toFixed(2),
				};
				postData.tokenFuncName = 'getProjectToken',
				postData.searchItem = {
					id: self.orderId
				};
				/* postData.payAfter = [
					{
						tableName: 'UserInfo',
						FuncName: 'update',
						searchItem:{
							user_no:uni.getStorageSync('user_info').user_no
						},
						data: {
							behavior:2,
							deadline:(self.userData.info.deadline==0?(new Date()).getTime() / 1000:self.userData.info.deadline)+self.productData[self.vipCurr].duration*86400
						},
					},
				]; */
				const callback = (res) => {
					if (res.solely_code == 100000) {
						uni.setStorageSync('canClick', true);
						if (res.info) {
							const payCallback = (payData) => {
								console.log('payData', payData)
								if (payData == 1) {
									self.$Utils.showToast('支付成功','none')
									setTimeout(function() {
										self.Router.redirectTo({route:{path:'/pages/paySuccess/paySuccess?type=vip'}})
									}, 1000);
								} else {
									uni.setStorageSync('canClick', true);
									self.$Utils.showToast(res.msg,'none')
								};
							};
							self.$Utils.realPay(res.info, payCallback);
						} else {
							self.$Utils.showToast('支付成功','none')
							setTimeout(function() {
								self.Router.redirectTo({route:{path:'/pages/paySuccess/paySuccess?type=vip'}})
							}, 1000);
						};
					} else {
						uni.setStorageSync('canClick', true);
						self.$Utils.showToast(res.msg,'none')
					};
				};
				self.$apis.pay(postData, callback);
			},
			
			getUserInfoData() {
				const self = this;
				const postData = {};
				postData.tokenFuncName = 'getProjectToken';
				postData.noLoading = true;
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.userInfoData = res.info.data[0];
						if(self.userInfoData.behavior == 1){
							self.less = parseInt((self.userInfoData.deadline - (new Date()).getTime()/1000)/86400)
						}
					};
					self.$Utils.finishFunc('getUserInfoData');
				};
				self.$apis.userInfoGet(postData, callback);
			},
		}
	}
</script>

<style>
page{background-color: #0B0E1A;}
</style>
<style scoped>
.c1{color: #A28A60;}
.line-h100{line-height: 100rpx;}
.top{width: 630rpx;margin: 0 auto;}
.bgImg{width: 630rpx;height: 340rpx;position: absolute;top: 0;bottom: 0;right: 0;left: 0; margin: 40rpx auto 0;}
.btnBox{width: 544rpx;height: 82rpx;margin: 60rpx auto 0;text-align: center;}
.price1{color: #2C2419;font-size: 56rpx;}
</style>