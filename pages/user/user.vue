<template>
	<view class="color3 line-h">
		
		<view class="bg-white mt-2 p-4 pb-3">
			<view class="flex1">
				<view>
					<view class="font-56 pb-3 font-w flex">
						<view>微信号</view>
						<!-- 会员展示图标 -->
						<image src="../../static/images/my-icon10.png" class="vip ml-2"></image>
					</view>
					<view class="font-30 color8">UID：6565841</view>
				</view>
				
				<image src="../../static/images/user.png" class="userImg"></image>
			</view>
			<view class="p-r overflow-h mt-2">
				<image src="../../static/images/store-img2.png" class="bgImg"></image>
				<view class="p-r pt-4 px-3 flex1 vipCon1">
					<view class="line-h">
						<view class="font-40 colorf">超级会员</view>
						<view class="colorZ pt-2">8大尊贵特权</view>
					</view>
					<view class="vipBtn">申请会员</view>
				</view>
			</view>
		</view>
		
		<view class="bg-white mt-2 px-4 py-3">
			<view class="pb-4 flex1 font-32">
				<view>我的订单</view>
				<view class="flex color9 font-30"
				@click="Router.navigateTo({route:{path:'/pages/user-order/user-order?id=0'}})">
					<view>查看全部</view>
					<image src="../../static/images/store-icon10.png" class="r-icon ml-1"></image>
				</view>
			</view>
			<view class="flex1">
				<image src="../../static/images/my-icon.png" class="myIcon"
				@click="Router.navigateTo({route:{path:'/pages/user-order/user-order?id=0'}})"></image>
				<image src="../../static/images/my-icon1.png" class="myIcon"
				@click="Router.navigateTo({route:{path:'/pages/user-order/user-order?id=1'}})"></image>
				<image src="../../static/images/my-icon2.png" class="myIcon"
				@click="Router.navigateTo({route:{path:'/pages/user-order/user-order?id=2'}})"></image>
				<image src="../../static/images/my-icon3.png" class="myIcon"
				@click="Router.navigateTo({route:{path:'/pages/user-order/user-order?id=3'}})"></image>
				<image src="../../static/images/my-icon4.png" class="myIcon"
				@click="Router.navigateTo({route:{path:'/pages/user-order/user-order?id=4'}})"></image>
			</view>
		</view>
		
		<view class="bg-white mt-2 px-4 py-3 p-r">
			<image src="../../static/images/my-img.png" class="bgImg2"></image>
			<view class="p-aXY colorf p-3 mx-4">
				<view class="colorZ text-right py15">可提现：0元</view>
				<view class="font-26 color8">总资产（￥）</view>
				<view class="py-2 flex1">
					<view class="font-68">00.00</view>
					<view class="font-30 px-2 py15 b-f5 radius10 borderB"
					@click="Router.navigateTo({route:{path:'/pages/user-wallet/user-wallet'}})">我的钱包</view>
				</view>
				<view class="color8 font-26 flex1 py-4">
					<view class="w-50 bR-f5 borderB">推广佣金 <text class="colorf pl-2">0</text></view>
					<view>买铝返钱 <text class="colorf pl-2">0</text></view>
				</view>
			</view>
		</view>
		
		<view class="bg-white mt-2 px-4 py-3 flex1">
			<view class="p-r" @click="Router.navigateTo({route:{path:'/pages/user-invitation/user-invitation'}})">
				<image src="../../static/images/my-img1.png" class="bgImg3"></image>
				<view class="p-aXY p-3">
					<view class="font-32 pb-2">邀请好友</view>
					<view class="color8">成功邀请<text class="color3">0</text>人</view>
				</view>
			</view>
			<button class="p-r line-h text-left">
				<image src="../../static/images/my-img1.png" class="bgImg3"></image>
				<view class="p-aXY p-3">
					<view class="font-32 pb-2">在线客服</view>
					<view class="color8">24小时在线</view>
				</view>
			</button>
		</view>
		
		<view class="bg-white mt-2 px-4 font-34">
			<view class="flex1 py-3" @click="Router.navigateTo({route:{path:'/pages/user-coupon/user-coupon'}})">
				<image src="../../static/images/my-icon5.png" class="wh34"></image>
				<view class="flex-1 pl-3">优惠券</view>
				<image src="../../static/images/store-icon10.png" class="r-icon"></image>
			</view>
			<view class="flex1 py-3" @click="Router.navigateTo({route:{path:'/pages/user-realName/user-realName'}})">
				<image src="../../static/images/my-icon6.png" class="wh34"></image>
				<view class="flex-1 pl-3">实名认证</view>
				<image src="../../static/images/store-icon10.png" class="r-icon"></image>
			</view>
			<view class="flex1 py-3" @click="Router.navigateTo({route:{path:'/pages/user-aboutUs/user-aboutUs'}})">
				<image src="../../static/images/my-icon7.png" class="wh34"></image>
				<view class="flex-1 pl-3">关于我们</view>
				<image src="../../static/images/store-icon10.png" class="r-icon"></image>
			</view>
			<view class="flex1 py-3" @click="Router.navigateTo({route:{path:'/pages/user-setting/user-setting'}})">
				<image src="../../static/images/my-icon8.png" class="wh34"></image>
				<view class="flex-1 pl-3">设置</view>
				<image src="../../static/images/store-icon10.png" class="r-icon"></image>
			</view>
		</view>
		
		
		<view style="height: 160rpx;"></view>
		<!-- footer -->
		<view class="footer">
			<view class="item" @click="Router.redirectTo({route:{path:'/pages/index/index'}})">
				<image src="../../static/images/nabar1.png" mode=""></image>
				<view>商城</view>
			</view>
			<view class="item" @click="Router.redirectTo({route:{path:'/pages/car/car'}})">
				<image src="../../static/images/nabar2.png" mode=""></image>
				<view>购物车</view>
			</view>
			<view class="item on">
				<image src="../../static/images/nabar3-a.png" mode=""></image>
				<view>我的</view>
			</view>
		</view>
		
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
page{background-color: #F7F9FB;}
</style>
<style scoped>
.userImg{width: 142rpx;height: 142rpx;border-radius: 50%;}
.bgImg{width: 670rpx;height: 340rpx;position: absolute;top: 0;bottom: 0;right: 0;left: 0; margin: 0 auto;}
.vipBtn{width: 166rpx;line-height: 54rpx;text-align: center;background: #BC9667;color: #FDECDB;border-radius: 27rpx;}
.vipCon1{padding-bottom: 66rpx;}
.vip{width: 137rpx;height: 52rpx;}
.myIcon{width: 105rpx;height: 106rpx;}
.bgImg2{width: 670rpx;height: 290rpx;}
.py15{padding-top: 15rpx;padding-bottom: 15rpx;}
.borderB{border-color: rgba(255,255,255,0.2);}
.bgImg3{width: 324rpx;height: 130rpx;border-radius: 10rpx;}
.r-icon{width: 18rpx;height: 32rpx;}
</style>