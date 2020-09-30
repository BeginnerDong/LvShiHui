<template>
	<view class="h-100">
		<view class="h-100">
			<view style="width: 100%;">
				<image mode="widthFix" style="width: 100%;" v-for="(item,index) in mainData.mainImg" :key="index" :src="item.url"></image>
			</view>
			
			<view class="p-fX bottom-0">
				<view class="btnAuto" @click="phoneCall()">了解更多</view>
				<!-- <view class="btnAuto">了解更多</view> -->
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mainData:[]
			}
		},
		onLoad() {
			const self = this;
			self.$Utils.loadAll(['getMainData'], self);
		},
		methods: {
			getMainData() {
				const self = this;
				const postData = {};
				postData.searchItem = {
					thirdapp_id: 2,
					menu_id: 4
				};
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.mainData = res.info.data[0]
					}
					self.$Utils.finishFunc('getMainData');
				};
				self.$apis.articleGet(postData, callback);
			},
			
			phoneCall(){
				const self = this;
				uni.makePhoneCall({
					phoneNumber:self.mainData.phone
				})
			},
		}
	}
</script>
<style>page{background: #213062;height: 100%;}</style>

<style scoped>
.txt{width:533rpx;height: 400rpx;
font-size:130rpx;
text-align: center;
font-weight:bold;
font-style:italic;
color:rgba(51,51,51,1);
line-height:177rpx;
margin: 40% auto 40%;
background:linear-gradient(0deg,rgba(254,240,187,1) 0%, rgba(254,254,253,1) 100%);
-webkit-background-clip:text;
-webkit-text-fill-color:transparent;}
.btnAuto{width: 670rpx;line-height: 94rpx;border-radius: 47rpx;margin-bottom: 50rpx;background:linear-gradient(180deg,rgba(255,219,79,1) 0%,rgba(232,169,12,1) 97%);}
</style>
