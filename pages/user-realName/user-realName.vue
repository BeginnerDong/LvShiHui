<template>
	<view>
		
		<view class="bg-white px-3">
			<view class="font-30 pt-3 pb-28">证件类型</view>
			<view class="font-34 pb-4 bB-f5">身份证</view>
			<view class="font-30 pt-3 pb-28">姓名</view>
			<view class="font-34 pb-4 bB-f5">{{userInfoData.name?userInfoData.name:''}}</view>
			<view class="font-30 pt-3 pb-28">证件号码</view>
			<view class="font-34 pb-4 bB-f5">{{userInfoData.idCard ?userInfoData.idCard :''}}</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfoData:{}
			}
		},
		onLoad() {
			const self = this;
			self.$Utils.loadAll(['getUserInfoData'], self);
		},
		methods: {
			getUserInfoData() {
				const self = this;
				const postData = {};
				postData.tokenFuncName = 'getProjectToken';
				postData.noLoading = true;
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.userInfoData = res.info.data[0];
					};
				};
				self.$apis.userInfoGet(postData, callback);
			},
		}
	}
</script>

<style>
page{background-color: #F8F9FA;}
.pb-28{padding-bottom: 28rpx;}
</style>
