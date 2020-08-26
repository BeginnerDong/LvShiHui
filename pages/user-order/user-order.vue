<template>
	<view>
		
		<view class="list bT-f5 bB-f5">
			<view class="li" :class="liCurr==0?'on':''" @click="changeLi(0)">全部</view>
			<view class="li" :class="liCurr==1?'on':''" @click="changeLi(1)">代付款</view>
			<view class="li" :class="liCurr==2?'on':''" @click="changeLi(2)">待发货</view>
			<view class="li" :class="liCurr==3?'on':''" @click="changeLi(3)">待收货</view>
			<view class="li" :class="liCurr==4?'on':''" @click="changeLi(4)">已收货</view>
		</view>
		
		<view class="bg-white mb-2" >
			<view class="flex1 pt-4 pb-3 bB-f5 mx-3 font-32">
				<view class="flex">
					<image src="../../static/images/order-icon1.png" class="dp-icon mr-1"></image>
					<view>金牌会员秒杀商品</view>
				</view>
				<view class="colorM font-30">买家代付款</view>
			</view>
			<view class="py-3 flex ml-3 pr-3 flex-1 bB-f5"
			@click="Router.navigateTo({route:{path:'/pages/user-orderDetail/user-orderDetail'}})">
				<image src="../../static/images/detail-img.jpg" class="wh190 radius30"></image>
				<view class="flex5 font-28 pl-2 py-1 flex-1 ggtxt">
					<view class="avoidOverflow2">专业铝盒定制 螺旋纹原型铝罐 发的时间悬念鲸 97852</view>
					<view class="color8">材质：铝 &nbsp;&nbsp;&nbsp; 规格：大</view>
					<view class="flex1">
						<view>￥29.9 x2</view>
						<image src="../../static/images/car-icon2.png" class="sx-icon"></image>
					</view>
				</view>
			</view>
			<view class="text-right color8 p-3 font-34">共<text class="color3">2</text>件，合计:<text class="price">67.8</text></view>
			<view class="d-flex j-end a-center pb-3 px-3">
				<view class="btn" @click="showToast">取消订单</view>
				<view class="btn btn1 o3">付款</view>
				<view class="btn btn1">确认收货</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Router:this.$Router,
				liCurr:0
			}
		},
		onLoad(option){
			const self = this;
			self.liCurr = option.id;
		},
		methods: {
			changeLi(i){
				const self = this;
				self.liCurr = i
			},
			showToast(){
				const self = this;
				uni.showModal({
					title:'',
					content:'确认取消订单吗'
				})
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
