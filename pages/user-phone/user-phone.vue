<template>
	<view>
		
		<view class="bg-white px-3 line-h">
			<view class="font-30 pt-3 pb-28">原手机号</view>
			<input type="number" @input="check" v-model="submitData.phone" placeholder="请输入原手机号" placeholder-style="color:#888"/>
			<view class="font-30 pt-3 pb-28">新手机号</view>
			<input type="number" @input="check" v-model="submitData.newPhone" placeholder="请输入新手机号" placeholder-style="color:#888"/>
			<view class="font-30 pt-3 pb-28">验证码</view>
			<view class="font-34 pb-4 flex bB-f5">
				<input type="number" @input="check" v-model="code" placeholder="请确认新手机号验证码" placeholder-style="color:#888" class="input"/>
				<view class="colorM font-34" style="z-index: 99;" @click="sendCode()" v-if="!hasSend">{{text}}</view>
				<view class="colorM font-34" style="z-index: 99;" v-if="hasSend">{{text}}</view>
			</view>
		</view>
		
		<view class="btnM" :class="!isComplete?'o3':''" @click="Utils.stopMultiClick(userInfoUpdate)">确认</view>
		<!-- <view class="btnM">确认</view> -->
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				submitData:{
					phone:'',
					newPhone:'',
					code:''
				},
				isComplete:false,
				currentTime:61,
				text:'获取',
				hasSend:false,
			}
		},
		onLoad() {
			const self = this;
			self.$Utils.loadAll(['getUserInfoData'], self);
		},
		methods: {
			
			
			userInfoUpdate(){
				const self = this;
				uni.setStorageSync('canClick', false);
				if(!self.isComplete){
					uni.setStorageSync('canClick', true);
					return
				};
				if(self.submitData.phone!=self.userInfoData.phone){
					self.$Utils.showToast('原手机号错误', 'none');
					uni.setStorageSync('canClick', true);
					return
				};
				const postData = {};
				postData.tokenFuncName = 'getProjectToken';
				postData.data = {
					phone:self.submitData.newPhone
				};
				postData.searchItem = {
					user_no:uni.getStorageSync('user_info').user_no
				};
				postData.smsAuth = {
					phone:self.submitData.newPhone,						
					code:self.submitData.smsCode,
				};
				const callback = (res) => {
					uni.setStorageSync('canClick', true);
					if (res.solely_code==100000) {
						self.$Utils.showToast('修改成功', 'none');
						setTimeout(function() {
							uni.navigateBack({
								delta:1
							})
						}, 1000);
					}else{
						self.$Utils.showToast(res.msg, 'none');
					}
				};
				self.$apis.userInfoUpdate(postData, callback);
			},
			
			sendCode(){
				var self = this;
				if(self.hasSend){
					return;
				};
				var phone = self.submitData.newPhone;
				
				if (newPhone.trim().length != 11 || !/^1[3|4|5|6|7|8|9]\d{9}$/.test(newPhone)) {
					self.$Utils.showToast('请输入正确的手机号', 'none', 1000)
					return;
				}
				var postData = {
					data:{
						phone:self.submitData.newPhone,
					}
				};
				var callback = function(res){
					if(res.solely_code==100000){
						self.$Utils.showToast('发送成功', 'none', 1000)
						self.hasSend = true;
						var interval = setInterval(function() {
							self.currentTime--; //每执行一次让倒计时秒数减一
						
							self.text=self.currentTime + 's';//按钮文字变成倒计时对应秒数
							
							//如果当秒数小于等于0时 停止计时器 且按钮文字变成重新发送 且按钮变成可用状态 倒计时的秒数也要恢复成默认秒数 即让获取验证码的按钮恢复到初始化状态只改变按钮文字
							if (self.currentTime <= 0) {
								clearInterval(interval)
								self.hasSend = false;
								self.text='重新发送';
								self.currentTime= 61;
							}
						}, 1000);
					}else{
						self.$Utils.showToast('发送失败', 'none', 1000)
					};
				};
				self.$apis.codeGet(postData, callback);
			},
			
			getUserInfoData(){
				const self = this;
				const postData = {};
				postData.tokenFuncName = 'getProjectToken';
				postData.searchItem = {
					user_no:uni.getStorageSync('user_info').user_no
				};
				const callback = (res) => {
					if (res.solely_code==100000) {
						self.userInfoData = res.info.data[0]
					}else{
						self.$Utils.showToast(res.msg, 'none');
					}
					self.$Utils.finishFunc('getUserInfoData');
				};
				self.$apis.userInfoGet(postData, callback);
			},
			
			check(){
				const self = this;
				var pass = self.$Utils.checkComplete(self.submitData);
				if(pass){
					self.isComplete = true
				}else{
					self.isComplete = false
				}
			},
			
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
