<template>
	<view class="line-h p-fXY d-flex flex-column">
		
		<view class="mt-5 pt-5 text-center">
			<view class="font-48 color3">恭喜您 支付成功！</view>
			
			<!-- 会员支付成功 -->
			<view v-if="type&&type=='vip'">
				<view class="font-30 color8 pt-3 pb-2">会员服务期限为</view>
				<view class="font-34 color3">{{Utils.timeto(now,'ymd')}}--{{Utils.timeto(yearLater,'ymd')}}</view>
			</view>
			
			<!-- 订单支付成功 -->
			<view v-else>
				<view class="font-30 color8 pt-3 pb-2">您的订单可在下面地址查找</view>
				<view class="font-34 color3">铝实惠小程序-我的-订单</view>
			</view>
		</view>
		
		<view class="flex-1">
			<image src="../../static/images/pay-icon.png" class="pay-icon"></image>
		</view>
		
		<view class="p-r">
			<image src="../../static/images/pay-img.png" mode="widthFix"></image>
			
			<!-- 会员支付成功 -->
			<view class="btnAuto btn b30" @click="Router.reLaunch({route:{path:'/pages/index/index'}})" v-if="type&&type=='vip'">好的 马上去逛逛</view>
			
			<!-- 订单支付成功 -->
			<view class="flex1 px-3 p-aX b30"  v-else>
				<view class="btnAuto btn btn1"
				@click="Router.reLaunch({route:{path:'/pages/index/index'}})">返回商城</view>
				<view class="btnAuto btn btn1"
				@click="Router.redirectTo({route:{path:'/pages/user-order/user-order'}})">查看订单</view>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Router:this.$Router,
				type:'',
				now:0,
				yearLater:0,
				Utils:this.$Utils
			}
		},
		
		onLoad(options) {
			const self = this;
			self.now = (new Date()).getTime();
			self.yearLater = (new Date()).getTime()+86400000*365;
			if(options.type){
				self.type = options.type
			}
		},
		
		methods: {
			
		}
	}
</script>

<style scoped>
.pay-icon{width: 359rpx;height: 359rpx;margin: 145rpx auto 0;}

.btn{width: 690rpx;background: none;color: #F87F27;border: 1px solid #F87F27;line-height: 94rpx;border-radius: 47rpx;font-size: 38rpx;}
.btn1{width: 330rpx;}
.btn1:nth-child(1){background-color: #F87F27;color: #fff;}
.b30{bottom: 30%;}
</style>
