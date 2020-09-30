<template>
	<view class="px-3 py-1">
		
		<view class="font-34 color3 pt-3 font-w">定位城市</view>
		<view>
			<view class="tag" @click="choose(-1)">{{current}}</view>
		</view>
		
		<view class="font-34 color3 pt-3 font-w">服务地区</view>
		<view class="flex flex-wrap">
			<view class="tag" v-for="(item,index) in addressData" :class="province==item.title?'on':''" @click="choose(index)">{{item.title}}</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				addressData:[],
				current:'',
				province:''
			}
		},
		
		onLoad(options) {
			const self = this;
			self.current = options.current;
			self.province = options.province;
			self.$Utils.loadAll(['getLabelData'], self);
		},
		
		methods: {
			
			choose(index){
				const self = this;
				uni.setStorageSync('hasChoose',true);
				if(index>=0){
					uni.setStorageSync('chooseProvince',self.addressData[index].title);
					
					uni.navigateBack({
						delta:1
					})
				}else{
					uni.setStorageSync('chooseProvince',self.current);
					uni.navigateBack({
						delta:1
					})
				}
			},
			
			getLabelData(name) {
				const self = this;
				const postData = {};
				postData.searchItem = {
					thirdapp_id: 2,
					type: 2,
				};
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.addressData = res.info.data
					}
					self.$Utils.finishFunc('getLabelData');
				};
				self.$apis.labelGet(postData, callback);
			},
			
		}
	}
</script>

<style scoped>
.tag{font-size: 30rpx;color: #999;width: 190rpx;line-height: 56rpx;border:1px solid rgba(220,220,220,1);border-radius:6px;text-align: center;margin-top: 30rpx;margin-right: 40rpx;}
.on{background:rgba(248,127,39,0.2);border-color:rgba(248,127,39,1);color: #F87F27;}
</style>
