<template>
	<view class="p-r">
		
		<view>
			<image src="../../static/images/post1.png" mode="widthFix"></image>
			<image src="../../static/images/post2.png" mode="widthFix"></image>
		</view>
		
		<view class="p-aXY">
			<view class="p-aX colorf font-38 text-center head" :style="{paddingTop:statusBar+'px'}">
				<view class="p-3 p-a left-0"@click="Router.back({route:{path:-1}})">
					<image src="../../static/images/back.png" class="back"></image>
				</view>
				<view>{{title}}</view>
			</view>
			
			<view class="p-aX bottom-0">
				<view class="btnAuto">加入会员</view>
				<!-- <view class="btnAuto">了解更多</view> -->
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
				title:'买铝返钱',
				statusBar: app.globalData.statusBar,
			}
		},
		onLoad(option){
			const self = this;
			self.title = option.tit
		},
		methods: {
			
		}
	}
</script>

<style>
page{background: #232E63;}
</style>

<style>
.head{line-height: 100rpx;top: 0;left: 0;right: 0; z-index: 100;}
.btnAuto{width: 670rpx;line-height: 94rpx;border-radius: 47rpx;margin-bottom: 50rpx;background:linear-gradient(180deg,rgba(255,219,79,1) 0%,rgba(232,169,12,1) 97%);}
</style>
