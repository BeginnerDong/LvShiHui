<template>
	<view>
		
		<view class="bg-white px-3 line-h">
			<view class="font-30 pt-3 py-28">姓名</view>
			<input type="text" value="" placeholder="请输入姓名" placeholder-style="color:#888"/>
			<view class="font-30 pt-3 py-28">手机号</view>
			<input type="text" value="" placeholder="请输入手机号" placeholder-style="color:#888"/>
			<view class="font-30 pt-3 py-28">所在地区</view>
			<view class="flex1 pb-4 bB-f5">
				<picker mode="region" @change="">
					<view class="color8 font-34">请选择所在地区</view>
				</picker>
				<image src="../../static/images/store-icon10.png" class="r-icon"></image>
			</view>
			<view class="font-30 pt-3 py-28">详细地址</view>
			<input type="text" value="" placeholder="请输入详细地址" placeholder-style="color:#888"/>
		</view>
		<view class="f720"></view>
		<view class="bg-white p-3 flex1">
			<view class="font-30">设为默认地址</view>
			<!-- <image src="../../static/images/address-icon.png" class="addressIcon"></image> -->
			<image src="../../static/images/address-icon1.png" class="addressIcon"></image>
		</view>
		
		<view class="btnM btnX">新增</view>   <!-- 类名btnX为按钮禁用样式 -->
		
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
.btnM{margin: 185rpx 30rpx;}
.btnX{background: #F7C8A6;}
.addressIcon{width: 67rpx;height: 36rpx;}
.py-28{padding-bottom: 28rpx;}
</style>
