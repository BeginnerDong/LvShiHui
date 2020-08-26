<template>
	<view>
		
		<view class="list bT-f5 bB-f5">
			<view class="li" :class="liCurr==0?'on':''" @click="changeLi(0)">未使用</view>
			<view class="li" :class="liCurr==1?'on':''" @click="changeLi(1)">已使用</view>
			<view class="li" :class="liCurr==2?'on':''" @click="changeLi(2)">已失效</view>
		</view>
		
		<!-- 空数据 -->
		<view>
			<image src="../../static/images/coupon1.png" class="nullCoupon"></image>
			<view class="font-34 color8 text-center">暂无优惠券</view>
		</view>
		
		<!-- 有数据 -->
		<!-- <view class="px-2 pt-2">
			<view class="p-r">
				<image src="../../static/images/coupon.png" mode="widthFix"></image>
				<view class="flex1 p-aXY coupon">
					<view class="price1">100</view>
					<view>
						<view class="font-34">满1吨可用</view>
						<view class="font-24 color8">有效期 2020.12.12</view>
					</view>
					<view class="btnM">去使用</view>
				</view>
			</view>
			
				<view class="p-r o4">
					<image src="../../static/images/coupon.png" mode="widthFix"></image>
					<view class="flex1 p-aXY coupon">
						<view class="price1">100</view>
						<view>
							<view class="font-34">满1吨可用</view>
							<view class="font-24 color8">有效期 2020.12.12</view>
						</view>
						<view class="btnM">已使用</view>
					</view>
				</view>
		</view> -->
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				liCurr:0
			}
		},
		methods: {
			changeLi(i){
				const self = this;
				self.liCurr = i
			}
		}
	}
</script>

<style scoped>
.li{width: 33.33%;}
.price1{font-size: 74rpx;font-weight: bold;color: #F87F27;}
.price1::before{font-size: 34rpx;}
.btnM{line-height: 60rpx;border-radius: 10rpx;width: 140rpx;margin: 0;}
.coupon{padding: 0 65rpx;}

.nullCoupon{width: 506rpx;height: 386rpx;margin: 280rpx auto 70rpx;}
</style>
