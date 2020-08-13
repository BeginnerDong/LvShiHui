<template>
	<view class="p-r">
		<image src="../../static/images/yq-img.png" mode="widthFix" class="p-aX" :style="{marginTop:statusBar+'px'}"></image>
		<view :style="{paddingTop:statusBar+'px'}" class="p-aX top-0">
			<view class="font-38 text-center colorf line-h100">邀请好友</view>
			<view class="p-3 p-a" :style="{top:statusBar+'px'}" @click="Router.back({route:{path:-1}})">
				<image src="../../static/images/back.png" class="back"></image>
			</view>
		
			<view class="color8 line-h p-r" :style="{marginTop:(467-statusBar)+'px'}">
				<image src="../../static/images/yq-img1.png" mode="widthFix"></image>
				<view class="p-aXY text-center pt-4">
					<view class="font-26 pt-4 pb-2">已邀请</view>
					<view class="font-34 color3 font-w">超级会员 <text class="colorM">12</text> 人</view>
					<view class="btnAuto">累计收益：6000元</view>
					
					<view>我的邀请码</view>
					<image src="../../static/images/ma-img.png" class="ewm"></image>
					<view class="font-30">（长按保存二维码）</view>
				</view>
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
				statusBar: app.globalData.statusBar
			}
		},
		methods: {
			
		}
	}
</script>
<style>page{background-color: #FF9800;}</style>

<style scoped>
.line-h100{line-height: 100rpx;}
.ewm{width: 230rpx;height: 230rpx;margin: 30rpx auto 40rpx;}
.btnAuto{width: 360rpx;color: #F87F27;background:rgba(248,127,39,0.1);margin: 38rpx auto 99rpx;}
</style>
