<template>
	<view>
		
		<view class="bg-white px-3 line-h">
			<view class="font-30 pt-3 py-28">姓名</view>
			<input type="text" @input="check" v-model="submitData.name" placeholder="请输入姓名" placeholder-style="color:#888"/>
			<view class="font-30 pt-3 py-28">手机号</view>
			<input type="number" @input="check"  v-model="submitData.phone" placeholder="请输入手机号" placeholder-style="color:#888"/>
			<view class="font-30 pt-3 py-28">所在地区</view>
			<view class="flex1 pb-4 bB-f5">
				<picker mode="region" @change="cityChange">
					<view class="color8 font-34" :style="submitData.city!=''?'color:#222':''">{{submitData.city==''?'请选择所在地区':submitData.city}}</view>
				</picker>
				<image src="../../static/images/store-icon10.png" class="r-icon"></image>
			</view>
			<view class="font-30 pt-3 py-28">详细地址</view>
			<input type="text" @input="check"  v-model="submitData.detail" placeholder="请输入详细地址" placeholder-style="color:#888"/>
		</view>
		<view class="f720"></view>
		<view class="bg-white p-3 flex1">
			<view class="font-30">设为默认地址</view>
			<image  @click="changeDefault" :src="submitData.isdefault==0?'../../static/images/address-icon.png':'../../static/images/address-icon1.png'" class="addressIcon"></image>
		</view>
		
		<view class="btnM" :class="!isComplete?'btnX':''"  @click="Utils.stopMultiClick(submit)">{{id>0?'提交':'新增'}}</view>   <!-- 类名btnX为按钮禁用样式 -->
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				submitData: {
					name: '',
					city:'',
					detail: '',
					phone:'',
					isdefault:0,
				},
				Utils:this.$Utils,
				id:0,
				isComplete:false
			}
		},
		
		onLoad(options) {
			const self = this;
			uni.setStorageSync('canClick', true);
			if(options.id){
				self.id = options.id;
				self.$Utils.loadAll(['getMainData'], self);
				uni.setNavigationBarTitle({
					title:'编辑地址'
				})
			}
		},
		
		methods: {
			
			check(){
				const self = this;
				var newObject = self.$Utils.cloneForm(self.submitData);
				delete newObject.isdefault;
				var pass = self.$Utils.checkComplete(newObject);
				if(pass){
					self.isComplete = true
				}else{
					self.isComplete = false
				}
			},
			
			
			changeDefault(){
				const self = this;
				if(self.submitData.isdefault==0){
					self.submitData.isdefault = 1
				}else{
					self.submitData.isdefault = 0
				}
			},
			
			cityChange(e){
				const self = this;
				self.submitData.city = e.detail.value[0]+e.detail.value[1]+e.detail.value[2];
				self.check();
			},
			
			
			choose(e) {
				const self = this;
				if(e.target.value){
					self.submitData.isdefault = 1
				}else{
					self.submitData.isdefault = 0
				}
				console.log('switch2 发生 change 事件，携带值为', e.target.value)
			},
			
			getMainData(id) {
				const self = this;
				const postData = {};
				postData.searchItem = {};
				postData.searchItem.id = self.id;
				postData.tokenFuncName = 'getProjectToken';
			
				const callback = (res) => {
					console.log(res);
					self.submitData.name = res.info.data[0].name;
					self.submitData.city = res.info.data[0].city;
					self.submitData.detail = res.info.data[0].detail;
					self.submitData.phone = res.info.data[0].phone;
					self.submitData.isdefault = res.info.data[0].isdefault;
					self.$Utils.finishFunc('getMainData');
				};
				self.$apis.addressGet(postData, callback);
			},
			
			
			
			addressUpdate() {
				const self = this;
				const postData = {};
			
				postData.tokenFuncName = 'getProjectToken';
			
				postData.searchItem = {};
				postData.searchItem.id = self.id;
				postData.data = {};
				postData.data = self.$Utils.cloneForm(self.submitData);
			
				const callback = (data) => {
					uni.setStorageSync('canClick', true);
					if (data && data.solely_code == 100000) {
						self.$Utils.showToast('编辑成功','success');
						setTimeout(function() {
							uni.navigateBack({
								delta:1
							})
						}, 1000);
					} else {
						self.$Utils.showToast(data.msg,'error')
					};
					
				};
				self.$apis.addressUpdate(postData, callback);
			},
			
			
			addressAdd() {
				const self = this;
				const postData = {};
			
				postData.tokenFuncName = 'getProjectToken';
			
				postData.data = {};
				postData.data = self.$Utils.cloneForm(self.submitData);
				const callback = (data) => {
					uni.setStorageSync('canClick', true);
					if (data && data.solely_code == 100000) {
						self.$Utils.showToast('添加成功','success');
						setTimeout(function() {
							uni.navigateBack({
								delta:1
							})
						}, 1000);
					} else {
						self.$Utils.showToast(data.msg,'success')
					}
					
				};
				self.$apis.addressAdd(postData, callback);
			},
			
			
			submit() {
				const self = this;
				console.log(34)
				
				console.log(12)
				uni.setStorageSync('canClick', false);
				if(!self.isComplete){
					uni.setStorageSync('canClick', true);
					return
				};
				var newObject = self.$Utils.cloneForm(self.submitData);
				delete newObject.default;
				const pass = self.$Utils.checkComplete(newObject);
				
				console.log('self.data.sForm', self.submitData)
				console.log('pass', pass)
				if (pass) {
					if (self.submitData.phone.trim().length != 11 || !/^1[3|4|5|6|7|8|9]\d{9}$/.test(self.submitData.phone)) {
						uni.setStorageSync('canClick', true);
						self.$Utils.showToast('请输入正确的手机号', 'none', 1000)
						return;
					}
					if (self.id) {
			
						self.addressUpdate();
					} else {
			
						self.addressAdd();
					}
			
			
				} else {
					uni.setStorageSync('canClick', true);
					self.$Utils.showToast('请补全信息','success');
				};
			},
			
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
