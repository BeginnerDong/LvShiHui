<template>
	<view class="color3 line-h">
		
		<view class="bg-white mt-2 p-4 pb-3">
			<view class="flex1">
				<view v-if="isLogin">
					<view class="font-56 pb-3 font-w flex">
						<view v-if="userInfoData.is_check!=2"><open-data type="userNickName"></open-data></view>
						<view v-else>{{userInfoData.name?userInfoData.name:''}}</view>
						<!-- 会员展示图标 -->
						<image src="../../static/images/my-icon10.png" class="vip ml-2"></image>
					</view>
					<view class="font-30 color8">UID：{{userInfoData.user_no?userInfoData.user_no:''}}</view>
				</view>
				<view v-else style="border:1px solid #222;border-radius:20rpx;height: 50rpx;padding:0 10rpx;line-height: 50rpx;" @click="login">立即登录</view>
				<view class="userImg" style="overflow: hidden;border-radius: 50%;height: 142rpx;width: 142rpx;"><open-data type="userAvatarUrl"></open-data></view>
				<!-- <image src="../../static/images/user.png" class="userImg"></image> -->
			</view>
			<view class="p-r overflow-h mt-2" v-if="isLogin">
				<image src="../../static/images/card3.png" class="bgImg"></image>
				<view class="p-r pt-4 px-3 flex1 vipCon1">
					<view class="line-h">
						<view class="font-40 colorf">金牌会员</view>
						<view class="colorZ pt-2" v-if="userInfoData&&userInfoData.behavior==0">8大尊贵特权</view>
						<view class="colorZ pt-2" v-if="userInfoData&&userInfoData.behavior==1">{{less}}天后到期</view>
					</view>
					<view class="vipBtn" v-if="userInfoData&&userInfoData.behavior==0"
					@click="Router.navigateTo({route:{path:'/pages/index-vipApply/index-vipApply'}})">申请会员</view>
					<view class="vipBtn" v-if="userInfoData&&userInfoData.behavior==1" 
					@click="Router.navigateTo({route:{path:'/pages/myVip/myVip'}})">我的权益</view>
				</view>
			</view>
		</view>
		
		<view class="bg-white mt-2 px-4 py-3">
			<view class="pb-4 flex1 font-32">
				<view>我的订单</view>
				<view class="flex color9 font-30"
				@click="router('/pages/user-order/user-order')">
					<view>查看全部</view>
					<image src="../../static/images/store-icon10.png" class="r-icon ml-1"></image>
				</view>
			</view>
			<view class="flex1">
				<image src="../../static/images/my-icon.png" class="myIcon"
				@click="router('/pages/user-order/user-order')"></image>
				<image src="../../static/images/my-icon1.png" class="myIcon"
				@click="router('/pages/user-order/user-order?num=1')"></image>
				<image src="../../static/images/my-icon2.png" class="myIcon"
				@click="router('/pages/user-order/user-order?num=2')"></image>
				<image src="../../static/images/my-icon3.png" class="myIcon"
				@click="router('/pages/user-order/user-order?num=3')"></image>
				<image src="../../static/images/my-icon4.png" class="myIcon"
				@click="router('/pages/user-order/user-order?num=4')"></image>
			</view>
		</view>
		
		<view class="bg-white mt-2 px-4 py-3 p-r">
			<image src="../../static/images/my-img.png" class="bgImg2"></image>
			<view class="p-aXY colorf p-3 mx-4">
				<view class="colorZ text-right py15">可提现：{{can?can:0}}元</view>
				<view class="font-26 color8">总资产（￥）</view>
				<view class="py-2 flex1">
					<view class="font-68">{{compute.all?compute.all:0}}</view>
					<view class="font-30 px-2 py15 b-f5 radius10 borderB"
					@click="router('/pages/user-wallet/user-wallet')">我的钱包</view>
				</view>
				<view class="color8 font-26 flex1 py-4">
					<view class="w-50 bR-f5 borderB">推广佣金 <text class="colorf pl-2">{{compute.tg?compute.tg:0}}</text></view>
					<view>买铝返钱 <text class="colorf pl-2">{{compute.ml?compute.ml:0}}</text></view>
				</view>
			</view>
		</view>
		
		<view class="bg-white mt-2 px-4 py-3 flex1">
			<view class="p-r" @click="checkAuth()">
				<image src="../../static/images/my-img2.png" class="bgImg3"></image>
				<view class="p-aXY p-3">
					<view class="font-32 pb-2">邀请好友</view>
					<view class="color8">成功邀请<text class="color3">0</text>人</view>
				</view>
			</view>
			<button class="p-r line-h text-left" open-type="contact">
				<image src="../../static/images/my-img1.png" class="bgImg3"></image>
				<view class="p-aXY p-3">
					<view class="font-32 pb-2">在线客服</view>
					<view class="color8 font-28">24小时在线</view>
				</view>
			</button>
		</view>
		
		<view class="bg-white mt-2 px-4 font-34">
			<view class="flex1 py-3" 
			@click="router('/pages/user-coupon/user-coupon')">
				<image src="../../static/images/my-icon5.png" class="wh34"></image>
				<view class="flex-1 pl-3">优惠券</view>
				<image src="../../static/images/store-icon10.png" class="r-icon"></image>
			</view>
			<view class="flex1 py-3" @click="check()">
				<image src="../../static/images/my-icon6.png" class="wh34"></image>
				<view class="flex-1 pl-3">实名认证</view>
				<image src="../../static/images/store-icon10.png" class="r-icon"></image>
			</view>
			<view class="flex1 py-3"
			
			 @click="Router.navigateTo({route:{path:'/pages/user-aboutUs/user-aboutUs'}})">
				<image src="../../static/images/my-icon7.png" class="wh34"></image>
				<view class="flex-1 pl-3">关于我们</view>
				<image src="../../static/images/store-icon10.png" class="r-icon"></image>
			</view>
			<view class="flex1 py-3" 
			 @click="router('/pages/user-setting/user-setting')">
				<image src="../../static/images/my-icon8.png" class="wh34"></image>
				<view class="flex-1 pl-3">设置</view>
				<image src="../../static/images/store-icon10.png" class="r-icon"></image>
			</view>
		</view>
		
		
		<view style="height: 160rpx;"></view>
		<!-- footer -->
		<view class="footer">
			<view class="item" @click="Router.redirectTo({route:{path:'/pages/index/index'}})">
				<view class="footIcon"><image src="../../static/images/nabar1.png" mode=""></image></view>
				<view>商城</view>
			</view>
			<view class="item" @click="Router.redirectTo({route:{path:'/pages/car/car'}})">
				<view class="footIcon"><image src="../../static/images/nabar2.png" mode=""></image></view>
				<view>购物车</view>
			</view>
			<view class="item on">
				<view class="footIcon"><image src="../../static/images/nabar3-a.png" class="onFootIcon"></image></view>
				<view>我的</view>
			</view>
		</view>
		
		
		<!-- 提示弹窗 -->
		<view class="bg-mask" v-show="is_show">
			<view class="maskBoxs p-aXY text-center font-34 flex4">
				<view class="flex0 w-100 t1 flex-1"> 实名认证已提交 我们将在一个 工作日之内反馈审核结果 </view>
				<view class="bT-e1 py-3 w-100 colorB">确定</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Router:this.$Router,
				is_show:false,
				userInfoData:{},
				less:0,
				flowLogData:[],
				compute:{},
				can:0,
				isLogin:getApp().globalData.isLogin
			}
		},
		onLoad() {
			const self = this;
			//self.paginate = self.$Utils.cloneForm(self.$AssetsConfig.paginate);
			console.log('isLogin',self.isLogin)
		},
		onShow() {
			const self = this;
			self.getUserInfoData();
			self.getFlowLogData()
		},
		
		methods: {
			
			login(){
				const self = this;
				const callback = (res) => {
					self.$Utils.showToast('登陆成功','none');
					self.isLogin = true;
					self.getUserInfoData();
					self.getFlowLogData()
				};
				self.$Token.getProjectToken(callback, {
					refreshToken: true,
				})
			},
			
			router(path){
				const self = this;
				if(!self.isLogin){
					uni.showModal({
						content:'未登录，是否立即登录',
						success(res) {
							if(res.confirm){
								const callback = (res) => {
									self.$Utils.showToast('登陆成功','none');
									self.isLogin = true;
									self.getUserInfoData();
									self.getFlowLogData()
								};
								self.$Token.getProjectToken(callback, {
									refreshToken: true,
								})
							}
						}
					})
					return
				};
				self.Router.navigateTo({route:{path:path}})
			},
			
			checkAuth(){
				const self = this;
				if(!self.isLogin){
					uni.showModal({
						content:'未登录，是否立即登录',
						success(res) {
							if(res.confirm){
								const callback = (res) => {
									self.$Utils.showToast('登陆成功','none');
									self.isLogin = true;
									self.getUserInfoData();
									self.getFlowLogData()
								};
								self.$Token.getProjectToken(callback, {
									refreshToken: true,
								})
							}
						}
					})
					return
				};
				if(self.userInfoData.behavior != 1){
					uni.showModal({
						content:'很抱歉，您不是会员，还不能邀请好友！',
						confirmText:'申请会员',
						success(res) {
							if(res.confirm){
								self.Router.navigateTo({route:{path:'/pages/index-vipApply/index-vipApply'}})
							}
						}
					})
				}else{
					self.Router.navigateTo({route:{path:'/pages/user-invitation/user-invitation'}})
				}
			},
			
			getFlowLogData() {
				const self = this;
				const postData = {};
				postData.tokenFuncName = 'getProjectToken';
				postData.searchItem = {
					thirdapp_id:2,
					type:['in',[2,3]]
				};
				postData.noLoading = true;
				postData.compute = {
				  tg:[
					'sum',
					'count',
					{user_no:wx.getStorageSync('user_info').user_no,type:3,count:['>',0],status:1}
				  ],
				  ml:[
					'sum',
					'count',
					{user_no:wx.getStorageSync('user_info').user_no,type:2,count:['>',0],status:1}  
				  ],
				  all:[
					'sum',
					'count',
					{user_no:wx.getStorageSync('user_info').user_no,type:['in',[2,3]],count:['>',0],status:1}  
				  ],
				  has:[
					'sum',
					'count',
					{user_no:wx.getStorageSync('user_info').user_no,type:['in',[2,3]],count:['<',0],status:1}  
				  ],
				};
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.flowLogData = res.info.data;
						self.compute = res.info.compute;
						self.can = self.compute.all + self.compute.has;
					};
				};
				self.$apis.flowLogGet(postData, callback);
			},
			
			check(){
				const self = this;
				if(!self.isLogin){
					uni.showModal({
						content:'未登录，是否立即登录',
						success(res) {
							if(res.confirm){
								const callback = (res) => {
									self.$Utils.showToast('登陆成功','none');
									self.isLogin = true;
									self.getUserInfoData();
									self.getFlowLogData()
								};
								self.$Token.getProjectToken(callback, {
									refreshToken: true,
								})
							}
						}
					})
					return
				};
				if(self.userInfoData.is_check==0){
					self.Router.navigateTo({route:{path:'/pages/authentication/authentication'}})
				}else if(self.userInfoData.is_check==1){
					uni.showModal({
						content:'实名认证已提交 我们将在一个 工作日之内反馈审核结果',
						showCancel:false,
					})
				}else if(self.userInfoData.is_check==2){
					self.Router.navigateTo({route:{path:'/pages/user-realName/user-realName'}})
				}
			},
			
			getUserInfoData() {
				const self = this;
				const postData = {};
				postData.tokenFuncName = 'getProjectToken';
				postData.noLoading = true;
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.userInfoData = res.info.data[0];
						if(self.userInfoData.behavior == 1){
							self.less = parseInt((self.userInfoData.deadline - (new Date()).getTime()/1000)/86400)
						}
					};
				};
				self.$apis.userInfoGet(postData, callback);
			},
		}
	}
</script>

<style>
page{background-color: #F7F9FB;}
</style>
<style scoped>
.userImg{width: 142rpx;height: 142rpx;border-radius: 50%;}
.bgImg{width: 670rpx;height: 340rpx;position: absolute;top: 0;bottom: 0;right: 0;left: 0; margin: 0 auto;}
.vipBtn{width: 166rpx;line-height: 54rpx;text-align: center;background: #BC9667;color: #FDECDB;border-radius: 27rpx;}
.vipCon1{padding-bottom: 57rpx;}
.vip{width: 137rpx;height: 52rpx;}
.myIcon{width: 105rpx;height: 106rpx;}
.bgImg2{width: 670rpx;height: 290rpx;}
.py15{padding-top: 15rpx;padding-bottom: 15rpx;}
.borderB{border-color: rgba(255,255,255,0.2);}
.bgImg3{width: 324rpx;height: 130rpx;border-radius: 10rpx;}
.r-icon{width: 18rpx;height: 32rpx;}
</style>