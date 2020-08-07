<template>
	<view>
		
		<view class="p-s top-0 bg-white z100" :style="{paddingTop:statusBar+'px'}">
			<view class="font-36 text-center h100">购物车</view>
			<view class="p-aX h100 pl-3 font-34" :style="{top:statusBar+'px'}" @click="Type">{{type?'编辑':'完成'}}</view>
		</view>
		
		<!-- 空数据展示 -->
		<!-- <view class="p-fXY bg-f7">
			<image src="../../static/images/car-icon.png" class="nullImg"></image>
			<view class="fot-34 color8 text-center pt-5">购物车暂无商品</view>
			<view class="btnB">去逛逛</view>
		</view> -->
		
		<view class="px-3">
			<view class="flex1 bB-f5">
				<!-- <image src="../../static/images/car-icon1.png" class="wh30"></image> -->
				<image src="../../static/images/car-icon3.png" class="wh30"></image>
				<view class="py-3 flex ml-3 flex-1">
					<image src="../../static/images/detail-img.jpg" class="wh190 radius30"></image>
					<view class="flex5 font-28 pl-2 py-1 flex-1 ggtxt">
						<view class="avoidOverflow2">专业铝盒定制 螺旋纹原型铝罐 发的时间悬念鲸 97852</view>
						<view class="color8">材质：铝 &nbsp;&nbsp;&nbsp; 规格：大</view>
						<view class="flex1">
							<view>￥29.9 x2</view>
							<image src="../../static/images/car-icon2.png" class="sx-icon"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		
		<view style="height: 244rpx;"></view>
		<view class="px-3 py-2 flex1 bT-e1 p-fX bg-white bottom">
			<view>
				<view class="font-34">总价: <text class="price">67.8</text></view>
				<view>预计省66元</view>
			</view>
			<view class="btnM">{{type?'去结算':'删除'}}</view>    <!-- 禁用是加类名 o4 -->
		</view>
		
		
		<!-- footer -->
		<view class="footer">
			<view class="item" @click="Router.redirectTo({route:{path:'/pages/index/index'}})">
				<image src="../../static/images/nabar1.png" mode=""></image>
				<view>商城</view>
			</view>
			<view class="item on">
				<image src="../../static/images/nabar2-a.png" mode=""></image>
				<view>购物车</view>
			</view>
			<view class="item" @click="Router.redirectTo({route:{path:'/pages/user/user'}})">
				<image src="../../static/images/nabar3.png" mode=""></image>
				<view>我的</view>
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
				type:true
			}
		},
		methods: {
			Type(){
				const self = this;
				self.type = !self.type;
			}
		}
	}
</script>


<style scoped>
.h100{line-height: 100rpx;}
.nullImg{width: 305rpx;height: 331rpx;margin: 30% auto 0;}
.btnB{width: 280rpx;margin-top: 20%;}
.btnM{width: 205rpx;line-height: 94rpx;border-radius: 47rpx;margin: 0;}

.ggtxt{height: 190rpx;}
.bottom{bottom: 110rpx;}
</style>
