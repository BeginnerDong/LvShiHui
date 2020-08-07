<template>
	<view class="px-3 py-1">
		
		<view class="font-34 color3 pt-3 font-w">定位城市</view>
		<view>
			<view class="tag">西安</view>
		</view>
		
		<view class="font-34 color3 pt-3 font-w">服务地区</view>
		<view class="flex flex-wrap">
			<view class="tag">新疆</view>
			<view class="tag">甘肃</view>
			<view class="tag on">陕西</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped>
.tag{font-size: 30rpx;color: #999;width: 190rpx;line-height: 56rpx;border:1px solid rgba(220,220,220,1);border-radius:6px;text-align: center;margin-top: 30rpx;margin-right: 43rpx;}
.on{background:rgba(248,127,39,0.2);border-color:rgba(248,127,39,1);color: #F87F27;}
</style>
