<template>
	<view>
		<!-- 代付款 -->
		<view class="p-3 Mgb flex1 colorf orderTop" v-show="state==0">
			<view class="line-h">
				<view class="font-52 pb-2 font-w">买家代付款</view>
				<view class="colorG">剩 <text class="colorf px-1">23:15:56</text> 订单将自动关闭</view>
			</view>
			<image src="../../static/images/order-icon3.png" class="icon1"></image>
		</view>
		<!-- 待发货 -->
		<view class="p-3 Mgb flex1 colorf orderTop" v-show="state==1">
			<view class="line-h">
				<view class="font-52 pb-2 font-w">等待卖家发货</view>
				<view class="colorG">卖家将尽快为您发货 请耐心等待</view>
			</view>
			<image src="../../static/images/order-icon6.png" class="icon2"></image>
		</view>
		<!-- 待收货 -->
		<view class="p-3 Mgb flex1 colorf orderTop" v-show="state==2">
			<view class="line-h">
				<view class="font-52 pb-2 font-w">卖家已发货</view>
				<view class="colorG">您的包裹已寄出 请注意查收~</view>
			</view>
			<image src="../../static/images/order-icon7.png" class="icon3"></image>
		</view>
		<!-- 已收货 -->
		<view class="p-3 Mgb flex1 colorf orderTop" v-show="state==3">
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
					<view>马云 <text class="color8 pl-1">18547298634</text></view>
					<view class="dz avoidOverflow2">陕西省 西安市 高新区 阿里巴巴科技股份集团有限公司1号楼</view>
				</view>
				<!-- <image src="../../static/images/store-icon10.png" class="r-icon"></image> -->
			</view>
			
			<view class="bg-white mb-2">
				<view class="flex1 pt-4 pb-3 bB-f5 mx-3 font-32">
					<view class="flex">
						<image src="../../static/images/order-icon1.png" class="dp-icon mr-1"></image>
						<view>金牌会员秒杀商品</view>
					</view>
					<button class="flex bg-white line-h">
						<image src="../../static/images/order-icon.png" class="wh30"></image>
						<view class="px-1">联系客服</view>
						<image src="../../static/images/store-icon10.png" class="r-icon"></image>
					</button>
				</view>
				<view class="py-3 flex ml-3 pr-3 flex-1 bB-f5">
					<image src="../../static/images/detail-img.jpg" class="wh190 radius30"></image>
					<view class="flex5 font-28 pl-2 py-1 flex-1 ggtxt">
						<view class="avoidOverflow2">专业铝盒定制 螺旋纹原型铝罐 发的时间悬念鲸 97852</view>
						<view class="color8">材质：铝 &nbsp;&nbsp;&nbsp; 规格：大</view>
						<view class="flex1">
							<view>￥29.9 x2</view>
						</view>
					</view>
				</view>
				<view class="font-30 ml-3 pr-3 py-3 bB-f5 line-h">
					<view class="flex1 pb-4">
						<view class="color8">商品总价</view>
						<view>￥59.8</view>
					</view>
					<view class="flex1 pb-4">
						<view class="color8">运费(快递)</view>
						<view>货到付款</view>
					</view>
					<view class="flex1">
						<view class="color8">备注</view>
						<view>无</view>
					</view>
				</view>
				<view class="flex1 p-3 line-h">
					<view class="color8">实付款</view>
					<view class="price font-42">59.8</view>
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
							<view>325148759658445584</view>
							<image src="../../static/images/order-icon5.png" class="wh30 ml-1"></image>
						</view>
					</view>
					<view class="flex1 item" v-show="state==2">                <!-- 待收货展示 -->
						<view class="color8">物流单号</view>
						<view class="flex">
							<view>325148759658445584</view>
							<image src="../../static/images/order-icon5.png" class="wh30 ml-1"></image>
						</view>
					</view>
					<view class="flex1 item">
						<view class="color8">支付方式</view>
						<view>微信支付</view>
					</view>
					<view class="flex1 item" v-show="state==0">          <!-- 代付款展示 -->
						<view class="color8">创建时间</view>
						<view>2020-03-05 19:56:52</view>
					</view>
					
					<view class="flex1 item" v-show="state==2||state==1">          <!-- 待发货、待收货展示 -->
						<view class="color8">付款时间</view>
						<view>2020-03-05 19:56:52</view>
					</view>
					<view class="flex1 item" v-show="state==2">           <!-- 待收货展示 -->
						<view class="color8">发货时间</view>
						<view>2020-03-05 19:56:52</view>
					</view>
					<view class="flex1 item" v-show="state==3">           <!-- 已收货展示 -->
						<view class="color8">收货时间</view>
						<view>2020-03-05 19:56:52</view>
					</view>
					
				</view>
			</view>
			
		</view>
		
		<view style="height: 134rpx;" v-show="state==0||state==2"></view>
		<!-- 代付款 -->
		<view class="bT-e1 px-3 bg-white flex1 p-fX bottom-0" v-show="state==0">
			<view class="btnB">取消订单</view>
			<view class="btnM">立即付款</view>
		</view>
		<!-- 待收货 -->
		<view class="bT-e1 px-3 bg-white p-fX bottom-0" v-show="state==2">
			<view class="btnM btn1">确认收货</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				state:2
			}
		},
		methods: {
			
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
