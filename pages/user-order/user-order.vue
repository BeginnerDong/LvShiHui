<template>
	<view>
		
		<view class="list bT-f5 bB-f5">
			<view class="li" :class="liCurr==0?'on':''" @click="changeLi(0)">全部</view>
			<view class="li" :class="liCurr==1?'on':''" @click="changeLi(1)">待付款</view>
			<view class="li" :class="liCurr==2?'on':''" @click="changeLi(2)">待发货</view>
			<view class="li" :class="liCurr==3?'on':''" @click="changeLi(3)">待收货</view>
			<view class="li" :class="liCurr==4?'on':''" @click="changeLi(4)">已收货</view>
		</view>
		
		<view class="bg-white mb-2" v-for="(item,index) in mainData" :key="index">
			<view class="flex1 pt-4 pb-3 bB-f5 mx-3 font-32">
				<view class="flex">
					<image src="../../static/images/order-icon1.png" class="dp-icon mr-1"></image>
					<view>金牌会员秒杀商品</view>
				</view>
				<view class="colorM font-30" v-if="item.pay_status==0">买家待付款</view>
				<view class="colorM font-30" v-if="item.pay_status==1&&item.transport_status==0">卖家待发货</view>
				<view class="colorM font-30" v-if="item.pay_status==1&&item.transport_status==1">卖家已发货</view>
				<view class="colorM font-30" v-if="item.pay_status==1&&item.transport_status==2">买家已收货</view>
			</view>
			<view class="py-3 flex ml-3 pr-3 flex-1 bB-f5" :data-id="item.id"
			@click="Router.navigateTo({route:{path:'/pages/user-orderDetail/user-orderDetail?id='+$event.currentTarget.dataset.id}})">
				<image :src="item.orderItem&&item.orderItem[0]&&item.orderItem[0].snap_product
				&&item.orderItem[0].snap_product.product&&item.orderItem[0].snap_product.product.mainImg
				&&item.orderItem[0].snap_product.product.mainImg[0]?item.orderItem[0].snap_product.product.mainImg[0].url:''" class="wh190 radius30"></image>
				<view class="flex5 font-28 pl-2 py-1 flex-1 ggtxt">
					<view class="avoidOverflow2">{{item.orderItem&&item.orderItem[0]&&item.orderItem[0].snap_product
				&&item.orderItem[0].snap_product.product?item.orderItem[0].snap_product.product.title:''}}</view>
					<view class="color8">{{item.sku&&item.sku[0]?item.sku[0].title:''}}</view>
					<view class="flex1">
						<view>￥{{item.price}} x{{item.count}}</view>
						<image v-if="item.isSx" src="../../static/images/car-icon2.png" class="sx-icon"></image>
					</view>
				</view>
			</view>
			<view class="text-right color8 p-3 font-34">共<text class="color3">{{item.count}}</text>件，合计:<text class="price">{{item.price}}</text></view>
			<view class="d-flex j-end a-center pb-3 px-3">
				<view class="btn" v-if="item.pay_status==0" @click="orderDelete(index)">取消订单</view>
				<view class="btn btn1" v-if="item.pay_status==0" :class="item.isSx?'o3':''" @click="goPay(index)">付款</view>
				<view class="btn btn1"  v-if="item.transport_status==1" @click="orderUpdate(index)">确认收货</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Router:this.$Router,
				liCurr:0,
				searchItem:{
					type:1,
					level:1,
					thirdapp_id:2
				},
				mainData:[],
				pay:{}
			}
		},
		
		onLoad(options) {
			const self = this;
			self.paginate = self.$Utils.cloneForm(self.$AssetsConfig.paginate);
			//self.$Utils.loadAll(['getMainData'], self);
			if(options.num){
				self.num = options.num
			}
		},
		
		onShow() {
			const self = this;
			if(self.num){
				console.log(222)
				self.changeLi(self.num)
			}else{
				self.getMainData(true)
			}
			
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
			
			goPay(index) {
				const self = this;	
				self.pay.wxPay = {
					price: self.mainData[index].price,
				};
				const postData = self.$Utils.cloneForm(self.pay);	
				postData.tokenFuncName = 'getProjectToken',
				postData.searchItem = {
					id: self.mainData[index].id
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
										self.getMainData(true)
									}, 1000);
								} else {
									self.$Utils.showToast('支付失败','none')
								};
							};
							self.$Utils.realPay(res.info, payCallback);
						} else {
							self.$Utils.showToast('支付成功','none')
							setTimeout(function() {
								self.getMainData(true)
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
			
			orderUpdate(index){
				const self = this;
				uni.setStorageSync('canClick', false);
				uni.showModal({
					content:'确认您已收到该货物',
					success(res) {
						if(res.confirm){
							const postData = {};
							postData.tokenFuncName = 'getProjectToken';
							postData.data = {
								transport_status:2,
								receive_time:(new Date()).getTime()/1000
							};
							postData.searchItem = {
								id:self.mainData[index].id,
							};
							const callback = (data) => {
								
								if (data && data.solely_code == 100000) {
									self.$Utils.showToast('操作成功','none');
									setTimeout(function() {
										self.getMainData(true)
									}, 1000);
								} else {
									self.$Utils.showToast(data.msg,'none')
								}
							};
							self.$apis.orderUpdate(postData, callback);
						}
					}
				})
			},
			
			orderDelete(index){
				const self = this;
				uni.setStorageSync('canClick', false);
				uni.showModal({
					content:'确认取消该订单吗',
					success(res) {
						if(res.confirm){
							const postData = {};
							postData.tokenFuncName = 'getProjectToken';
							postData.data = {
								status:-1,
							};
							postData.searchItem = {
								id:self.mainData[index].id,
							};
							const callback = (data) => {
								
								if (data && data.solely_code == 100000) {
									self.$Utils.showToast('操作成功','none');
									setTimeout(function() {
										self.getMainData(true)
									}, 1000);
								} else {
									self.$Utils.showToast(data.msg,'none')
								}
							};
							self.$apis.orderUpdate(postData, callback);
						}
					}
				})
			},
			
			getMainData(isNew) {
				const self = this;
				if (isNew) {
					self.mainData = [];
					self.paginate = {
						count: 0,
						currentPage: 1,
						is_page: true,
						pagesize: 10
					}
				};
				const postData = {};
				postData.tokenFuncName = 'getProjectToken';
				postData.paginate = self.$Utils.cloneForm(self.paginate);
				postData.searchItem = self.$Utils.cloneForm(self.searchItem);
				postData.searchItem.user_no = uni.getStorageSync('user_info').user_no;
				postData.getAfter = {
					orderItem:{
						tableName:'OrderItem',
						middleKey:'order_no',
						key:'order_no',
						searchItem:{status:1},
						condition:'='
					},
					sku:{
						tableName:'Sku',
						middleKey:'sku_id',
						key:'id',
						searchItem:{status:1},
						condition:'='
					}
				};
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.mainData.push.apply(self.mainData, res.info.data);
						for (var i = 0; i < self.mainData.length; i++) {
							if((parseInt(self.mainData[i].sku[0].product.end_time)<(new Date()).getTime()||self.mainData[i].sku[0].product.on_shelf==0)&&self.mainData[i].pay_status==0){
								self.mainData[i].isSx = true
							}
						}
					}
					console.log('self.mainData', self.mainData)
					uni.setStorageSync('canClick', true);
					self.$Utils.finishFunc('getMainData');
				};
				self.$apis.orderGet(postData, callback);
			},
			
			changeLi(i){
				const self = this;
				if(self.liCurr != i){
					self.liCurr = i
					if(self.liCurr==0){
						delete self.searchItem.pay_status;
						delete self.searchItem.transport_status;
					}else if(self.liCurr==1){
						self.searchItem.pay_status = 0;
						delete self.searchItem.transport_status;
					}else if(self.liCurr==2){
						self.searchItem.pay_status = 1;
						self.searchItem.transport_status = 0;
					}else if(self.liCurr==3){
						self.searchItem.pay_status = 1;
						self.searchItem.transport_status = 1;
					}else if(self.liCurr==4){
						self.searchItem.pay_status = 1;
						self.searchItem.transport_status = 2;
					};
					self.getMainData(true)
				}
			},

		}
	}
</script>
<style>
page{background-color: #F7F9FB;}
</style>

<style scoped>
.li{width: 20%;}
.ggtxt{height: 190rpx;}
.btn{width: 160rpx;line-height: 56rpx;font-size: 30rpx;color: #888;border: 1px solid #e1e1e1;text-align: center;margin-left: 40rpx;border-radius: 28rpx;}
.btn1{border: none;background-color: #F87F27;color: #fff;}
</style>
