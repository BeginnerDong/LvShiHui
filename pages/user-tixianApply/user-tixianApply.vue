<template>
	<view>
		
		<view class="bg-white px-3 line-h">
			<view class="font-30 pt-3 pb-28">类型</view>
			<view class="font-34 pb-4 bB-f5">{{submitData.type==2?'买铝返现':'推广返佣'}}</view>
			<view class="font-30 pt-3 pb-28">姓名</view>
			<input type="text" v-model="submitData.name" placeholder="请输入真实姓名" placeholder-style="color:#888"/>
			<view class="font-30 pt-3 pb-28">电话</view>
			<input type="number" v-model="submitData.phone" placeholder="请输入联系电话" placeholder-style="color:#888"/>
			<view class="font-30 pt-3 pb-28">开户行</view>
			<input type="text" v-model="submitData.bank" placeholder="请输入银行开户行" placeholder-style="color:#888"/>
			<view class="font-30 pt-3 pb-28">银行卡号</view>
			<input type="number" v-model="submitData.card_no" placeholder="请输入银行卡号" placeholder-style="color:#888"/>
		</view>
		<view class="f720"></view>
		<view class="bg-white px-3">
			<view class="font-30 py-3">金额</view>
			<view class="font-34 pb-4 flex bB-f5">
				<input type="text" @input="check" v-model="submitData.count" placeholder="请输入提现金额" placeholder-style="color:#888" class="input"/>
				<view>人民币</view>
			</view>
			<view class="flex1 py-3">
				<view class="color8" v-if="!limit">可提现 <text class="px-1">{{canCount}}</text> 元</view>
				<view class="color8" v-if="limit">超出可提现 <text class="px-1 colorR">{{canCount}}</text> 元</view>
				<view class="colorM" @click="allCount">全部提现</view>
			</view>
		</view>
		
		<view class="font-30 color8 line-h px-3 py-4">
			<view>温馨提示</view>
			<view class="txt t-indent30 p-r pt-3">提现需要线下打款，请填写真实姓名以及开户行</view>
			<view class="txt t-indent30 p-r pt-3">务必确保信息准确无误</view>
			<view class="txt t-indent30 p-r pt-3">提交成功后我们将尽快为您处理，感谢您的支持！</view>
		</view>
		
		<view style="height: 190rpx;"></view>
		<view class="px-3 pb-2 p-fX bottom-0 bT-e1 bg-white z10">
			<view class="font-32 pt-3 pb-3 flex1 line-h">
				<view class="color8">到账数量</view>
				<view>￥{{submitData.count!=''?submitData.count:'0.00'}}</view>
			</view>
			<view class="btnM" :class="!isComplete?'o4':'o10'" @click="Utils.stopMultiClick(submit)">提交申请</view>
		</view>
		
		<!-- 提示弹窗 -->
		<!-- <view class="bg-mask">
			<view class="maskBoxs p-aXY text-center font-34 flex4">
				<view class="flex0 w-100 t1 flex-1"> 已提交 我们将在一个 工作日之内反馈审核结果 </view>
				<view class="bT-e1 py-3 w-100 colorB">确定</view>
			</view>
		</view> -->
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type:'',
				canCount:'',
				submitData:{
					type:'',
					count:'',
					thirdapp_id:2,
					account:1,
					withdraw: 1,
					withdraw_status: '0',
					status: 1,
					name:'',
					phone:'',
					bank:'',
					card_no:''
				},
				limit:false,
				isComplete:false,
				Utils:this.$Utils,
				Router:this.$Router
			}
		},
		onLoad(options) {
			const self = this;
			self.submitData.type = options.type;
			self.canCount = options.num;
			self.$Utils.loadAll(['getUserInfoData'], self);
		},
		methods: {
			
			submit() {
				const self = this;
				console.log(111)
				uni.setStorageSync('canClick', false);
				if(!self.isComplete){
					uni.setStorageSync('canClick', true);
					return
				};
				self.flowLogAdd();
			},
			
			flowLogAdd() {
				const self = this;
				const postData = {};
				postData.tokenFuncName = 'getProjectToken'
				postData.data = self.$Utils.cloneForm(self.submitData);
				postData.data.count = - postData.data.count;
				postData.data.user_no = uni.getStorageSync('user_info').user_no
				console.log(postData)
				postData.saveAfter = [
					{
						tableName: 'UserInfo',
						FuncName: 'update',
						searchItem:{
							user_no:uni.getStorageSync('user_info').user_no
						},
						data: {
							card_name:self.submitData.name,
							card_phone:self.submitData.phone,
							bank:self.submitData.bank,
							card_no:self.submitData.card_no
						},
					},
				];
				const callback = (data) => {
					if (data.solely_code == 100000) {
						uni.showModal({
							content:'已提交 我们将在一个 工作日之内反馈审核结果',
							showCancel:false,
							success(res) {
								if(res.confirm){
									self.Router.reLaunch({route:{path:'/pages/user/user'}})
								}
							}
						})	
					} else {
						uni.setStorageSync('canClick', true);
						self.$Utils.showToast(data.msg, 'none', 1000)
					}
				};
				self.$apis.flowLogAdd(postData, callback);
			},
			
			check(){
				const self = this;
				if(parseFloat(self.submitData.count)>parseFloat(self.canCount)){
					self.submitData.count = '';
					self.limit = true
					//self.isComplete = false
				}else{
					self.limit = false
				}
				var newObject = self.$Utils.cloneForm(self.submitData);
				var pass = self.$Utils.checkComplete(newObject);
				if(pass){
					self.isComplete = true
				}else{
					self.isComplete = false
				}
			},
			
			getUserInfoData() {
				const self = this;
				const postData = {
					searchItem: {}
				};
				postData.tokenFuncName = 'getProjectToken';
				postData.searchItem.user_no = uni.getStorageSync('user_info').user_no;
				postData.noLoading = true;
				const callback = (res) => {
					if (res.solely_code == 100000 && res.info.data[0]) {
						self.userInfoData = res.info.data[0]
						self.submitData.name = self.userInfoData.card_name;
						self.submitData.phone = self.userInfoData.card_phone;
						self.submitData.bank = self.userInfoData.bank;
						self.submitData.card_no = self.userInfoData.card_no;
					} else {
						self.$Utils.showToast(res.msg, 'none');
					};
					self.$Utils.finishFunc('getUserInfoData');
			
				};
				self.$apis.userInfoGet(postData, callback);
			},
			
			allCount(){
				const self =  this;
				self.submitData.count = self.canCount
				self.check()
			},
		}
	}
</script>

<style>
page{background-color: #F7F9FB;}
</style>
<style scoped>
input{font-size: 34rpx;padding: 0 0 40rpx;border-bottom: 1px solid #f5f5f5;flex: 1;}
.pb-28{padding-bottom: 28rpx;}
.input{border: none;flex: 1;padding: 0;}
.txt::before{content: '';width: 10rpx;height: 10rpx;background-color: #888;border-radius: 50%;position: absolute;left: 0;top: 70%;}


</style>
