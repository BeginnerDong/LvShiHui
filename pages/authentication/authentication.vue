<template>
	<view>
		
		<view class="font-34 pl-3 line-h">
			<view class="font-30 py-3">证件类型</view>
			<view class="bB-f5 pb-4">身份证</view>
			<view class="font-30 py-3">姓名</view>
			<input type="text" value="" placeholder="请输入姓名" placeholder-style="color:#888"/>
			<view class="font-30 py-3">证件号码</view>
			<input type="text" value="" placeholder="请输入证件号码" placeholder-style="color:#888"/>
		</view>
		<view class="f720"></view>
		
		<view class="px-3 font-30 pb-4">
			<view class="py-3">上传照片<text class="color6">（小于3M的照片）</text></view>
			<view class="colorf flex1 text-center font-26 pb-4 bB-e1">
				<view class="radius20 overflow-h upload">
					<view class="p-r">
						<image src="../../static/images/rz-icon1.png" class="'uploadImg"></image>
						<image src="../../static/images/rz-icon2.png" class="wh86 p-aXY m-a"></image>
					</view>
					<view class="Mgb2">证件正面</view>
				</view>
				<view class="radius20 overflow-h upload">
					<view class="p-r">
						<image src="../../static/images/rz-icon.png" class="'uploadImg"></image>
						<image src="../../static/images/rz-icon2.png" class="wh86 p-aXY m-a"></image>
					</view>
					<view class="Mgb2">证件背面</view>
				</view>
			</view>
			
			<view class="py-3">拍摄要求</view>
			<view class="color6">大陆公民持有本人有效二代身份证；</view>
			<view class="color6">拍摄时确保身份证<text class="colorR">边框完整，字体清晰，亮度均匀；</text></view>
			<view class="flex1 py-4 font-26 color8">
				<view class="flex4">
					<image src="../../static/images/rz-icon5.png" class="zjImg"></image>
					<view>标准</view>
				</view>
				<view class="flex4">
					<image src="../../static/images/rz-icon4.png" class="zjImg"></image>
					<view>边框缺失</view>
				</view>
				<view class="flex4">
					<image src="../../static/images/rz-icon3.png" class="zjImg"></image>
					<view>字迹模糊</view>
				</view>
				<view class="flex4">
					<image src="../../static/images/rz-icon6.png" class="zjImg"></image>
					<view>闪光强烈</view>
				</view>
			</view>
			
			<view class="btnAuto o4">提交</view>     <!-- 信息填写完整按钮暗色变深，类名o4改为o10 -->
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped>
input{font-size: 34rpx;padding: 0 0 40rpx;border-bottom: 1px solid #f5f5f5;}
.upload{background-color: #FFFBF5;line-height: 50rpx;}
.uploadImg{width: 280rpx;height: 174rpx;margin: 20rpx 25rpx;}
.zjImg{width: 160rpx;height: 117rpx;margin-bottom: 10rpx;}
.btnAuto{background: #F78226;line-height: 98rpx;border-radius: 49rpx;;}
</style>
