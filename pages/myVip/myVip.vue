<template>
	<view>
		<image src="../../static/images/myVip-img.png" mode="widthFix" class="p-fX"></image>
		<view class="font-38 text-center colorf line-h100 p-r" :style="{paddingTop:statusBar+'px'}">我的会员</view>
		<view class="p-3 p-f" :style="{top:statusBar+'px'}" @click="Router.back({route:{path:-1}})">
			<image src="../../static/images/back.png" class="back"></image>
		</view>
		
		<view class="p-r pt-4 top">
			<image src="../../static/images/card2.png" class="bgImg"></image>
			
			<view class="p-r pt-4 px-3 flex1 vipCon1">
				<view class="font-40 colorf flex">
					<image src="../../static/images/user.png" class="wh55 radius-5 mr-2"></image>
					<view>吴彦祖</view>
				</view>
				<view class="line-h text-right">
					<view class="font-32 colorf">VIP金牌会员</view>
					<view class="colorZ pt-2">365天后到期</view>
				</view>
			</view>
			
			<view class="btnBox p-r">
				<image src="../../static/images/vipBtn.png" mode="widthFix"></image>
				<view class="p-aXY flex color8">
					<view class="w-50 pl-4 c1"><text class="price1">3998</text>/年</view>
					<view class="w-50 font-36 colorG pl-3" @click="isShow">立即加入</view>
				</view>
			</view>
		</view>
		
		<view class="mt-4">
			<image src="../../static/images/myPost.png" mode="widthFix"></image>
			<image src="../../static/images/myPost1.png" mode="widthFix"></image>
			<image src="../../static/images/myPost3.png" mode="widthFix"></image>
		</view>
		
	</view>
</template>

<script>
	const app = getApp();
	export default {
		data() {
			return {
				Router:this.$Router,
				statusBar: app.globalData.statusBar
			}
		},
		methods: {
			
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