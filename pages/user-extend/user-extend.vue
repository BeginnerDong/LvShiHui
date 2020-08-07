<template>
	<view>
		
		<view class="p-3 p-r">
			<image src="../../static/images/qian-img.png" mode="widthFix"></image>
			<view class="p-aXY p-4 m-3 colorf line-h">
				<view class="pb-3">
					<view class="o5">可提现</view><view class="price1">0.00</view>
				</view>
				<view class="flex1 pt-3">
					<view>
						<view class="o5">已提现</view><view class="price1">6000.00</view>
					</view>
					<view>
						<view class="o5">累计返佣(推广12人)</view><view class="price1">6000.00</view>
					</view>
				</view>
				<view class="sign flex" @click="Router.navigateTo({route:{path:'/pages/user-tixianRecord/user-tixianRecord'}})">
					<image src="../../static/images/qian-icon1.png" class="wh28 mr-1"></image>
					<view>提现记录</view>
				</view>
			</view>
		</view>
		<view class="f720"></view>
		
		<view class="line-h">
			<view class="font-32 p-3 bB-e1">累计返佣记录</view>
			
			<view class="p-3 bB-e1" v-for="v in 4" :key='v'>
				<view class="font-32 font-w pb-3">推广</view>
				<view class="flex1">
					<view>
						<view>1人</view> <view class="font-24 color8 pt-2">人数</view>
					</view>
					<view>
						<view>+500</view> <view class="font-24 color8 pt-2">返佣</view>
					</view>
					<view class="text-right">
						<view>2020.07.11</view> <view class="font-24 color8 pt-2">入账时间</view>
					</view>
				</view>
			</view>
		</view>
		
		<view style="height: 190rpx;"></view>
		<view class="px-3 pb-2 p-fX bottom-0 bT-e1 bg-white">
			<view class="font-32 pt-3 pb-3 flex1 line-h">
				<view class="color8">可提现数量</view>
				<view>￥0.00</view>
			</view>
			<view class="btnM">申请提现</view>
		</view>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Router:this.$Router
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped>
.price1{color: #fff;font-size: 48rpx;font-weight: bold;padding-top: 25rpx;}
.price1::before{font-size: 32rpx;}
.sign{line-height: 57rpx;border-radius: 28rpx 0 0 28rpx;position: absolute;right: 0;top: 50rpx;color: #fff;;padding: 0 30rpx;background-color: #FCA50F;}
</style>
