<template>
	<view>
		
		<view class="p-s top-0 bg-white z100" :style="{paddingTop:statusBar+'px'}">
			<view class="font-36 text-center h100">购物车</view>
			<view class="p-aX h100 pl-3 font-34" :style="{top:statusBar+'px'}" @click="Type">{{type?'编辑':'完成'}}</view>
		</view>
		
		<!-- 空数据展示 -->
		<view class="p-fXY bg-f7" v-if="mainData&&mainData.length==0">
			<image src="../../static/images/car-icon.png" class="nullImg"></image>
			<view class="font-34 color8 text-center pt-5">购物车暂无商品</view>
			<view class="btnB" @click="Router.reLaunch({route:{path:'/pages/index/index'}})">去逛逛</view>
		</view>
		
		<view class="px-3" v-if="mainData&&mainData.length>0" v-for="(item,index) in mainData" :key="index">
			<view class="flex1 bB-f5">
				<image  :src="item.isSelect?'../../static/images/car-icon1.png':'../../static/images/car-icon3.png'" @click="choose(index)" class="wh30"></image>
				<view class="py-3 flex ml-3 flex-1">
					<image :src="item.mainImg&&item.mainImg[0]?item.mainImg[0].url:''" class="wh190 radius30"></image>
					<view class="flex5 font-28 pl-2 py-1 flex-1 ggtxt">
						<view class="avoidOverflow2">{{item.title}}</view>
						<view class="color8">{{item.sku&&item.sku[item.skuIndex]?item.sku[item.skuIndex].title:''}}</view>
						<view class="flex1">
							<view>￥{{item.sku&&item.sku[item.skuIndex]?item.sku[item.skuIndex].price:''}} x{{item.count}}</view>
							<image v-if="item.isSx" src="../../static/images/car-icon2.png" class="sx-icon"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		
		<view style="height: 244rpx;"></view>
		<view class="px-3 py-2 flex1 bT-e1 p-fX bg-white bottom">
			<view>
				<view class="font-34">总价: <text class="price">{{totalPrice}}</text></view>
				<view>预计省{{less}}元</view>
			</view>
			<view class="btnM" :class="!isCan?'o4':''" @click="submit">{{type?'去结算':'删除'}}</view>    <!-- 禁用是加类名 o4 -->
		</view>
		
		
		<!-- footer -->
		<view class="footer">
			<view class="item" @click="Router.redirectTo({route:{path:'/pages/index/index'}})">
				<view class="footIcon"><image src="../../static/images/nabar1.png" mode=""></image></view>
				<view>商城</view>
			</view>
			<view class="item on">
				<view class="footIcon"><image src="../../static/images/nabar2-a.png" class="onFootIcon"></image></view>
				<view>购物车</view>
			</view>
			<view class="item" @click="Router.redirectTo({route:{path:'/pages/user/user'}})">
				<view class="footIcon"><image src="../../static/images/nabar3.png" mode=""></image></view>
				<view>我的</view>
			</view>
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
				type:true,
				totalPrice:0,
				less:0,
				mainData:[],
				orderList:[],
				isCan:false
			}
		},
		onLoad() {
			const self = this;
			self.mainData = self.$Utils.getStorageArray('cartData');
			self.orderList = [
			];
			for (var i = 0; i < self.mainData.length; i++) {
				if(parseInt(self.mainData[i].end_time)<(new Date()).getTime()){
					self.mainData[i].isSx = true
					self.mainData[i].isSelect = false
				}

			};
			console.log('mainData',self.mainData)
			console.log('orderList',self.orderList)
			self.countTotalPrice();
			self.checkCan()
		},
		methods: {
			
			checkCan(){
				const self = this;
				self.isCan = false;
				for (var i = 0; i < self.mainData.length; i++) {
					if(self.mainData[i].isSelect){
						self.isCan = true
					};
					if(self.mainData[i].isSx){
						self.isCan = false;
					}
				}
			},
			
			submit(){
				const self = this;
				if(!self.isCan){
					self.$Utils.showToast('未勾选商品或商品已失效', 'none', 1000);
					return;
				}
				if(self.type){
					self.pay()
				}else{
					self.deleteAll()
				}
			},
			
			pay(e) {
				const self = this;
				self.orderList = [
				];
				for (var i = 0; i < self.mainData.length; i++) {
					if (self.mainData[i].isSelect) {
						self.orderList.push(
							{sku_id:self.mainData[i].sku[self.mainData[i].skuIndex].id,count:self.mainData[i].count,
							product:self.mainData[i],skuIndex:self.mainData[i].skuIndex},
						);
					};
				};
				if (self.orderList.length == 0) {
					self.$Utils.showToast('未选择商品', 'none', 1000);
					return;
				};
				uni.setStorageSync('payPro', self.orderList);
				self.$Router.navigateTo({
					route: {
						path: '/pages/orderDetail/orderDetail'
					}
				})
			},
			
			deleteAll() {
				const self = this;
				uni.showModal({
					title: '提示',
					content: '确认要删除选中商品吗？',
					showCancel: true,
					cancelText: '取消',
					confirmText: '确认',
					success: res => {
						if (res.confirm) {
							for (var i = 0; i < self.mainData.length; i++) {
								if(self.mainData[i].isSelect){
									self.$Utils.delStorageArray('cartData', self.mainData[i], 'id');
								}
							};
							self.mainData = self.$Utils.getStorageArray('cartData');
							self.checkCan()
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					},
				});
			},
			
			Type(){
				const self = this;
				self.type = !self.type;
			},
			
			choose(index) {
				const self = this;
				
				if (self.mainData[index].isSelect) {
					self.mainData[index].isSelect = false;
				} else {
					self.mainData[index].isSelect = true;
				};
				self.$Utils.setStorageArray('cartData', self.mainData[index], 'id', 999);
				self.countTotalPrice();
				self.checkCan()
			},
			
			countTotalPrice() {
				const self = this;
				self.totalPrice = 0;
				self.less = 0;
				for (var i = 0; i < self.mainData.length; i++) {
					if (self.mainData[i].isSelect) {
						self.totalPrice += self.mainData[i].sku[self.mainData[i].skuIndex].price * self.mainData[i].count;
						self.less += 
						(self.mainData[i].sku[self.mainData[i].skuIndex].o_price * self.mainData[i].count)-(self.mainData[i].sku[self.mainData[i].skuIndex].price * self.mainData[i].count);
					};
				};
				self.totalPrice = self.totalPrice.toFixed(2)
				self.less = self.less.toFixed(2)
				console.log(self.totalPrice)
			},
		}
	}
</script>


<style scoped>
.h100{line-height: 100rpx;}
.nullImg{width: 305rpx;height: 331rpx;margin: 40% auto 0;}
.btnB{width: 280rpx;margin-top: 20%;}
.btnM{width: 205rpx;line-height: 94rpx;border-radius: 47rpx;margin: 0;}

.ggtxt{height: 190rpx;}
.bottom{bottom: 110rpx;}
</style>
