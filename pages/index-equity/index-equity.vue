<template>
	<view class="p-r">
		
		<view>
			<view class="content" style="padding:0;line-height: 0;width: 100%;" v-html="mainData.content">
			</view>
		</view>
		
		<view class="p-aXY">
			<view class="p-aX colorf font-38 text-center head" :style="{paddingTop:statusBar+'px'}">
				<view class="p-3 p-a left-0" @click="Router.back({route:{path:-1}})">
					<image src="../../static/images/back.png" class="back"></image>
				</view>
				<view>{{title}}</view>
			</view>
			
			<view class="p-fX bottom-0">
				<view class="btnAuto" v-if="mainData.menu_id==1" @click="Router.redirectTo({route:{path:'/pages/index-vipApply/index-vipApply'}})">加入会员</view>
				<view class="btnAuto" v-if="mainData.menu_id==3" @click="phoneCall()">了解更多</view>
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
				title:'',
				statusBar: app.globalData.statusBar,
				mainData:{}
			}
		},
		
		onLoad(options) {
			const self = this;
			self.id = options.id;
			self.$Utils.loadAll(['getMainData','getPhoneData'], self);
		},
		
		methods: {
			
			getPhoneData() {
				const self = this;
				const postData = {};
				postData.searchItem = {
					thirdapp_id: 2,
					menu_id: 4
				};
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.phoneData = res.info.data[0]
					}
					self.$Utils.finishFunc('getPhoneData');
				};
				self.$apis.articleGet(postData, callback);
			},
			
			phoneCall(){
				const self = this;
				uni.makePhoneCall({
					phoneNumber:self.phoneData.phone
				})
			},
			
			
			getMainData() {
				const self = this;
				const postData = {};
				postData.searchItem = {
					thirdapp_id: 2,
					id:self.id
				};
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.mainData = res.info.data[0];
						self.title = self.mainData.title;
						const regex = new RegExp('<img', 'gi');
						self.mainData.content = self.mainData.content.replace(regex, `<img style="width: 750rpx;"`);
						console.log('self.mainData.content',self.mainData.content)
					}
					self.$Utils.finishFunc('getMainData');
				};
				self.$apis.articleGet(postData, callback);
			},
			
		}
	}
</script>

<style>
page{background: #232E63;}
</style>

<style>
.head{line-height: 100rpx;top: 0;left: 0;right: 0; z-index: 100;}
.btnAuto{width: 670rpx;line-height: 94rpx;border-radius: 47rpx;margin-bottom: 50rpx;background:linear-gradient(180deg,rgba(255,219,79,1) 0%,rgba(232,169,12,1) 97%);}
</style>
