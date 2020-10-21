<template>
	<view>
		
		<view class="bg-f7 bg-white font-32">
			<!-- 已添加地址 -->
			<view v-if="addressData.name">
				<view class="f720"></view>
				<view class="px-3 py-4 bg-white flex1"
				@click="Router.navigateTo({route:{path:'/pages/address/address'}})">
					<image src="../../static/images/order-icon2.png" class="dw-icon1 mr-3"></image>
					<view class="dzTxt pl-3 p-r flex-1">
						<view>{{addressData.name}} <text class="color8">{{addressData.phone}}</text></view>
						<view class="dz avoidOverflow2">{{addressData.city+addressData.detail}}</view>
					</view>
					<image src="../../static/images/store-icon10.png" class="r-icon"></image>
				</view>
				<view class="f720"></view>
			</view>
			<!-- 未添加地址 -->
			<view class="mx-3 p-3 bg-f7 flex1 radius20" v-else
			@click="Router.navigateTo({route:{path:'/pages/address/address'}})">
				<image src="../../static/images/store-icon8.png" class="dw-icon mr-1"></image>
				<view class="pl-2">添加收货地址</view>
				<image src="../../static/images/store-icon10.png" class="r-icon"></image>
			</view>
			
			
			<view class="flex1 pt-4 pb-3 bB-e1 mx-3">
				<view class="flex">
					<image src="../../static/images/order-icon1.png" class="dp-icon mr-1"></image>
					<view>金牌会员秒杀商品</view>
				</view>
				<button class="flex bg-white line-h" style="font-size: 15px;" open-type="contact">
					<image src="../../static/images/order-icon.png" class="wh30"></image>
					<view class="px-1">联系客服</view>
					<image src="../../static/images/store-icon10.png" class="r-icon"></image>
				</button>
			</view>
			
			<view class="py-3 flex mx-3">
				<image :src="mainData.product&&mainData.product.mainImg&&mainData.product.mainImg[0]?mainData.product.mainImg[0].url:''" class="wh190 radius30"></image>
				<view class="flex5 font-28 pl-3 py-1 flex-1 ggtxt">
					<view class="avoidOverflow2">{{mainData.product&&mainData.product.title?mainData.product.title:''}}</view>
					<view class="color8">{{mainData.product&&mainData.product.sku&&mainData.product.sku[mainData.skuIndex]?mainData.product.sku[mainData.skuIndex].title:''}}</view>
					<view>￥{{mainData.product&&mainData.product.sku&&mainData.product.sku[mainData.skuIndex]?mainData.product.sku[mainData.skuIndex].price:''}} x{{mainData.count}}</view>
				</view>
			</view>
			<view class="f720"></view>
			
			<view class="color8">
				<view class="flex1 py-4 bB-e1 mx-3">
					<view>购买数量</view>
					<view class="count flex">
						<view class='mr-1' @click="counter('-')"><image src="../../static/images/detail-icon5.png" class="jIcon1"></image></view>
						<view>{{mainData.count}}</view>
						<view class='ml-1' @click="counter('+')"><image src="../../static/images/detail-icon6.png" class="jIcon2"></image></view>
					</view>
				</view>
				
				<view class="flex1 py-4 bB-e1 mx-3">
					<view>配送方式</view>
					<view class="color3">快递 货到付款</view>
				</view>
				<view class="flex1 py-4 bB-e1 mx-3">
					<view>订单备注</view>
					<input type="text" v-model="passage1" placeholder="点击输入(选填)" placeholder-style="font-size:32rpx;color:#888" />
				</view>
				<view class="p-3 text-right">共<text class="color3">{{mainData.count}}</text>件，小计：<text class="price">{{totalPrice}}</text></view>
				<view class="f720"></view>
				
				<view class="flex1 p-3 bg-white">
					<view class="flex">
						<image src="../../static/images/vip-icon.png" class="wx-icon mr-1"></image>
						<view>微信支付</view>
					</view>
					<image src="../../static/images/vip-icon1.png" class="wh30"></image>
				</view>
				
			</view>
			
		</view>
		
		<view style="height: 150rpx;"></view>
		<view class="p-fX bottom-0 z100 bg-white flex1 px-3 py-2 bT-f5 font-34">
			<view class="text-right color8">共<text class="color3">{{mainData.count}}</text>件，小计：<text class="price">{{totalPrice}}</text></view>
			<view class="btnAuto" @click="Utils.stopMultiClick(submit)">立即购买</view>
		</view>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Router:this.$Router,
				Utils:this.$Utils,
				pay:{
					
				},
				addressData:{},
				mainData:{},
				totalPrice:0,
				passage1:''
			}
		},
		onLoad(options) {
			const self = this;
			//uni.showLoading();
			self.mainData = uni.getStorageSync('payPro')[0];
			self.countTotalPrice()
		},
		onShow() {
			const self = this;
			if(uni.getStorageSync('choosedAddressData')){
				self.addressData = uni.getStorageSync('choosedAddressData')
			}else{
				self.getAddressData()
			};
		},
		methods: {
			
			submit(){
				const self = this;
				uni.setStorageSync('canClick', false);
				if(JSON.stringify(self.addressData) == '{}'){
					uni.setStorageSync('canClick', true);
					self.$Utils.showToast('请选择收货地址','none')
					return
				};
				var orderList = []
				var data = {price:self.pay.wxPay.price,type:1,level:1,passage1:self.passage1};
				orderList.push({sku_id:self.mainData.sku_id,count:self.mainData.count,data: data,
				snap_address: self.addressData})
				self.addOrder(orderList)
			},
			
			addOrder(orderList) {
				const self = this;	
				const postData = {}; 
				postData.orderList = self.$Utils.cloneForm(orderList);
				postData.data = {
				};
				postData.tokenFuncName = 'getProjectToken';
				postData.data.snap_address = self.addressData
				const callback = (res) => {
					uni.setStorageSync('canClick', true);
					if (res && res.solely_code == 100000) {
						self.orderId = res.info.id;
						/* var array = self.$Utils.getStorageArray('cartData');
						for (var i = 0; i < orderList.length; i++) {
							for (var j = 0; j < array.length; j++) {
								if(orderList[i].sku_id == array[j].sku[array[j].skuIndex].id){
									self.$Utils.delStorageArray('cartData', orderList[i], 'id');
								}
							}
						}; */
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
				const postData = self.$Utils.cloneForm(self.pay);	
				postData.tokenFuncName = 'getProjectToken',
				postData.searchItem = {
					id: self.orderId
				};
				const callback = (res) => {
					if (res.solely_code == 100000) {
						uni.setStorageSync('canClick', true);
						if (res.info) {
							const payCallback = (payData) => {
								console.log('payData', payData)
								if (payData == 1) {
									self.$Utils.showToast('支付成功','none')
									setTimeout(function() {
										self.$Router.redirectTo({route:{path:'/pages/paySuccess/paySuccess'}})
									}, 1000);
								} else {
									uni.setStorageSync('canClick', true);
									self.$Utils.showToast('支付失败','none')
								};
							};
							self.$Utils.realPay(res.info, payCallback);
						} else {
							self.$Utils.showToast('支付成功','none')
							setTimeout(function() {
								self.$Router.redirectTo({route:{path:'/pages/paySuccess/paySuccess'}})
							}, 1000);
						};
					} else {
						uni.setStorageSync('canClick', true);
						uni.showToast({
							title: res.msg,
							duration: 2000
						});
					};
				};
				self.$apis.pay(postData, callback);
			},
			
			counter(type) {
				const self = this;
				if (type == '+') {
					self.mainData.count++;
				} else {
					if (self.mainData.count > 1) {
						self.mainData.count--;
					}
				};
				self.countTotalPrice();
			},
			
			countTotalPrice() {
				const self = this;
				self.totalPrice = 0;
				self.totalPrice = self.mainData.product.sku[self.mainData.skuIndex].price*self.mainData.count
				self.totalPrice = parseFloat(self.totalPrice).toFixed(2)
				if (self.totalPrice > 0) {
					self.pay.wxPay = {
						price: self.totalPrice,
					};
				} else {
					  delete self.pay.wxPay;	 
				};
				console.log(self.pay)
			},
			
			getAddressData() {
				const self = this;		
				const postData = {};
				postData.tokenFuncName = 'getProjectToken';
				postData.searchItem = {
					isdefault:1
				};
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.addressData = res.info.data[0];
					}
				};
				self.$apis.addressGet(postData, callback);
			},
			
		}
	}
</script>
<style>page{background-color: #F7F9FB;}</style>
<style scoped>
.ggtxt{height: 190rpx;}
.dz{width: 506rpx;}
.dzTxt::before{content: '';height: 66rpx;width: 1rpx;background-color: #e1e1e1;position: absolute;left: 0;top: 50%;margin-top: -33rpx;}
input{flex: 1;text-align: right;padding-left: 30rpx;}
.btnAuto{width: 325rpx;background: #F78226;margin: 0;}
</style>
