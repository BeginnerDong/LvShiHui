<template>
	<view>
		
		<view class="p-r">
			<image src="../../static/images/store-img4.png" class="storeBg"></image>
			
			<view class="p-r px-3 flex3" :style="{paddingTop:statusBar+60+'px'}">
				<view class="colorG flex1 px-2 ss" @click="Router.navigateTo({route:{path:'/pages/sreach/sreach'}})">
					<image src="../../static/images/store-icon11.png" class="ss-icon"></image>
					<input type="text" value="" placeholder="搜索" placeholder-style="background:linear-gradient(0deg,rgba(253,231,185,1) 0%, rgba(230,186,111,1) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;" />
					<image src="../../static/images/store-icon13.png" class="R-icon"></image>
				</view>
				<view class="flex5 colorY">
					<image src="../../static/images/store-img7.png" class="txtImg mb-2"></image>
					<view>预计每年可省11287.5元</view>
				</view>
			</view>
		</view>
		
		<view>
			<view class="bg2 p-r">
				<image src="../../static/images/store-img2.png" class="bgImg2"></image>
				
				<view class="p-r pt-4 px-3 flex1 vipCon1">
					<view class="line-h">
						<view class="font-40 colorf">超级会员</view>
						<view class="colorZ pt-2">8大尊贵特权</view>
					</view>
					<view class="vipBtn" 
					@click="Router.navigateTo({route:{path:'/pages/index-vipApply/index-vipApply'}})">会员详情</view>
					<!-- <view class="vipBtn">我的权益</view> -->
				</view>
				
				<view class="vipCon2 radius30 mx-2 mb-3 p-r">
					<image src="../../static/images/store-img.png" class="txtImg2"></image>
					<view class="flex0 flex-wrap mt-5">
						<view class="flex4 item"
						v-for="(v,i) in equity" :key="i"
						@click="Router.navigateTo({route:{path:'/pages/index-equity/index-equity?tit='+v}})">
							<image :src="'../../static/images/store-icon'+i+'.png'" class="wh82"></image>
							<view>{{v}}</view>
						</view>
					</view>
					<view class="btnAuto">体验更多专属权益</view>
				</view>
				
				<view class="bg-f9 radius30-T overflow-h p-r">
					<view class="banner bg-white p-3 pb-0">
						<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" indicator-active-color="#F87F27" indicator-color="rgba(26,26,35,0.3)">
							<swiper-item v-for="v in 3" :key="v" @click="Router.navigateTo({route:{path:'/pages/index-equity/index-equity?tit=banner点击进入'}})">
									<image src="../../static/images/store-img10.png" ></image>
							</swiper-item>
						</swiper>
					</view>
					
					<view class="mt-2 p-3 bg-white flex1">
						<image src="../../static/images/store-img9.png" class="msImg"></image>
						<view class="msTime flex">
							距结束<text>02</text>天
							<text>12</text>:
							<text>12</text>:
							<text>12</text>
						</view>
					</view>
					
					<view class="m-3 radius30 overflow-h p-r"
					@click="Router.navigateTo({route:{path:'/pages/goodsDetail/goodsDetail?id=0'}})">
						<image src="../../static/images/store-img11.jpg" class="img"></image>
						<view class="LR-sign">省￥322/0.2kg</view>
						<view class="bg-white radius20-T line-h p-3 p-r conTxt">
							<view class="flex1 font-36 pb-1">
								<view>商家标题</view>
								<image src="../../static/images/carIcon.png" class="wh60"></image>
							</view>
							<view class="d-flex j-sb a-end">
								<view class="colorR">￥<text class="font-48">126</text>/0.2kg</view>
								<view class="color8 line-through font-34">156/KG</view>
							</view>
						</view>
					</view>
				</view>
				
				<view class="p-r">
					<image src="../../static/images/store-img3.png" class="bg3"></image>
					<view class="p-r p-3">
						<view class="flex line-h pb-2 font-38 font-w">
							<image src="../../static/images/store-icon8.png" class="dw-icon mr-1"></image>
							<view>地区 深圳</view>
						</view>
						<view class="flex pb-2 colorM" 
						@click="Router.navigateTo({route:{path:'/pages/index-address/index-address'}})">
							<view>更换当前所在位置</view>
							<image src="../../static/images/store-icon12.png" class="wh24"></image>
						</view>
					</view>
					
					<view>
						<view class="px-3 pb-3 flex1">
							<view class="font-36">热销商品</view>
							<view class="flex color9 font-30"
							@click="Router.navigateTo({route:{path:'/pages/allGoods/allGoods'}})">
								<view>查看全部</view>
								<image src="../../static/images/store-icon10.png" class="r-icon ml-1"></image>
							</view>
						</view>
						<!-- 没有数据 -->
						<!-- <view class="pt-5 bg-f9">
							<image src="../../static/images/store-img1.png" class="nullImg"></image>
							<view class="ft-34 color9 text-center pb-5">当前区域请联系客服</view>
						</view> -->
						<!-- 有数据 -->
						<view class="bg-f9 px-3 py-2 goodsBox">
							<view class="radius30 overflow-h mb-3 bg-white goods"
							@click="Router.navigateTo({route:{path:'/pages/goodsDetail/goodsDetail?id=1'}})">
								<image src="../../static/images/store-img12.jpg" mode="widthFix" class="radius30-T"></image>
								<view class="p-2">
									<view class="font-22 color2 pb-1">低于市场价<text class="font-30 colorR font-w">500-1000</text>/吨</view>
									<view class="font-26 color8 avoidOverflow2">新疆65隔热开平窗 编号00004型号CM-XJ6504-小框</view>
								</view>
							</view>
							<view class="radius30 overflow-h mb-3 bg-white goods"
							@click="Router.navigateTo({route:{path:'/pages/goodsDetail/goodsDetail?id=1'}})">
								<image src="../../static/images/store-img13.jpg" mode="widthFix" class="radius30-T"></image>
								<view class="p-2">
									<view class="font-22 color2 pb-1">低于市场价<text class="font-30 colorR font-w">500-1000</text>/吨</view>
									<view class="font-26 color8 avoidOverflow2">新疆65隔热开平窗 编号00004型号CM-XJ6504-小框</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				
			</view>
		</view>
		
		
		<!-- 优惠券弹窗 -->
		<view class="bg-mask" v-show="is_show">
			<image src="../../static/images/index-icon.png" class="mask1"></image>
			<image src="../../static/images/index-icon1.png" class="wh60 m-a" @click="isShow"></image>
		</view>
		
		<!-- 实名认证弹窗 -->
		<view class="bg-mask" v-show="rz_show">
			<view class="rzh p-aXY m-a bg-white radius20 flex5 overflow-h">
				<view class="rzhCon font-34 color3 flex-1">
					<image src="../../static/images/index-icon2.png" class="rzhImg"></image>
					<view class="mx-4 px-3 text-center">尊敬的会员 您好！为了保障您的权益 请先完成实名认证！</view>
				</view>
				<view class="flex font-38 text-center bT-e1">
					<view class="color3 w-50 py-3" @click="isShow('rzh')">暂不认证</view>
					<view class="w-50 colorf Mgb py-3" @click="Router.navigateTo({route:{path:'/pages/authentication/authentication'}})">去认证</view>
				</view>
			</view>
		</view>
		
		
		
		<view style="height: 110rpx;"></view>
		<!-- footer -->
		<view class="footer">
			<view class="item on">
				<view class="footIcon"><image src="../../static/images/nabar1-a.png" class="onFootIcon"></image></view>
				<view>商城</view>
			</view>
			<view class="item" @click="Router.redirectTo({route:{path:'/pages/car/car'}})">
				<view class="footIcon"><image src="../../static/images/nabar2.png" mode=""></image></view>
				<view>购物车</view>
			</view>
			<view class="item" @click="Router.redirectTo({route:{path:'/pages/user/user'}})">
				<view class="footIcon"><image src="../../static/images/nabar3.png" mode=""></image></view>
				<view>我的</view>
			</view>
		</view>
		
		
		
	</view>
</template>

<script>
	const app = getApp()
	export default {
		data() {
			return {
				Router:this.$Router,
				is_show: false,
				rz_show:true,
				statusBar: app.globalData.statusBar,
				equityURL:'',
				equity:['买铝返钱','铝价最低','秒杀特权','危难馈赠','会员授权','技术支持','月月有奖','货源保障']
			}
		},
		onLoad() {
			const self = this;
			// self.$Utils.loadAll(['getMainData'], self);
		},
		methods: {
			getMainData() {
				const self = this;
				
			},
			isShow(type){
				const self = this;
				if(type == 'rzh'){
					self.rz_show = !self.rz_show;
				}else{
					self.is_show = !self.is_show
				}
			}
		}
	};
</script>
<style scoped>
.storeBg{width: 100%;height: 1461rpx;position: absolute;top: 0;}
.input{color: #ECB86D;flex: 1;}
.ss{width: 290rpx;height: 62rpx;border-radius: 31rpx;border:1px solid rgba(253,231,185,1);}
.txtImg{width: 295rpx;height: 42rpx;}

.bg2{margin: 65rpx auto 0;}
.bgImg2{width: 630rpx;height: 340rpx;position: absolute;top: 0;bottom: 0;right: 0;left: 0; margin: 0 auto;}
.vipBtn{width: 166rpx;line-height: 54rpx;text-align: center;background: #BC9667;color: #FDECDB;border-radius: 27rpx;}
.vipCon1{padding-bottom: 72rpx;width: 630rpx;margin: auto;}

.vipCon2{background: #1D1E42;padding: 50rpx 34rpx;color: #C2C5D7;}
.txtImg2{width: 637rpx;height: 35rpx!important;}
.wh82{width: 82rpx;height: 82rpx;margin-bottom: 15rpx;}
.vipCon2 .item{margin-right: 60rpx;margin-bottom: 50rpx;}
.vipCon2 .item:nth-child(4n){margin-right: 0;}
.btnAuto{color:#18192A;}

swiper,swiper-item{width: 690rpx;height: 214rpx;}
swiper image{height: 164rpx;border-radius: 20rpx;}
.conTxt{margin-top: -30rpx;}
.img{height: 340rpx;}

.bg3{height: 131rpx;position: absolute;top: 0;}
.nullImg{width: 520rpx;height: 370rpx;margin: 0 auto 65rpx;}

.mask1{width: 618rpx;height: 736rpx;margin: 25% auto 15%;}

</style>
