<template>
	<view>
		
		<view class="banner p-r">
			<swiper :indicator-dots="false" :autoplay="true" :interval="3000" :duration="1000">
				<swiper-item v-for="v in 3" :key="v" @click="Router.navigateTo({route:{path:'/pages/index-equity/index-equity?tit=banner点击进入'}})">
						<image src="../../static/images/detail-img.jpg"></image>
				</swiper-item>
			</swiper>
			
			<view class="p-a bg-black ml-3 o4 radius-5 wh55" :style="{top:statusBar+10+'px'}" @click="Router.back({route:{path:-1}})">
				<image src="../../static/images/detail-back.png" mode="widthFix"></image>
			</view>
			<view class="sign Mgb" v-show="type==0">省￥322/0.2kg</view>
			<view class="dots">6/1</view>
		</view>
		
		<view class="radius30-T pt-2 bg-white p-r con">
			<!-- 秒杀商品展示 -->
			<view v-show="type==0">
				<view class="p-3 bg-white flex1">
					<image src="../../static/images/store-img9.png" class="msImg"></image>
					<view class="msTime flex">
						距结束<text>02</text>天
						<text>12</text>:
						<text>12</text>:
						<text>12</text>
					</view>
				</view>
				<view class="f720"></view>
			</view>
			
			<view class="px-3 color3 font-32">
				<!-- 秒杀商品展示 -->
				<view class="flex1 py-3" v-show="type==0">
					<view class="font-34 colorR"><text class="font-50 price">126</text>/0.2kg</view>
					<view class="font-30 colorM scj">市场价561/0.2kg</view>
				</view>
				<!-- 正常商品展示 -->
				<view class="pb-3" v-show="type==1">低于市场价=<text class="price1 font-50">500-1000</text>/吨</view>
				
				<view class="pb-4 font-34">专业铝盒定制 螺旋纹原型铝罐 发的时间悬念鲸东方 97852</view>
				<!-- 秒杀商品展示 -->
				<view class="flex1 bT-e1 py-3" v-show="type==0" @click="Show('gg')">
					<view class="color8 pr-5">规格</view>
					<view class="flex-1">玫瑰金 1件</view>
					<image src="../../static/images/store-icon10.png" class="r-icon"></image>
				</view>
				
				
				<view class="flex1 bT-e1 py-3">
					<view class="color8 pr-5">地区</view>
					<view class="flex-1 flex">
						<image src="../../static/images/store-icon8.png" class="dw-icon mr-1"></image>
						<view>陕西 西安</view>
					</view>
				</view>
			</view>
		</view>
		
		<view>
			<view class="p-3 bg-f7 font-32">商品详情</view>
			<view>
				<image src="../../static/images/myPost.png" mode="widthFix"></image>
			</view>
		</view>
		
		<view style="height: 150rpx;"></view>
		<view class="p-fX bottom-0 z100 bg-white flex1 px-3 py-2 bT-f5">
		  <button class="flex4 bg-white d-inline-block">
			 <image src="../../static/images/detail-icon1.png" class="wh44" style="margin-bottom: 8rpx;"></image>
			 <view class="font-28 line-h">客服</view>
		  </button>
		  <view class="carBtn" v-show="type==0">加入购物车</view>
		  <view class="carBtn" v-show="type==0" @click="Show('gg')">立即购买</view>
		  <view class="btnAuto" v-show="type==1" @click="Show('gg')">立即购买</view>
		</view>
		 
		 
		<!-- 规格 -->
		<view class="bg-mask" v-show="gg_show">
			<view class="bg-white radius40-T px-3 p-aX bottom-0 gg">
				<view class="py-4 flex bB-f5">
					<image src="../../static/images/detail-img.jpg" class="wh190 radius30"></image>
					<view class="flex5 font-30 pl-3 py-1 ggtxt">
						<view class="font-50 price">100/0.2kg</view>
						<view class="color8">库存：230件</view>
						<view>挑选商品规格</view>
					</view>
				</view>
				<view class="py-3 bB-f5">
					<view class="font-32 color3">材质</view>
					<view class="flex flex-wrap">
						<!-- 选中的标签样式类名  tagOn -->
						<view class="tag" v-for="v in 8" :key="v">颜色</view>
					</view>
				</view>
				<view class="py-3 bB-f5">
					<view class="font-32 color3">规格</view>
					<view class="flex flex-wrap">
						<view class="tag" v-for="v in 4" :key="v">规格</view>
					</view>
				</view>
				<view class="py-4 flex1">
					<view class="font-32 color3">购买数量</view>
					<view class="count flex">
						<view class='mr-1'><image src="../../static/images/detail-icon5.png" class="jIcon1"></image></view>
						<view>1</view>
						<view class='ml-1'><image src="../../static/images/detail-icon6.png" class="jIcon2"></image></view>
					</view>
				</view>
				<view class="btnAuto btn mt-2" 
				@click="Router.navigateTo({route:{path:'/pages/orderDetail/orderDetail'}})">确定</view>
				<view class="py-3 color8 text-center">秒杀商品除非质量问题不退不换 请谨慎挑选</view>
			</view>
		</view>
		 
		 <!-- 非会员提醒弹窗 -->
		 <view class="bg-mask" v-show="vip_show">
		 	<image src="../../static/images/detail-icon2.png" class="mask1"></image>
		 	<image src="../../static/images/detail-icon3.png" class="wh60 m-a" @click="isShow"></image>
		 </view>
		 
		 <!-- 实名认证弹窗 -->
		 <view class="bg-mask" v-show="rz_show">
		 	<view class="rzh p-aXY m-a bg-white radius20 flex5 overflow-h">
		 		<view class="rzhCon font-34 color3 flex-1">
		 			<image src="../../static/images/index-icon2.png" class="rzhImg"></image>
		 			<view class="mx-4 px-3">尊敬的会员 您好！为了保障您的权益 请先完成实名认证！</view>
		 		</view>
		 		<view class="flex font-38 text-center bT-e1">
		 			<view class="color3 w-50 py-3" @click="Show('rzh')">暂不认证</view>
		 			<view class="w-50 colorf Mgb py-3" @click="Router.navigateTo({route:{path:'/pages/authentication/authentication'}})">去认证</view>
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
				vip_show:false,
				rz_show:false,
				gg_show:false,
				type:1
			}
		},
		onLoad(option){
			const self = this;
			self.type = option.id
		},
		methods: {
			Show(type){
				const self = this;
				if(type == 'rzh'){
					self.rz_show = !self.rz_show;
				}else if(type=='gg'){
					self.gg_show = !self.gg_show
				}else{
					self.vip_show = !self.vip_show
				}
			}
		}
	}
</script>
<style>page{background-color: #eee;}</style>

<style scoped>
swiper,swiper-item{height: 798rpx;}
swiper-item image{width: 100%;height: 100%;}
.back{margin: 10rpx 15rpx;}
.sign{line-height: 64rpx;border-radius: 0 32rpx 32rpx 0;position: absolute;left: 0;bottom: 74rpx;color: #fff;font-size: 34rpx;padding: 0 30rpx;}
.dots{line-height: 54rpx;border-radius: 27rpx 0 0 27rpx;position: absolute;right: 0;bottom: 74rpx;color: #fff;font-size: 28rpx;padding: 0 25rpx;background-color: rgba(0,0,0,0.4);}

.con{margin-top: -30rpx;}
.scj{line-height: 54rpx;border-radius: 27rpx;background:rgba(248,127,39,0.1);padding: 0 20rpx;}
.carBtn{background-color: #F87F27;width: 290rpx;margin: 0;}
.carBtn:nth-child(2){background-color: #307EF8;}
.btnAuto{width: 600rpx;background: #F87F27;margin: 0;}

.mask1{width: 552rpx;height: 648rpx;margin: 35% auto 10%;}
.gg{max-height: 1100rpx;overflow-y: auto;}
.ggtxt{height: 190rpx;}

.btn{width: 690rpx;}


</style>
