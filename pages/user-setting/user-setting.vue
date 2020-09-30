<template>
	<view>
		
		<view class="p-3 flex1 bB-f5" @click="Router.navigateTo({route:{path:'/pages/address/address'}})">
			<view class="font-36">收货地址</view>
			<image src="../../static/images/store-icon10.png" class="r-icon ml-1"></image>
		</view>
		<view class="p-3 flex1 bB-f5" @click="Router.navigateTo({route:{path:'/pages/user-phone/user-phone'}})">
			<view class="font-36">修改手机号</view>
			<view class="flex color9 font-30">
				<view>{{userInfoData.phone!=''?userInfoData.phone:'暂未绑定'}}</view>
				<image src="../../static/images/store-icon10.png" class="r-icon ml-1"></image>
			</view>
		</view>
		
		<view class="py-3 color8 font-34 text-center" @click="loginOff">退出登录</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Router:this.$Router,
				userInfoData:{}
			}
		},
		
		onShow() {
			const self = this;
			self.getUserInfoData()
		},
		
		methods: {
			
			loginOff(){
				const self = this;
				uni.showModal({
					title:'温馨提示',
					content:'您确定要退出系统吗？',
					success(res) {
						if(res.confirm){
							uni.removeStorageSync('user_info');
							uni.removeStorageSync('user_token');
							getApp().globalData.isLogin =  false;
							self.Router.reLaunch({route:{path:'/pages/index/index'}})
						}
					}
				})
			},
			
			
			getUserInfoData() {
				const self = this;
				const postData = {};
				postData.tokenFuncName = 'getProjectToken';
				postData.noLoading = true;
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.userInfoData = res.info.data[0];
						if(self.userInfoData.phone!=''){
							self.userInfoData.phone = self.userInfoData.phone.substr(0,2)+'****'+self.userInfoData.phone.substr(6,self.userInfoData.phone.length)
						}
					};
				};
				self.$apis.userInfoGet(postData, callback);
			},
		}
	}
</script>

<style>

</style>
