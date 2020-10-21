<template>
	<view>
		<!-- 代付款 -->
		<view class="p-3 Mgb flex1 colorf orderTop" v-show="mainData.pay_status==0">
			<view class="line-h">
				<view class="font-52 pb-2 font-w">买家待付款</view>
				<!-- <view class="colorG">剩 <text class="colorf px-1">23:15:56</text> 订单将自动关闭</view> -->
			</view>
			<image src="../../static/images/order-icon3.png" class="icon1"></image>
		</view>
		<!-- 待发货 -->
		<view class="p-3 Mgb flex1 colorf orderTop" v-show="mainData.pay_status==1&&mainData.transport_status==0">
			<view class="line-h">
				<view class="font-52 pb-2 font-w">等待卖家发货</view>
				<view class="colorG">卖家将尽快为您发货 请耐心等待</view>
			</view>
			<image src="../../static/images/order-icon6.png" class="icon2"></image>
		</view>
		<!-- 待收货 -->
		<view class="p-3 Mgb flex1 colorf orderTop" v-show="mainData.pay_status==1&&mainData.transport_status==1">
			<view class="line-h">
				<view class="font-52 pb-2 font-w">卖家已发货</view>
				<view class="colorG">您的包裹已寄出 请注意查收~</view>
			</view>
			<image src="../../static/images/order-icon7.png" class="icon3"></image>
		</view>
		<!-- 已收货 -->
		<view class="p-3 Mgb flex1 colorf orderTop" v-show="mainData.pay_status==1&&mainData.transport_status==2">
			<view class="line-h">
				<view class="font-52 pb-2 font-w">买家已收货</view>
				<view class="colorG">合作愉快哦~</view>
			</view>
			<image src="../../static/images/order-icon8.png" class="wh100"></image>
		</view>
		
		<view class="radius50-T overflow-h bg-f7 order">
			<view class="px-3 py-4 mb-2 bg-white flex1">
				<image src="../../static/images/order-icon2.png" class="dw-icon1 mr-3"></image>
				<view class="dzTxt pl-3 p-r flex-1">
					<view>{{mainData.snap_address?mainData.snap_address.name:''}} <text class="color8 pl-1">{{mainData.snap_address?mainData.snap_address.phone:''}}</text></view>
					<view class="dz avoidOverflow2">{{mainData.snap_address.city+mainData.snap_address.detail}}</view>
				</view>
				<!-- <image src="../../static/images/store-icon10.png" class="r-icon"></image> -->
			</view>
			
			<view class="bg-white mb-2">
				<view class="flex1 pt-4 pb-3 bB-f5 mx-3 font-32">
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
				<view class="py-3 flex ml-3 pr-3 flex-1 bB-f5">
					<image :src="mainData.orderItem&&mainData.orderItem[0]&&mainData.orderItem[0].snap_product
				&&mainData.orderItem[0].snap_product.product&&mainData.orderItem[0].snap_product.product.mainImg
				&&mainData.orderItem[0].snap_product.product.mainImg[0]?mainData.orderItem[0].snap_product.product.mainImg[0].url:''" class="wh190 radius30"></image>
					<view class="flex5 font-28 pl-2 py-1 flex-1 ggtxt" style="height: 190rpx;">
						<view class="avoidOverflow2">{{mainData.orderItem&&mainData.orderItem[0]&&mainData.orderItem[0].snap_product
				&&mainData.orderItem[0].snap_product.product?mainData.orderItem[0].snap_product.product.title:''}}</view>
						<view class="color8">{{mainData.sku&&mainData.sku[0]?mainData.sku[0].title:''}}</view>
						<view class="flex1">
							<view>￥{{mainData.price}} x{{mainData.count}}</view>
						</view>
					</view>
				</view>
				<view class="font-30 ml-3 pr-3 py-3 bB-f5 line-h">
					<view class="flex1 pb-4">
						<view class="color8">商品总价</view>
						<view>￥{{mainData.price}}</view>
					</view>
					<view class="flex1 pb-4">
						<view class="color8">运费(快递)</view>
						<view>货到付款</view>
					</view>
					<view class="flex1">
						<view class="color8">备注</view>
						<view>{{mainData.passage1!=''?mainData.passage1:'无'}}</view>
					</view>
				</view>
				<view class="flex1 p-3 line-h">
					<view class="color8">实付款</view>
					<view class="price font-42">{{mainData.price}}</view>
				</view>
			</view>
				
			<view class="bg-white pl-3 mb-2 line-h">
				<view class="flex py-3 pr-3 bB-f5">
					<image src="../../static/images/order-icon4.png" class="dd-icon mr-1"></image>
					<view>订单信息</view>
				</view>
				<view class="pr-3 py-3">
					<view class="flex1 item">
						<view class="color8">订单编号</view>
						<view class="flex">
							<view>{{mainData.order_no?mainData.order_no:''}}</view>
							<image @click="copy(mainData.order_no)" src="../../static/images/order-icon5.png" class="wh30 ml-1"></image>
						</view>
					</view>
					<view class="flex1 item" v-show="mainData.transport_status>0">                <!-- 待收货展示 -->
						<view class="color8">物流单号</view>
						<view class="flex">
							<view>{{mainData.express_info?mainData.express_info:''}}</view>
							<image @click="copy(mainData.express_info)" src="../../static/images/order-icon5.png" class="wh30 ml-1"></image>
						</view>
					</view>
					<view class="flex1 item">
						<view class="color8">支付方式</view>
						<view>微信支付</view>
					</view>
					<view class="flex1 item">          <!-- 代付款展示 -->
						<view class="color8">创建时间</view>
						<view>{{mainData.create_time?mainData.create_time:''}}</view>
					</view>
					
					<view class="flex1 item" v-show="mainData.pay_status==1">          <!-- 待发货、待收货展示 -->
						<view class="color8">付款时间</view>
						<view>{{Utils.timeto(mainData.pay_time*1000,'ymd-hms')}}</view>
					</view>
					<view class="flex1 item" v-show="mainData.transport_status>0">           <!-- 待收货展示 -->
						<view class="color8">发货时间</view>
						<view>{{Utils.timeto(mainData.deliver_time*1000,'ymd-hms')}}</view>
					</view>
					<view class="flex1 item" v-show="mainData.transport_status>2">           <!-- 已收货展示 -->
						<view class="color8">收货时间</view>
						<view>{{Utils.timeto(mainData.receive_time*1000,'ymd-hms')}}</view>
					</view>
					
				</view>
			</view>
			
		</view>
		
		<view style="height: 134rpx;"></view>
		<!-- 代付款 -->
		<view class="bT-e1 px-3 bg-white flex1 p-fX bottom-0" v-show="mainData.pay_status==0">
			<view class="btnB" @click="deleteOrder">取消订单</view>
			<view class="btnM" @click="goPay">立即付款</view>
		</view>
		<!-- 待收货 -->
		<view class="bT-e1 px-3 bg-white p-fX bottom-0" v-show="mainData.transport_status==1">
			<view class="btnM btn1" @click="orderUpdate">确认收货</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				state:2,
				mainData:{},
				Utils:this.$Utils,
				pay:{}
			}
		},
		onLoad(options) {
			const self = this;
			self.id = options.id;
			self.$Utils.loadAll(['getMainData'], self);
		},
		methods: {
			
			copy(content){
				const self = this;
				uni.setClipboardData({
					data:content
				})
			},
			
			goPay() {
				const self = this;	
				self.pay.wxPay = {
					price: self.mainData.price,
				};
				const postData = self.$Utils.cloneForm(self.pay);	
				postData.tokenFuncName = 'getProjectToken',
				postData.searchItem = {
					id: self.mainData.id
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
										uni.navigateBack({
											delta:1
										})
									}, 1000);
								} else {
									self.$Utils.showToast('支付失败','none')
								};
							};
							self.$Utils.realPay(res.info, payCallback);
						} else {
							self.$Utils.showToast('支付成功','none')
							setTimeout(function() {
								uni.navigateBack({
									delta:1
								})
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
			
			orderUpdate(){
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
								id:self.mainData.id,
							};
							const callback = (data) => {
								
								if (data && data.solely_code == 100000) {
									self.$Utils.showToast('操作成功','none');
									setTimeout(function() {
										uni.navigateBack({
											delta:1
										})
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
			
			deleteOrder(){
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
								id:self.mainData.id,
							};
							const callback = (data) => {
								
								if (data && data.solely_code == 100000) {
									self.$Utils.showToast('操作成功','none');
									setTimeout(function() {
										uni.navigateBack({
											delta:1
										})
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
			
			getMainData() {
				const self = this;
				const postData = {};
				postData.tokenFuncName = 'getProjectToken';
				postData.searchItem = {
					id:self.id,
					thirdapp_id:2
				};
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
						self.mainData = res.info.data[0];
						if((parseInt(self.mainData.sku[0].product.end_time)<(new Date()).getTime()||self.mainData.sku[0].product.on_shelf==0)&&self.mainData.pay_status==0){
							self.mainData.isSx = true
						}
					}
					console.log('self.mainData', self.mainData)
					uni.setStorageSync('canClick', true);
					self.$Utils.finishFunc('getMainData');
				};
				self.$apis.orderGet(postData, callback);
			},
			
		}
	}
</script>

<style scoped>
.icon1{width: 99rpx;height: 90rpx;}
.icon2{width: 108rpx;height: 106rpx;}
.icon3{width: 124rpx;height: 100rpx;}
.orderTop{padding-bottom: 100rpx;}
.order{margin-top: -50rpx;}
.dzTxt::before{content: '';height: 66rpx;width: 1rpx;background-color: #e1e1e1;position: absolute;left: 0;top: 50%;margin-top: -33rpx;}

.item{padding-top: 40rpx;}
.item:nth-child(1){padding-top: 0;}

.dd-icon{width: 24rpx;height: 28rpx;}
.btnB,.btnM{line-height: 94rpx;border-radius: 47rpx;margin: 20rpx 0;}
.btnB{width: 236rpx;}
.btnM{width: 414rpx;}
.btn1{width: 690rpx;}
</style>
