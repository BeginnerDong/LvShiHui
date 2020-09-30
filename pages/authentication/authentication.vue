<template>
	<view>
		
		<view class="font-34 pl-3 line-h">
			<view class="font-30 py-3">证件类型</view>
			<view class="bB-f5 pb-4">身份证</view>
			<view class="font-30 py-3">姓名</view>
			<input type="text" @input="check" v-model="submitData.name" placeholder="请输入姓名" placeholder-style="color:#888"/>
			<view class="font-30 py-3">证件号码</view>
			<input type="idcard" @input="check" v-model="submitData.idCard" placeholder="请输入证件号码" placeholder-style="color:#888"/>
		</view>
		<view class="f720"></view>
		
		<view class="px-3 font-30 pb-4">
			<view class="py-3">上传照片<text class="color6">（小于3M的照片）</text></view>
			<view class="colorf flex1 text-center font-26 pb-4 bB-e1">
				<view class="radius20 overflow-h upload">
					<view class="p-r">
						<view v-if="submitData.id_front_img.length==0" @click="upLoadImg('id_front_img')">
							<image src="../../static/images/rz-icon1.png" class="'uploadImg"></image>
							<image src="../../static/images/rz-icon2.png" class="wh86 p-aXY m-a"></image>
						</view>
						<view v-else>
							<image :src="submitData.id_front_img&&submitData.id_front_img[0]?submitData.id_front_img[0].url:''" class="'uploadImg"></image>
						</view>
					</view>
					<view class="Mgb2">证件正面</view>
				</view>
				<view class="radius20 overflow-h upload">
					<view class="p-r">
						<view v-if="submitData.id_back_img.length==0" @click="upLoadImg('id_back_img')">
							<image src="../../static/images/rz-icon1.png" class="'uploadImg"></image>
							<image src="../../static/images/rz-icon2.png" class="wh86 p-aXY m-a"></image>
						</view>
						<view v-else>
							<image :src="submitData.id_back_img&&submitData.id_back_img[0]?submitData.id_back_img[0].url:''" class="'uploadImg"></image>
						</view>
					</view>
					<view class="Mgb2">证件背面</view>
				</view>
			</view>
			
			<view class="py-3">拍摄要求</view>
			<view class="color6">大陆公民持有本人有效二代身份证；</view>
			<view class="color6">拍摄时确保身份证<text class="colorR">边框完整，字体清晰，亮度均匀；</text></view>
			<view class="flex1 py-4 font-26 color8">
				<view class="flex4">
					<image src="../../static/images/rz-icon5.png" class="zjImg"></image>
					<view>标准</view>
				</view>
				<view class="flex4">
					<image src="../../static/images/rz-icon4.png" class="zjImg"></image>
					<view>边框缺失</view>
				</view>
				<view class="flex4">
					<image src="../../static/images/rz-icon3.png" class="zjImg"></image>
					<view>字迹模糊</view>
				</view>
				<view class="flex4">
					<image src="../../static/images/rz-icon6.png" class="zjImg"></image>
					<view>闪光强烈</view>
				</view>
			</view>
			
			<view class="btnAuto" :class="!isComplete?'o4':'o10'"  @click="Utils.stopMultiClick(submit)">提交</view>     <!-- 信息填写完整按钮暗色变深，类名o4改为o10 -->
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				submitData:{
					name:'',
					idCard:'',
					id_front_img:[],
					id_back_img:[],
					is_check:1,
				
				},
				isComplete:false,
				Utils:this.$Utils
			}
		},
		onLoad() {
			const self = this;
			//self.$Utils.loadAll(['getUserInfoData'], self);
		},
		methods: {
			
			check(){
				const self = this;
				var newObject = self.$Utils.cloneForm(self.submitData);
				var pass = self.$Utils.checkComplete(newObject);
				if(pass){
					self.isComplete = true
				}else{
					self.isComplete = false
				}
			},
			
			upLoadImg(type) {
				const self = this;			
				const callback = (res) => {
					console.log('res', res)
					if (res.solely_code == 100000) {
						//self.submitData[type] = [];
						uni.hideLoading();
						
						self.submitData[type].push({url:res.info.url,type:'image'})
						console.log(self.submitData)
						self.check()
					} else {
						self.$Utils.showToast('网络故障', 'none')
					}
				};				
				uni.chooseImage({
					count: 1,
					success: function(res) {
						var tempFilePaths = res.tempFilePaths;
						for (var i = 0; i < tempFilePaths.length; i++) {
							var file = res.tempFiles[i];
							var obj = res.tempFiles[i].path.lastIndexOf(".");
							var ext = res.tempFiles[i].path.substr(obj+1);
							console.log(callback)
							self.$Utils.uploadFile(tempFilePaths[i], 'file', {
								tokenFuncName: 'getProjectToken',ext:ext,md5:'md5',totalSize:file.size,start:0,chunkSize:file.size,originName:'headImg'
							}, callback)
						}
					},
					fail: function(err) {
						uni.hideLoading();
					},			
				})			
			},
			
			submit() {
				const self = this;
				
				
				if(!self.isComplete){
					uni.setStorageSync('canClick', true);
					return
				};
				if(self.submitData.name == ''){
					uni.setStorageSync('canClick', true);
					self.$Utils.showToast('请填写姓名', 'none')
					return
				};
				if(self.submitData.idCard == ''){
					uni.setStorageSync('canClick', true);
					self.$Utils.showToast('请填写身份证号', 'none')
					return
				};
				if(self.submitData.id_front_img.length==0){
					uni.setStorageSync('canClick', true);
					self.$Utils.showToast('请上传身份证正面', 'none')
					return
				};
				if(self.submitData.id_back_img.length==0){
					uni.setStorageSync('canClick', true);
					self.$Utils.showToast('请上传身份证背面', 'none')
					return
				};
				if(!/^\d{17}(\d|x)$/i.test(self.submitData.idCard)) {
					uni.setStorageSync('canClick', true);
					self.$Utils.showToast('你输入的身份证长度或格式错误', 'none', 1000)
					return;
				};
				self.userInfoUpdate();
				/* const pass = self.$Utils.checkComplete(self.submitData);
				console.log('pass', pass);
				console.log('self.submitData',self.submitData)
				
				if (pass) {	
					self.userInfoUpdate();
				} else {
					uni.setStorageSync('canClick', true);
					self.$Utils.showToast('请补全信息', 'none')
				}; */
			},
			
			userInfoUpdate(){
				const self = this;
				const postData = {};
				postData.tokenFuncName = 'getProjectToken';
				var newObject = self.$Utils.cloneForm(self.submitData);
				postData.data = self.$Utils.cloneForm(newObject);
				postData.searchItem = {
					user_no:uni.getStorageSync('user_info').user_no
				};
				const callback = (res) => {
					if (res.solely_code==100000) {
						uni.showModal({
							content:'已提交 我们将在一个工作日内反馈审核结果',
							showCancel:false,
							success(res) {
								if(res.confirm){
									uni.navigateBack({
										delta:1
									})
								}
							}
						})	
					}else{
						self.$Utils.showToast(res.msg, 'none');
					}
				};
				self.$apis.userInfoUpdate(postData, callback);
			},
			
			/* getUserInfoData(){
				const self = this;
				const postData = {};
				postData.tokenFuncName = 'getProjectToken';
				postData.searchItem = {
					user_no:uni.getStorageSync('user_info').user_no
				};
				const callback = (res) => {
					if (res.solely_code==100000) {
						self.userInfoData = res.info.data[0];
						if()
					}else{
						self.$Utils.showToast(res.msg, 'none');
					}
					self.$Utils.finishFunc('getUserInfoData');
				};
				self.$apis.userInfoGet(postData, callback);
			}, */
			
		}
	}
</script>

<style scoped>
input{font-size: 34rpx;padding: 0 0 40rpx;border-bottom: 1px solid #f5f5f5;}
.upload{background-color: #FFFBF5;line-height: 50rpx;}
.uploadImg{width: 280rpx;height: 174rpx;margin: 20rpx 25rpx;}
.zjImg{width: 160rpx;height: 117rpx;margin-bottom: 10rpx;}
.btnAuto{background: #F78226;line-height: 98rpx;border-radius: 49rpx;;}
</style>
