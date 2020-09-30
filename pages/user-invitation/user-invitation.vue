<template>
	<view class="p-r">
		<image src="../../static/images/yq-img.jpg" mode="widthFix" class="p-aX" :style="{marginTop:statusBar+'px'}"></image>
		<view :style="{paddingTop:statusBar+'px'}" class="p-aX top-0">
			<view class="font-38 text-center colorf line-h100">邀请好友</view>
			<view class="p-3 p-a" :style="{top:statusBar+'px'}" @click="Router.back({route:{path:-1}})">
				<image src="../../static/images/back.png" class="back"></image>
			</view>
		
			<view class="color8 line-h p-r" :style="{marginTop:(467-statusBar)+'px'}">
				<image src="../../static/images/yq-img1.png" mode="widthFix"></image>
				<view class="p-aXY text-center pt-4">
					<view class="font-26 pt-4 pb-2">已邀请</view>
					<view class="font-34 color3 font-w">金牌会员 <text class="colorM">{{flowLogData.length?flowLogData.length:0}}</text> 人</view>
					<view class="btnAuto">累计收益：{{compute.tg?compute.tg:0}}元</view>
					
					<view>我的邀请码</view>
					<image :src="qrUrl" class="ewm"></image>
					<view class="font-30" @click="savePoster">保存到相册</view>
				</view>
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
				compute:{},
				qrUrl:''
			}
		},
		onLoad() {
			const self = this;
			self.paginate = self.$Utils.cloneForm(self.$AssetsConfig.paginate);
			self.$Utils.loadAll(['getFlowLogData','getQrCode'], self);
		},
		methods: {
			
			savePoster() {
				let self = this
				//若二维码未加载完毕，加个动画提高用户体验
				wx.showToast({
					icon: 'loading',
					title: '正在下载图片',
					duration: 1000
				})
				//判断用户是否授权"保存到相册"
				wx.getSetting({
					success(res) {
						//没有权限，发起授权
						if (!res.authSetting['scope.writePhotosAlbum']) {
							wx.authorize({
								scope: 'scope.writePhotosAlbum',
								success() { //用户允许授权，保存图片到相册
									self.savePhoto();
								},
								fail() { //用户点击拒绝授权，跳转到设置页，引导用户授权
									console.log('fail')
									wx.showToast({
										icon: 'none',
										title: '请至小程序设置中开启相册权限',
										duration: 1000
									})
								}
							})
						} else { //用户已授权，保存到相册
							self.savePhoto()
						}
					}
				})
			},
			
			savePhoto() {
				let self = this
				wx.saveImageToPhotosAlbum({
					filePath: self.qrUrl,
					success(res) {
						wx.showToast({
							title: '保存成功',
							icon: "success",
							duration: 1000
						})
						var myCanvas = uni.createCanvasContext('mycanvas', this);
						console.log(myCanvas.width)
						myCanvas.clearRect(0, 0, 345, 410);
						myCanvas.save()
						myCanvas.restore()
					}
				})
			},
			
			getQrCode() {
				const self = this;
				const postData = {};
				postData.tokenFuncName = 'getProjectToken'
				postData.qrInfo = {
					scene:uni.getStorageSync('user_info').info.phone,
					page: 'pages/index-vipApply/index-vipApply',
				};
				postData.output = 'url';
				postData.ext = 'png';
				const callback = (res) => {
					if (res.solely_code == 100000) {
						self.qrUrl = res.info.url
					}
					self.$Utils.finishFunc('getQrCode');
				};
				self.$apis.getQrCode(postData, callback);
			},
			
			getFlowLogData() {
				const self = this;
				const postData = {};
				postData.paginate = self.$Utils.cloneForm(self.paginate);
				postData.tokenFuncName = 'getProjectToken';
				postData.searchItem = {
					thirdapp_id:2,
					type:3,
					count:['>',0]
				};
				postData.noLoading = true;
				postData.compute = {
				  tg:[
					'sum',
					'count',
					{user_no:wx.getStorageSync('user_info').user_no,type:3,count:['>',0]}
				  ],		
				};
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.flowLogData.push.apply(self.flowLogData,res.info.data);
						self.compute = res.info.compute;
					};
					self.$Utils.finishFunc('getFlowLogData');
				};
				self.$apis.flowLogGet(postData, callback);
			},
			
		}
	}
</script>
<style>page{background-color: #FF9800;}</style>

<style scoped>
.line-h100{line-height: 100rpx;}
.ewm{width: 230rpx;height: 230rpx;margin: 30rpx auto 40rpx;}
.btnAuto{width: 360rpx;color: #F87F27;background:rgba(248,127,39,0.1);margin: 38rpx auto 99rpx;}
</style>
