<template>
	<view class="p-r" :class="is_show?'none':''">
		
		
		<view class="p-r">
			<image v-for="(item,index) in cardData.mainImg" :key="index" :src="item.url" mode="widthFix"></image>
		</view>
		
		<view class="p-aXY text-center">
			<view class="p-a z10 w-100" :style="{top:statusBar+10+'px'}" @click="Router.back({route:{path:-1}})">
				<image src="../../static/images/back2.png" class="back mt-1 ml-4"></image>
				<view class="colorf font-38 p-aXY">会员申请</view>
			</view>
			<view class="conTxt pl-3 colorY">
				<view>预计每年可省{{cardData.o_price?cardData.o_price:''}}元</view>
				<view class="btnBox p-r">
					<image src="../../static/images/vipBtn.png" mode="widthFix"></image>
					<view class="p-aXY flex color8">
						<view class="w-50 pl-4 c1"><text class="price1">{{cardData.price?cardData.price:''}}</text>/年</view>
						<view class="w-50 font-36 colorG pl-3" @click="isShow">立即加入</view>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 弹窗 -->
		<view class="bg-mask d-flex flex-column" v-show="is_show">
			<view @click="isShow" class="flex-1"></view>
			<view class="maskBox w-100">
				<view class="p-r">
					<image src="../../static/images/card2.png" mode="widthFix"></image>
					<view class="p-aXY text-center color0 txt">
						<view class="font-32">{{cardData.title?cardData.title:''}}</view>
						<view class="time font-32">（{{Utils.timeto(now,'ymd')}}--{{Utils.timeto(yearLater,'ymd')}}）</view>
						<view><text class="price1 pri">{{cardData.price?cardData.price:''}}</text>/年</view>
					</view>
				</view>
				
				<!-- 填写资料 -->
				<view class="bg-white radius40-T py-5 px-4 p-r conInp" v-show="!pay_show">
					<image src="../../static/images/vip-icon2.png" mode="widthFix" class="txtImg"></image>
					<input type="text" @input="check" v-model="submitData.name" placeholder="请输入姓名" placeholder-style="font-size: 36rpx;color: #BFBFBF;" />
					<input type="text" @input="check" v-model="submitData.phone" placeholder="请输入手机号"  placeholder-style="font-size: 36rpx;color: #BFBFBF;" />
					<view class="flex1 yzm">
						<input type="text" @input="check" v-model="submitData.code" placeholder="请输入验证码"  placeholder-style="font-size: 36rpx;color: #BFBFBF;" />
						<view class="font-36 mb-4 color0 line-h pl-3 bL-f5" style="z-index: 99;" @click="sendCode()" v-if="!hasSend">{{text}}</view>
						<view class="font-36 mb-4 color0 line-h pl-3 bL-f5" style="z-index: 99;" v-if="hasSend">{{text}}</view>
					</view>
					<input type="text" v-model="parent_phone" placeholder="请输入邀请人手机号(选填)"  placeholder-style="font-size: 36rpx;color: #BFBFBF;" />
					<view class="flex0 pb-4" @click="chooseAgree">
						<image :src="choose?'../../static/images/vip-icon1.png':'../../static/images/car-icon3.png'" class="wh26 mr-1"></image>
						<view>点击立即申请即同意<text class="color0" @click="Router.navigateTo({route:{path:'/pages/index-agreement/index-agreement'}})">《会员协议》</text></view>
					</view>
					<view class="btnAuto" v-if="!isComplete" style="opacity: 0.5;">立即申请</view>
					<view class="btnAuto" @click="Utils.stopMultiClick(userInfoUpdate)" v-if="isComplete">立即申请</view>
					
				</view>
				
				<!-- 会员支付 -->
				<view class="bg-white radius50-T py-5 px-4 p-r font-34 conInp" v-show="pay_show">
					<image src="../../static/images/vip-icon3.png" mode="widthFix" class="txtImg"></image>
					<view class="py-3 bB-e1 flex1">
						<view class="color8">产品名称</view>
						<view class="color3">{{cardData.title?cardData.title:''}}</view>
					</view>
					<view class="py-3 bB-e1 flex1">
						<view class="color8">会员时限</view>
						<view class="color3">{{cardData.duration?cardData.duration:''}}天(今日至{{Utils.timeto(yearLater,'ymd')}})</view>
					</view>
					<view class="py-3 bB-e1 mb-5 flex1">
						<view class="color8">支付方式</view>
						<view class="color3 flex">
							<image src="../../static/images/vip-icon.png" class="wx-icon mr-1"></image>
							<view>微信</view>
						</view>
					</view>
					<view class="btnAuto" @click="Utils.stopMultiClick(message)">立即支付</view>
				</view>
				
			</view>
		</view>
		
	</view>
</template>

<script>
	const app = getApp();
	export default {
		data() {
			return {
				Router:this.$Router,
				statusBar: app.globalData.statusBar,
				is_show:false,
				pay_show:false,
				cardData:{},
				now:0,
				yearLater:0,
				Utils:this.$Utils,
				submitData:{
					name:'',
					phone:'',
					code:''
				},
				parent_phone:'',
				isComplete:false,
				currentTime:61,
				text:'获取',
				hasSend:false,
				choose:true
			}
		},
		
		onLoad() {
			const self = this;
			self.now = (new Date()).getTime();
			
			self.$Utils.loadAll(['getUserInfoData','getCardData'], self);
		},
		
		methods: {
			
			
			chooseAgree(){
				const self = this;
				self.choose = !self.choose;
			},
			
			message(){
				const self = this;
				 //self.goPay()
				uni.setStorageSync('canClick', false);
				wx.requestSubscribeMessage({
				  tmplIds: ['Jai1dlDTUQq9dlLyiHeRUF0VXlKq7Zz2VR_au-g5PNQ','GryED-tE5oFD10QGoH1uctB5Sd_hGg1DrMnaUm-KRyU'],
				  success (res) { 
					  console.log(res)
					  if(res){
						  self.submit()
					  }
				  },
				  fail(err) {    //失败
				  					
				  	self.submit()
				  }
				})
			},
			
			submit(){
				const self = this;
				uni.setStorageSync('canClick', false);
				var orderList = []
				var data = {
					type:2,
					level:1
				};
				if(self.parent_phone!=''){
					data.passage1 = self.parent_phone
				};
				orderList.push({product_id:self.cardData.id,count:1,data:data})
				self.addOrder(orderList)
			},
			
			addOrder(orderList) {
				const self = this;	
				const postData = {}; 
				postData.orderList = self.$Utils.cloneForm(orderList);
				postData.tokenFuncName = 'getProjectToken';
				const callback = (res) => {
					uni.setStorageSync('canClick', true);
					if (res && res.solely_code == 100000) {
						self.orderId = res.info.id;
						self.goPay()
					} else {		
						uni.showToast({
							title: res.msg,
							duration: 2000
						});
					};		
				};
				self.$apis.addOrder(postData, callback);
			},
			
			goPay() {
				const self = this;	
				const postData = {};
				postData.wxPay = {
					price:parseFloat(self.cardData.price).toFixed(2),
				};
				postData.tokenFuncName = 'getProjectToken',
				postData.searchItem = {
					id: self.orderId
				};
				/* postData.payAfter = [
					{
						tableName: 'UserInfo',
						FuncName: 'update',
						searchItem:{
							user_no:uni.getStorageSync('user_info').user_no
						},
						data: {
							behavior:2,
							deadline:(self.userData.info.deadline==0?(new Date()).getTime() / 1000:self.userData.info.deadline)+self.productData[self.vipCurr].duration*86400
						},
					},
				]; */
				postData.refreshToken = true;
				const callback = (res) => {
					if (res.solely_code == 100000) {
						uni.setStorageSync('canClick', true);
						if (res.info) {
							const payCallback = (payData) => {
								console.log('payData', payData)
								if (payData == 1) {
									self.$Utils.showToast('支付成功','none')
									setTimeout(function() {
										self.Router.redirectTo({route:{path:'/pages/paySuccess/paySuccess?type=vip'}})
									}, 1000);
								} else {
									uni.setStorageSync('canClick', true);
									self.$Utils.showToast(res.msg,'none')
								};
							};
							self.$Utils.realPay(res.info, payCallback);
						} else {
							self.$Utils.showToast('支付成功','none')
							setTimeout(function() {
								self.Router.redirectTo({route:{path:'/pages/paySuccess/paySuccess?type=vip'}})
							}, 1000);
						};
					} else {
						uni.setStorageSync('canClick', true);
						self.$Utils.showToast(res.msg,'none')
					};
				};
				self.$apis.pay(postData, callback);
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
			
			getUserInfoData(){
				const self = this;
				const postData = {};
				postData.tokenFuncName = 'getProjectToken';
				postData.searchItem = {
					user_no:uni.getStorageSync('user_info').user_no
				};
				const callback = (res) => {
					if (res.solely_code==100000) {
						if(res.info.data[0].phone!=''&&!self.parent_phone==''&&res.info.data[0].behavior==1){
							self.pay_show = true
						}
					}else{
						self.$Utils.showToast(res.msg, 'none');
					}
					self.$Utils.finishFunc('getUserInfoData');
				};
				self.$apis.userInfoGet(postData, callback);
			},
			
			userInfoUpdate(){
				const self = this;
				
				uni.setStorageSync('canClick', false);
				if(!self.choose){
					uni.setStorageSync('canClick', true);
					self.$Utils.showToast('请阅读并同意会员协议','none');
					return
				}
				const postData = {};
				postData.tokenFuncName = 'getProjectToken';
				postData.data = {
					name:self.submitData.name,
					phone:self.submitData.phone
				};
				postData.searchItem = {
					user_no:uni.getStorageSync('user_info').user_no
				};
				
				/* postData.smsAuth = {
					phone:self.submitData.phone,						
					code:self.submitData.smsCode,
				}; */
				if(self.parent_phone!=''){
					postData.invite = self.parent_phone
				};
				const callback = (res) => {
					uni.setStorageSync('canClick', true);
					if (res.solely_code==100000) {
						self.pay_show = true
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
				var phone = self.submitData.phone;
				
				if (phone.trim().length != 11 || !/^1[3|4|5|6|7|8|9]\d{9}$/.test(phone)) {
					self.$Utils.showToast('请输入正确的手机号', 'none', 1000)
					return;
				}
				var postData = {
					data:{
						phone:self.submitData.phone,
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
			
			getCardData() {
				const self = this;
				const postData = {};
				postData.searchItem = {
					thirdapp_id: 2,
					type:2
				};
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.cardData = res.info.data[0];
						self.cardData.price = parseFloat(self.cardData.price);
						self.yearLater = (new Date()).getTime()+86400000*self.cardData.duration;
					}
					self.$Utils.finishFunc('getCardData');
				};
				self.$apis.productGet(postData, callback);
			},
			
			isShow(){
				const self = this;
				self.is_show = !self.is_show
			},
			payShow(){
				const self = this;
				self.pay_show = !self.pay_show
			}
		}
	}
</script>
<style>
page{height: 100%;}
</style>
<style scoped>
.conTxt{padding-top: 585rpx;}
.btnBox{width: 630rpx;height: 94rpx;margin: 323rpx auto 0;}
.c1{color: #A28A60;}
.price1{color: #2C2419;font-size: 56rpx;}
.none{height: 100%;overflow: hidden;}

.maskBox{max-height: 100%;overflow-y: auto;}
.conInp{margin-top: -50rpx;}
.txtImg{width: 506rpx;margin: 0 auto 50rpx;}
.txt{padding-top: 186rpx;}
input,.yzm{padding: 0 40rpx;border: 1rpx solid #BFBFBF;border-radius: 43rpx;line-height: 86rpx;height: 86rpx;margin-bottom: 40rpx;font-size: 36rpx;color: #333;}
.color0,.pri{color: #7D5A30;}
.time{color:rgba(125,90,48,0.5);}
.yzm input{border: none;padding-left: 0;height: 86rpx;}
.btnAuto{background-color: #DEBE93!important;color: #7D5A30;line-height: 94rpx;border-radius: 47rpx;}
</style>
