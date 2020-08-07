<template>
	<view>
		
		<view class="p-s top-0 z10 top">
			
			<view class="flex1 p-3 bg-white">
				<view class="ss px-2 flex">
					<image src="../../static/images/sreach-icon.png" class="ss-icon"></image>
					<input type="text" value="" placeholder="输入关键字" placeholder-class="input" />
				</view>
				<view class="font-34 color8">搜索</view>
			</view>
			
			<view class="nav flex color8 font-30 bT-f5 bg-white">
				<view class="li flex0" @click="change('nav',1)" :class="liCurr==1?'colorM':''">
					<view>新疆</view>
					<image src="../../static/images/all-icon2.png" class="sj-icon ml-1" v-if="liCurr==1"></image>
					<image src="../../static/images/sreach-icon1.png" class="sj-icon ml-1" v-else></image>
				</view>
				<view class="li flex0" @click="change('nav',2)" :class="liCurr==2?'colorM':''">
					<view>甘肃</view>
					<image src="../../static/images/all-icon2.png" class="sj-icon ml-1" v-if="liCurr==2"></image>
					<image src="../../static/images/sreach-icon1.png" class="sj-icon ml-1" v-else></image>
				</view>
				<view class="li flex0" @click="change('nav',3)" :class="liCurr==3?'colorM':''">
					<view>陕西</view>
					<image src="../../static/images/all-icon2.png" class="sj-icon ml-1" v-if="liCurr==3"></image>
					<image src="../../static/images/sreach-icon1.png" class="sj-icon ml-1" v-else></image>
				</view>
				<view class="li flex0" @click="change('nav',4)" :class="liCurr==4?'colorM':''">
					<view>幕墙</view>
				</view>
				<view class="li flex0" @click="change('nav',5)" :class="liCurr==5?'colorM':''">
					<view>辅料</view>
					<image src="../../static/images/all-icon2.png" class="sj-icon ml-1" v-if="liCurr==5"></image>
					<image src="../../static/images/sreach-icon1.png" class="sj-icon ml-1" v-else></image>
				</view>
			</view>
			
		</view>
		
		<!-- 下拉选择 -->
		<view class="bg-mask d-flex flex-column" v-show="is_show">
			<view class="bg-white px-3 font-34 color8 bT-f5">
				<view class="py-3 flex1 bB-e1" v-for="(v,i) in 5" :key="i" :class="conCurr==i?'colorM':''" @click="change('con',i)">
					<view>不限</view>
					<image src="../../static/images/all-icon1.png" class="wh32" v-if="conCurr==i"></image>
					<image src="../../static/images/all-icon.png" class="wh32" v-else></image>
				</view>
				
				<view class="flex1 py-2">
					<view class='btnAuto' @click="close()">重置</view>
					<view class='btnAuto' @click="close()">确定</view>
				</view>
			</view>
			<view class="flex-1" @click="close()"></view>
		</view>
		
		
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
</template>

<script>
	export default {
		data() {
			return {
				Router:this.$Router,
				liCurr:0,
				conCurr:0,
				is_show:false
			}
		},
		methods: {
			change(type,i){
				const self = this;
				if(self.liCurr != i){
					self.is_show = true
					if(type == 'nav'){
						self.liCurr = i;
						self.conCurr = 0
					}else{
						self.conCurr = i
					}
				}else{
					self.liCurr = 0;
					if(type == 'con'){
						self.conCurr = i
					}else{
						self.is_show = !self.is_show
					}
				}
			},
			close(){
				const self = this;
				self.is_show = false
				self.liCurr = 0;
			}
		}
	}
</script>
<style>
page{background-color: #F9F9FB;}
</style>
<style scoped>
.ss-icon{width: 28rpx;height: 26rpx;}
.ss{background-color: #FEF9F6;height: 66rpx;width: 588rpx;border-radius: 33rpx;box-sizing: border-box;}
input{font-size: 30rpx;}
.input{font-size: 30rpx;color: #888;}

.li{width: 20%;line-height: 88rpx;}

.bg-mask{margin-top: 214rpx;}
.btnAuto{width: 314rpx;background: none;border: 1px solid #F87F27;color: #F87F27;margin: 0;}
.btnAuto:nth-child(2){background: #F87F27;color: #fff;}
</style>
