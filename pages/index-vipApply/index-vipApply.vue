<template>
	<view class="p-r" :class="is_show?'none':''">
		
		
		<view class="p-r">
			<image src="../../static/images/vipPost1.png" mode="widthFix"></image>
			<image src="../../static/images/vipPost2.png" mode="widthFix"></image>
			<image src="../../static/images/vipPost3.png" mode="widthFix"></image>
			<image src="../../static/images/vipPost4.png" mode="widthFix"></image>
		</view>
		
		<view class="p-aXY text-center">
			<view class="p-a z10 w-100" :style="{top:statusBar+10+'px'}" @click="Router.back({route:{path:-1}})">
				<image src="../../static/images/back2.png" class="back mt-1 ml-4"></image>
				<view class="colorf font-38 p-aXY">会员申请</view>
			</view>
			<view class="conTxt pl-3 colorY">
				<view>预计每年可省11287.5元</view>
				<view class="btnBox p-r">
					<image src="../../static/images/vipBtn.png" mode="widthFix"></image>
					<view class="p-aXY flex color8">
						<view class="w-50 pl-4 c1"><text class="price1">3998</text>/年</view>
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
						<view class="font-32">铝实惠超级会员</view>
						<view class="time font-32">（2020.07.09-2021.07.09）</view>
						<view><text class="price1 pri">3988</text>/年</view>
					</view>
				</view>
				
				<!-- 填写资料 -->
				<view class="bg-white radius40-T py-5 px-4 p-r conInp" v-show="!pay_show">
					<image src="../../static/images/vip-icon2.png" mode="widthFix" class="txtImg"></image>
					<input type="text" value="" placeholder="请输入姓名" placeholder-style="font-size: 36rpx;color: #BFBFBF;" />
					<input type="text" value="" placeholder="请输入手机号"  placeholder-style="font-size: 36rpx;color: #BFBFBF;" />
					<view class="flex1 yzm">
						<input type="text" value="" placeholder="请输入验证码"  placeholder-style="font-size: 36rpx;color: #BFBFBF;" />
						<view class="font-36 mb-4 color0 line-h pl-3 bL-f5">获取</view>
					</view>
					<input type="text" value="" placeholder="请输入邀请人手机号(选填)"  placeholder-style="font-size: 36rpx;color: #BFBFBF;" />
					<view class="btnAuto" @click="payShow">立即申请</view>
					<view class="flex0 pt-4">
						<image src="../../static/images/vip-icon1.png" class="wh26 mr-1"></image>
						<view>点击立即申请即同意<text class="color0" @click="Router.navigateTo({route:{path:'/pages/index-agreement/index-agreement'}})">《会员协议》</text></view>
					</view>
				</view>
				
				<!-- 会员支付 -->
				<view class="bg-white radius50-T py-5 px-4 p-r font-34 conInp" v-show="pay_show">
					<image src="../../static/images/vip-icon3.png" mode="widthFix" class="txtImg"></image>
					<view class="py-3 bB-e1 flex1">
						<view class="color8">产品名称</view>
						<view class="color3">铝实惠超级会员</view>
					</view>
					<view class="py-3 bB-e1 flex1">
						<view class="color8">会员时限</view>
						<view class="color3">365天(今日至2021.07.10)</view>
					</view>
					<view class="py-3 bB-e1 mb-5 flex1">
						<view class="color8">支付方式</view>
						<view class="color3 flex">
							<image src="../../static/images/vip-icon.png" class="wx-icon mr-1"></image>
							<view>微信</view>
						</view>
					</view>
					<view class="btnAuto" @click="Router.navigateTo({route:{path:'/pages/paySuccess/paySuccess'}})">立即支付</view>
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
				pay_show:false
			}
		},
		methods: {
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
