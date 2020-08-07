<template>
	<view>
		
		<view class="p-3 Mgb line-h p-r top">
			<image src="../../static/images/my-img3.png" mode="widthFix"></image>
			<view class="topTxt p-aX">
				<view class="font-40 pb-3">总资产 <text class="color8">（推广佣金+买铝返钱）</text></view>
				<view class="font-60 font-w price">10000.00</view>
			</view>
		</view>
		
		<view class="wallet radius50-T bg-white font-32 color3 line-h p-r px-3 pt-2">
			<view class="pb-3 bB-f5" @click="Router.navigateTo({route:{path:'/pages/user-extend/user-extend'}})">
				<view class="flex1 py-3">
					<view class="font-w">推广佣金</view>
					<image src="../../static/images/qian-icon.png" class="q-icon"></image>
				</view>
				<view class="flex1">
					<view class="d-flex flex-column a-start">
						<view class="font-26 color8 pb-2">总金额</view><view class="price">6000</view>
					</view>
					<view class="d-flex flex-column a-center">
						<view class="font-26 color8 pb-2">已发放</view><view class="price">3000</view>
					</view>
					<view class="d-flex flex-column a-end">
						<view class="font-26 color8 pb-2">未发放</view><view class="price">3000</view>
					</view>
				</view>
			</view>
			
			<view class="pb-3" @click="Router.navigateTo({route:{path:'/pages/user-refund/user-refund'}})">
				<view class="flex1 py-3">
					<view class="font-w">买铝返现</view>
					<image src="../../static/images/qian-icon.png" class="q-icon"></image>
				</view>
				<view class="flex1">
					<view class="d-flex flex-column a-start">
						<view class="font-26 color8 pb-2">总金额</view><view class="price">4000</view>
					</view>
					<view class="d-flex flex-column a-center">
						<view class="font-26 color8 pb-2">已发放</view><view class="price">3000</view>
					</view>
					<view class="d-flex flex-column a-end">
						<view class="font-26 color8 pb-2">未发放</view><view class="price">1000</view>
					</view>
				</view>
			</view>
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
<style>page{background-color: #F7F9FB;}</style>

<style scoped>
.top{padding-bottom: 100rpx;}
.topTxt{top: 53%;padding-left: 80rpx;}
.price{color: #333;}
.wallet{margin-top: -50rpx;}
</style>
