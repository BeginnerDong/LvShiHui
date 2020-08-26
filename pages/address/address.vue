<template>
	<view>
		
		<view v-show="show==0">
			<image src="../../static/images/address.png" class="null"></image>
			<view class="color8 font-34 text-center">您还没有收货地址哦~</view>
		</view>
		
		<view v-show="show==1">
			<view>
				<view class="p-3">
					<view class="font-34 pb-3 line-h">吴彦祖 <text class="font-30 color8 pl-3">15685258458</text></view>
					<view class="font-30 color8 bB-f5 pb-3">北京市 北京市 朝阳区 花园路甲220号花园路甲25号 写字楼230室</view>
					<view class="flex1 pt-3 line-h">
						<view class="flex colorM">
							<image src="../../static/images/add2.png" class="wh30 mr-1"></image>
							<view>已设为默认</view>
						</view>
						<view class="flex color8">
							<view class="flex">
								<image src="../../static/images/add3.png" class="wh30 mr-1"></image>
								<view>编辑</view>
							</view>
							<view class="flex pl-3">
								<image src="../../static/images/add4.png" class="wh30 mr-1"></image>
								<view>删除</view>
							</view>
						</view>
					</view>
				</view>
				<view class="f720"></view>
			</view>
			<view>
				<view class="p-3">
					<view class="font-34 pb-3 line-h">吴彦祖 <text class="font-30 color8 pl-3">15685258458</text></view>
					<view class="font-30 color8 bB-f5 pb-3">北京市 北京市 朝阳区 花园路甲220号花园路甲25号 写字楼230室</view>
					<view class="flex1 pt-3 line-h">
						<view class="flex">
							<image src="../../static/images/add1.png" class="wh30 mr-1"></image>
							<view>已设为默认</view>
						</view>
						<view class="flex color8">
							<view class="flex">
								<image src="../../static/images/add3.png" class="wh30 mr-1"></image>
								<view>编辑</view>
							</view>
							<view class="flex pl-3">
								<image src="../../static/images/add4.png" class="wh30 mr-1"></image>
								<view>删除</view>
							</view>
						</view>
					</view>
				</view>
				<view class="f720"></view>
			</view>
		</view>
		
		
		<view style="height: 175rpx;"></view>
		<view class="p-fX py-4 bg-white bottom-0">
			<view class="btnM" @click="Router.navigateTo({route:{path:'/pages/addAddress/addAddress'}})">添加地址</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Router:this.$Router,
				show:0
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped>
.null{width: 473rpx;height: 336rpx;margin: 40% auto 30rpx;}
.btnM{height: 94rpx;border-radius: 47rpx;margin: 0 30rpx;line-height: 94rpx;}
</style>
