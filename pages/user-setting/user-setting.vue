<template>
	<view>
		
		<view class="p-3 flex1 bB-f5" @click="Router.navigateTo({route:{path:'/pages/address/address'}})">
			<view class="font-36">收货地址</view>
			<image src="../../static/images/store-icon10.png" class="r-icon ml-1"></image>
		</view>
		<view class="p-3 flex1 bB-f5" @click="Router.navigateTo({route:{path:'/pages/user-phone/user-phone'}})">
			<view class="font-36">修改手机号</view>
			<view class="flex color9 font-30">
				<view>150****3588</view>
				<image src="../../static/images/store-icon10.png" class="r-icon ml-1"></image>
			</view>
		</view>
		
		<view class="py-3 color8 font-34 text-center">退出登录</view>
		
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

<style>

</style>
