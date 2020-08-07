<template>
	<view>
		
		<view class="bg-f7 bg-white font-32">
			<!-- 未添加地址 -->
			<!-- <view class="mx-3 p-3 bg-f7 flex1 radius20"
			@click="Router.navigateTo({route:{path:'/pages/addAddress/addAddress'}})">
				<image src="../../static/images/store-icon8.png" class="dw-icon mr-1"></image>
				<view class="pl-2">添加收获地址</view>
				<image src="../../static/images/store-icon10.png" class="r-icon"></image>
			</view> -->
			<!-- 已添加地址 -->
			<view>
				<view class="f720"></view>
				<view class="px-3 py-4 bg-white flex1"
				@click="Router.navigateTo({route:{path:'/pages/addAddress/addAddress'}})">
					<image src="../../static/images/order-icon2.png" class="dw-icon1 mr-3"></image>
					<view class="dzTxt pl-3 p-r flex-1">
						<view>马云 <text class="color8">18547298634</text></view>
						<view class="dz avoidOverflow2">陕西省 西安市 高新区 阿里巴巴科技股份集团有限公司1号楼</view>
					</view>
					<image src="../../static/images/store-icon10.png" class="r-icon"></image>
				</view>
				<view class="f720"></view>
			</view>
			
			<view class="flex1 pt-4 pb-3 bB-e1 mx-3">
				<view class="flex">
					<image src="../../static/images/order-icon1.png" class="dp-icon mr-1"></image>
					<view>超级会员秒杀商品</view>
				</view>
				<view class="flex">
					<image src="../../static/images/order-icon.png" class="wh30"></image>
					<view class="px-1">联系客服</view>
					<image src="../../static/images/store-icon10.png" class="r-icon"></image>
				</view>
			</view>
			
			<view class="py-3 flex mx-3">
				<image src="../../static/images/detail-img.jpg" class="wh190 radius30"></image>
				<view class="flex5 font-28 pl-3 py-1 flex-1 ggtxt">
					<view class="avoidOverflow2">专业铝盒定制 螺旋纹原型铝罐 发的时间悬念鲸 97852</view>
					<view class="color8">材质：铝 &nbsp;&nbsp;&nbsp; 规格：大</view>
					<view>￥29.9 x2</view>
				</view>
			</view>
			<view class="f720"></view>
			
			<view class="color8">
				<view class="flex1 py-4 bB-e1 mx-3">
					<view>购买数量</view>
					<view class="count flex">
						<view class='mr-1'><image src="../../static/images/detail-icon5.png" class="jIcon1"></image></view>
						<view>1</view>
						<view class='ml-1'><image src="../../static/images/detail-icon6.png" class="jIcon2"></image></view>
					</view>
				</view>
				
				<view class="flex1 py-4 bB-e1 mx-3">
					<view>购买数量</view>
					<view class="color3">快递 货到付款</view>
				</view>
				<view class="flex1 py-4 bB-e1 mx-3">
					<view>订单备注</view>
					<input type="text" value="" placeholder="点击输入(选填)" placeholder-style="font-size:32rpx;color:#888" />
				</view>
				<view class="p-3 text-right">共<text class="color3">2</text>件，小计：<text class="price">67.8</text></view>
				<view class="f720"></view>
				
				<view class="flex1 p-3 bg-white">
					<view class="flex">
						<image src="../../static/images/vip-icon.png" class="wx-icon mr-1"></image>
						<view>微信支付</view>
					</view>
					<image src="../../static/images/vip-icon1.png" class="wh30"></image>
				</view>
				
			</view>
			
		</view>
		
		<view style="height: 150rpx;"></view>
		<view class="p-fX bottom-0 z100 bg-white flex1 px-3 py-2 bT-f5 font-34">
			<view class="text-right color8">共<text class="color3">2</text>件，小计：<text class="price">67.8</text></view>
			<view class="btnAuto">立即购买</view>
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
<style>page{background-color: #F7F9FB;}</style>
<style scoped>
.ggtxt{height: 190rpx;}
.dz{width: 506rpx;}
.dzTxt::before{content: '';height: 66rpx;width: 1rpx;background-color: #e1e1e1;position: absolute;left: 0;top: 50%;margin-top: -33rpx;}
input{flex: 1;text-align: right;padding-left: 30rpx;}
.btnAuto{width: 325rpx;background: #F78226;margin: 0;}
</style>
