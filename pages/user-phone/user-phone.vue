<template>
	<view>
		
		<view class="bg-white px-3 line-h">
			<view class="font-30 pt-3 pb-28">原手机号</view>
			<input type="text" value="" placeholder="请输入原手机号" placeholder-style="color:#888"/>
			<view class="font-30 pt-3 pb-28">新手机号</view>
			<input type="text" value="" placeholder="请输入新手机号" placeholder-style="color:#888"/>
			<view class="font-30 pt-3 pb-28">验证码</view>
			<view class="font-34 pb-4 flex bB-f5">
				<input type="text" value="" placeholder="请确认新手机号验证码" placeholder-style="color:#888" class="input"/>
				<view class="colorM font-34">获取</view>
			</view>
		</view>
		
		<view class="btnM o3">确认</view>
		<!-- <view class="btnM">确认</view> -->
		
		
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
<style>
page{background-color: #F7F9FB;}
</style>
<style scoped>
input{font-size: 34rpx;padding: 0 0 40rpx;border-bottom: 1px solid #f5f5f5;flex: 1;}
.input{border: none;flex: 1;padding: 0;}
.btnM{margin: 30% 40rpx 0;}
.pb-28{padding-bottom: 28rpx;}
</style>
