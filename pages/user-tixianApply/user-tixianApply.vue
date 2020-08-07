<template>
	<view>
		
		<view class="bg-white px-3">
			<view class="font-30 py-3">类型</view>
			<view class="font-34 pb-4 bB-f5">推广佣金</view>
			<view class="font-30 py-3">姓名</view>
			<input type="text" value="" placeholder="请输入真实姓名" placeholder-style="color:#888"/>
			<view class="font-30 py-3">电话</view>
			<input type="text" value="" placeholder="请输入联系电话" placeholder-style="color:#888"/>
			<view class="font-30 py-3">开户行</view>
			<input type="text" value="" placeholder="请输入银行开户行" placeholder-style="color:#888"/>
			<view class="font-30 py-3">银行卡号</view>
			<input type="text" value="" placeholder="请输入银行卡号" placeholder-style="color:#888"/>
		</view>
		<view class="f720"></view>
		<view class="bg-white px-3">
			<view class="font-30 py-3">金额</view>
			<view class="font-34 pb-4 flex bB-f5">
				<input type="text" value="" placeholder="请输入提现金额" placeholder-style="color:#888" class="input"/>
				<view>人民币</view>
			</view>
			<view class="flex1 py-3">
				<!-- <view class="color8">可提现 <text class="px-1">3000</text> 元</view> -->
				<view class="color8">超出可提现 <text class="px-1 colorR">3000</text> 元</view>
				<view class="colorM">全部提现</view>
			</view>
		</view>
		
		<view class="font-30 color8 line-h px-3 py-4">
			<view>温馨提示</view>
			<view class="txt t-indent30 p-r pt-3">提现需要线下打款，请填写真实姓名以及开户行</view>
			<view class="txt t-indent30 p-r pt-3">务必确保信息准确无误</view>
			<view class="txt t-indent30 p-r pt-3">提交成功后我们将尽快为您处理，感谢您的支持！</view>
		</view>
		
		<view style="height: 190rpx;"></view>
		<view class="px-3 pb-2 p-fX bottom-0 bT-e1 bg-white z10">
			<view class="font-32 pt-3 pb-3 flex1 line-h">
				<view class="color8">到账数量</view>
				<view>￥0.00</view>
			</view>
			<view class="btnM o4" @click="Router.navigateTo({route:{path:'/pages/user-tixianApply/user-tixianApply'}})">提价申请</view>
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

<style>
page{background-color: #F7F9FB;}
</style>
<style scoped>
input{font-size: 34rpx;padding: 0 0 40rpx;border-bottom: 1px solid #f5f5f5;flex: 1;}

.input{border: none;flex: 1;padding: 0;}
.txt::before{content: '';width: 10rpx;height: 10rpx;background-color: #888;border-radius: 50%;position: absolute;left: 0;top: 70%;}
</style>
