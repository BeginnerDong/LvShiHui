<template>
	<view>
		
		<view class="list bT-f5 bB-f5">
			<view class="li" :class="liCurr==0?'on':''" @click="changeLi(0)">未使用</view>
			<view class="li" :class="liCurr==1?'on':''" @click="changeLi(1)">已使用</view>
			<view class="li" :class="liCurr==2?'on':''" @click="changeLi(2)">已失效</view>
		</view>
		
		<!-- 空数据 -->
		<view v-if="mainData.length==0">
			<image src="../../static/images/coupon1.png" class="nullCoupon"></image>
			<view class="font-34 color8 text-center">暂无优惠券</view>
		</view>
		
		<!-- 有数据 -->
		<view class="px-2 pt-2" v-if="mainData.length>0&&userInfoData.behavior==0" v-for="(item,index) in mainData" :key="index">
			<view class="p-r">
				<image src="../../static/images/coupon.png" mode="widthFix"></image>
				<view class="flex1 p-aXY coupon">
					<view class="price1">{{item.value}}</view>
					<view>
						<view class="font-34">满{{item.condition}}吨可用</view>
						<view class="font-24 color8">有效期 {{Utils.timeto(item.valid_time,'ymd')}}</view>
					</view>
					<view class="btnM" @click="showModal">去使用</view>
				</view>
			</view>
		</view>
		
		<view class="px-2 pt-2" v-if="mainData.length>0&&userInfoData.behavior==1" v-for="(item,index) in mainData" :key="index">
			<view class="p-r">
				<image src="../../static/images/coupon.png" mode="widthFix"></image>
				<view class="flex1 p-aXY coupon">
					<view class="price1">{{item.value}}</view>
					<view>
						<view class="font-34">满{{item.condition}}吨可用</view>
						<view class="font-24 color8">有效期 {{Utils.timeto(item.deadline,'ymd')}}</view>
					</view>
					<view class="btnM" @click="Router.redirectTo({route:{path:'/pages/index/index'}})">去使用</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				liCurr:0,
				mainData:[],
				searchItem:{
					thirdapp_id: 2,
					use_step:1,
				},
				userInfoData:{},
				Utils:this.$Utils,
				Router:this.$Router
			}
		},
		onLoad() {
			const self = this;
			self.getUserInfoData()
		},
		methods: {
			showModal(){
				const self = this;
				uni.showModal({
					content:'成为会员可使用',
					confirmText:'申请会员',
					success(res) {
						if(res.confirm){
							self.Router.navigateTo({route:{path:'/pages/index-vipApply/index-vipApply'}})
						}
					}
				})
			},
			
			changeLi(i){
				const self = this;
				if(self.userInfoData.behavior==0){
					if(i==1||i==2){
						self.mainData = []
					}else{
						self.getCouponData()
					}
				}else{
					if(i!=self.liCurr){
						self.liCurr = i;
						if(self.liCurr==0){
							self.searchItem.use_step = 1
						}else if(self.liCurr==1){
							self.searchItem.use_step = 2
						}else{
							self.searchItem.use_step = -1
						}
						self.mainData = [];
						self.getUserCouponData()
					}
				}
				
			},
			
			getUserInfoData() {
				const self = this;
				const postData = {};
				postData.tokenFuncName = 'getProjectToken';
				postData.noLoading = true;
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.userInfoData = res.info.data[0];
						if(self.userInfoData.behavior == 1){
							self.getUserCouponData()
						}else{
							self.getCouponData()
						}
						
					};
				};
				self.$apis.userInfoGet(postData, callback);
			},
			
			getCouponData() {
				const self = this;
				const postData = {};
				postData.searchItem = {
					thirdapp_id: 2,
				};
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.mainData = res.info.data
						for (var i = 0; i < self.mainData.length; i++) {
							self.mainData[i].valid_time = self.mainData[i].valid_time + (new Date()).getTime()
						}
					}
					console.log('self.mainData', self.mainData)
				};
				self.$apis.couponGet(postData, callback);
			},	
			
			getUserCouponData() {
				const self = this;
				const postData = {};
				postData.tokenFuncName = 'getProjectToken';
				postData.searchItem = self.$Utils.cloneForm(self.searchItem)
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.mainData = res.info.data
					}
				};
				self.$apis.userCouponGet(postData, callback);
			},
		}
	}
</script>

<style scoped>
.li{width: 33.33%;}
.price1{font-size: 74rpx;font-weight: bold;color: #F87F27;}
.price1::before{font-size: 34rpx;}
.btnM{line-height: 60rpx;border-radius: 10rpx;width: 140rpx;margin: 0;}
.coupon{padding: 0 65rpx;}

.nullCoupon{width: 506rpx;height: 386rpx;margin: 280rpx auto 70rpx;}
</style>
