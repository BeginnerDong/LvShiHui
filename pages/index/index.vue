<template>
	<view>
		<view class="p-r">
			<image src="../../static/images/store-img4.jpg" class="storeBg"></image>

			<view class="p-r px-3 flex3" :style="{paddingTop:statusBar+60+'px'}">
				<view class="colorG flex1 px-2 ss" @click="Router.navigateTo({route:{path:'/pages/allGoods/allGoods?type=search'}})">
					<image src="../../static/images/store-icon11.png" class="ss-icon"></image>
					<input type="text" disabled="true" placeholder="搜索" 
					placeholder-style="background:linear-gradient(0deg,rgba(253,231,185,1) 0%, rgba(230,186,111,1) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;" />
					<image src="../../static/images/store-icon13.png" class="R-icon"></image>
				</view>
				<view class="flex5 colorY">
					<image src="../../static/images/store-img7.png" class="txtImg mb-2"></image>
					<view>预计每年可省{{cardData.o_price?cardData.o_price:''}}元</view>
				</view>
			</view>
		</view>

		<view>
			<view class="bg2 p-r">
				<image src="../../static/images/store-img2.png" class="bgImg2"></image>

				<view class="p-r pt-4 px-3 flex1 vipCon1" v-if="isLogin">
					<view class="line-h">
						<view class="font-40 colorf">金牌会员</view>
						<view class="colorZ pt-2" v-if="userData.info&&userData.info.behavior==0">8大尊贵特权</view>
						<view class="colorZ pt-2" v-if="userData.info&&userData.info.behavior==1">{{less}}天后到期</view>
						
					</view>
					<view class="vipBtn" v-if="userData.info&&userData.info.behavior==0" 
					@click="Router.navigateTo({route:{path:'/pages/index-vipApply/index-vipApply'}})">会员详情</view>
					<view class="vipBtn" v-if="userData.info&&userData.info.behavior==1" 
					@click="Router.navigateTo({route:{path:'/pages/myVip/myVip'}})">我的权益</view>
					
				</view>

				<view class="vipCon2 radius30 mx-2 mb-3 p-r" v-if="userData.info&&userData.info.behavior==0">
					<image src="../../static/images/store-img.png" class="txtImg2"></image>
					<view class="flex flex-wrap mt-5">
						<view class="flex4 item" v-for="(item,index) in equityData" :key="index" :data-id="item.id" @click="Router.navigateTo({route:{path:'/pages/index-equity/index-equity?id='+$event.currentTarget.dataset.id}})">
							<image :src="item.mainImg&&item.mainImg[0]?item.mainImg[0].url:''" class="wh82"></image>
							<view>{{item.title}}</view>
						</view>
					</view>
					<view class="btnAuto" @click="Router.navigateTo({route:{path:'/pages/index-vipApply/index-vipApply'}})">体验更多专属权益</view>
				</view>

				<view class="bg-f9 radius30-T overflow-h p-r">
					<view class="banner bg-white p-3 pb-0">
						<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" indicator-active-color="#F87F27"
						 indicator-color="rgba(26,26,35,0.3)">
							<swiper-item v-for="(item,index) in sliderData" :key="index" :data-id="item.id" @click="Router.navigateTo({route:{path:'/pages/index-equity/index-equity?id='+$event.currentTarget.dataset.id}})">
								<image :src="item.mainImg&&item.mainImg[0]?item.mainImg[0].url:''"></image>
							</swiper-item>
						</swiper>
					</view>
					<view  v-if="seckillData.title">
						<view class="mt-2 p-3 bg-white flex1">
							<image src="../../static/images/store-img9.png" class="msImg"></image>
							<view class="msTime flex">
								距结束<text>{{productData.day?productData.day:'00'}}</text>天
								<text>{{productData.hourCount?productData.hourCount:'00'}}</text>:
								<text>{{productData.minCount?productData.minCount:'00'}}</text>:
								<text>{{productData.secCount?productData.secCount:'00'}}</text>
							</view>
						</view>
						
						<view class="m-3 radius30 overflow-h p-r">
							<image 
						 @click="Router.navigateTo({route:{path:'/pages/goodsDetail/goodsDetail?id='+productData.id}})" :src="productData.mainImg&&productData.mainImg[0]?productData.mainImg[0].url:''" class="img"></image>
							<view class="LR-sign">省￥{{seckillData.less}}/{{productData?productData.weight:''}}</view>
							<view class="bg-white radius20-T line-h p-3 p-r conTxt">
								<view class="flex1 font-36 pb-1">
									<view>{{productData?productData.title:''}}</view>
									<image src="../../static/images/carIcon.png" @click="addCar" class="wh60"></image>
								</view>
								<view class="d-flex j-sb a-end">
									<view class="colorR">￥<text class="font-48">{{seckillData.price?seckillData.price:''}}</text>/{{productData?productData.weight:''}}</view>
									<view class="color8 line-through font-34">{{seckillData.o_price?seckillData.o_price:''}}/{{productData?productData.weight:''}}</view>
								</view>
							</view>
						</view>
					</view>
					

					<!-- <view class="pt-5 bg-f9" v-if="!seckillData.title">
						<image src="../../static/images/store-img1.png" class="nullImg"></image>
						<view class="ft-34 color9 text-center pb-5">暂无进行中的秒杀活动</view>
					</view> -->
				</view>

				<view class="p-r" style="background: #fff;">
					<image src="../../static/images/store-img3.png" class="bg3"></image>
					<view class="p-r p-3" @click="Router.navigateTo({route:{path:'/pages/index-address/index-address?current='+currentCity+'&province='+addressData.title}})">
						<view class="flex line-h pb-2 font-38 font-w">
							<image src="../../static/images/store-icon8.png" class="dw-icon mr-1"></image>
							<view>地区 {{city}}</view>
						</view>
						<view class="flex pb-2 colorM">
							<view>更换当前所在位置</view>
							<image src="../../static/images/store-icon12.png" class="wh24"></image>
						</view>
					</view>

					<view>
						<view class="px-3 pb-3 flex1" style="background: #fff;">
							<view class="font-36">热销商品</view>
							<view class="flex color9 font-30" @click="Router.navigateTo({route:{path:'/pages/allGoods/allGoods'}})">
								<view>查看全部</view>
								<image src="../../static/images/store-icon10.png" class="r-icon ml-1"></image>
							</view>
						</view>
						<!-- 没有数据 -->
						<view class="pt-5 bg-f9" v-if="mainData.length==0">
							<image src="../../static/images/store-img1.png" class="nullImg"></image>
							<view class="ft-34 color9 text-center pb-5">当前区域请联系客服</view>
						</view>
						<!-- 有数据 -->
						<view class="bg-f9 px-3 py-2 d-flex j-sb flex-wrap">
							<view class="radius30 overflow-h mb-3 bg-white goods" v-for="(item,index) in mainData" :key="index" v-if="mainData.length>0"
							 :data-id="item.id" @click="Router.navigateTo({route:{path:'/pages/goodsDetail/goodsDetail?id='+$event.currentTarget.dataset.id}})">
								<image :src="item.mainImg&&item.mainImg[0]?item.mainImg[0].url:''"  class="radius30-T"></image>
								
								<view class="p-2">
									<view class="font-26 color2 avoidOverflow2">{{item.title}}</view>
									<view class="font-22 color8">低于市场价≈<text class="font-30 colorR font-w">{{item.description}}</text>/吨</view>
								</view>
							</view>
						</view>
					</view>
				</view>

			</view>
		</view>


		<!-- 优惠券弹窗 -->
		<button class="bg-mask" v-show="is_show" open-type="getUserInfo" @getuserinfo="submit">
			<image src="../../static/images/index-icon.png" class="mask1"></image>
			<image src="../../static/images/index-icon1.png" class="wh60 m-a" @click="isShow"></image>
		</button>

		<!-- 实名认证弹窗 -->
		<view class="bg-mask" v-show="rz_show">
			<view class="rzh p-aXY m-a bg-white radius20 flex5 overflow-h">
				<view class="rzhCon font-34 color3 flex-1">
					<image src="../../static/images/index-icon2.png" class="rzhImg"></image>
					<view class="mx-4 px-3 text-center">尊敬的会员 您好！为了保障您的权益 请先完成实名认证！</view>
				</view>
				<view class="flex font-38 text-center bT-e1">
					<view class="color3 w-50 py-3" @click="isShow('rzh')">暂不认证</view>
					<view class="w-50 colorf Mgb py-3" @click="Router.navigateTo({route:{path:'/pages/authentication/authentication'}})">去认证</view>
				</view>
			</view>
		</view>
		
		<!-- 非会员提醒弹窗 -->
		<view class="bg-mask" v-show="vip_show">
			<image src="../../static/images/detail-icon2.png" class="mask1"></image>
			<image src="../../static/images/detail-icon3.png" class="wh60 m-a" @click="Show('vip')"></image>
		</view>


		<view style="height: 110rpx;"></view>
		<!-- footer -->
		<view class="footer">
			<view class="item on">
				<view class="footIcon">
					<image src="../../static/images/nabar1-a.png" class="onFootIcon"></image>
				</view>
				<view>商城</view>
			</view>
			<view class="item" @click="Router.redirectTo({route:{path:'/pages/car/car'}})">
				<view class="footIcon">
					<image src="../../static/images/nabar2.png" mode=""></image>
				</view>
				<view>购物车</view>
			</view>
			<view class="item" @click="Router.redirectTo({route:{path:'/pages/user/user'}})">
				<view class="footIcon">
					<image src="../../static/images/nabar3.png" mode=""></image>
				</view>
				<view>我的</view>
			</view>
		</view>



	</view>
</template>

<script>
	const app = getApp()
	import Vue from 'vue'
	export default {
		data() {
			return {
				Router: this.$Router,
				is_show: false,
				rz_show: false,
				statusBar: app.globalData.statusBar,
				equityURL: '',
				equity: ['买铝返钱', '铝价最低', '秒杀特权', '危难馈赠', '会员授权', '技术支持', '月月有奖', '货源保障'],
				equityData: [],
				sliderData: [],
				cardData: {},
				city: "",
				mainData: [],
				seckillData: {},
				productData: {},
				userData:{},
				less:0,
				vip_show:false,
				currentCity:'',
				isLogin:app.globalData.isLogin,
				addressData:{}
			}
		},
		onLoad() {
			const self = this;
			
			self.paginate = self.$Utils.cloneForm(self.$AssetsConfig.paginate);
			self.$Utils.loadAll(['getEquityData', 'getSliderData', 'getCardData'], self);
			if(!uni.getStorageSync('chooseProvince')){
				self.getLocation()
			}
			console.log('isLogin',self.isLogin)
		},

		onReachBottom() {
			console.log('onReachBottom')
			const self = this;
			if (!self.isLoadAll && uni.getStorageSync('loadAllArray')) {
				self.paginate.currentPage++;
				self.getMainData()
			};
		},
		
		onShow() {
			const self = this;
			clearInterval(self.interval)
			self.getUserData();
			if(uni.getStorageSync('chooseProvince')&&uni.getStorageSync('hasChoose')){
				
				self.city = uni.getStorageSync('chooseProvince');
				self.getLabelData(uni.getStorageSync('chooseProvince'))
				uni.removeStorageSync('chooseProvince');
				uni.removeStorageSync('hasChoose');
			}
		},
		
		onUnload() {
			const self = this;
			clearInterval(self.interval)
		},
		
		onPageScroll(e) {
			console.log(e)
		},

		methods: {
			
			addCar() {
				const self = this;
				if(self.userData.info.behavior == 0){
					uni.setStorageSync('canClick',true);
					self.vip_show = true;
					return
				};
				if(self.userData.info.is_check == 0){
					uni.setStorageSync('canClick',true);
					self.rz_show = true;
					return
				};
				if(self.userData.info.is_check == 1){
					uni.setStorageSync('canClick',true);
					uni.showModal({
						content:'实名认证正在审核中...',
						showCancel:false,
					})
					return
				};
				var obj = self.seckillData;
				self.seckillData.skuIndex = 0;
				self.seckillData.skuId = self.seckillData.sku[0].id;
				var array = self.$Utils.getStorageArray('cartData');
				for (var i = 0; i < array.length; i++) {
					if (array[i].skuId == self.seckillData.sku[0].id) {
						var target = array[i]
					}
				}
				console.log(target)
				if (target) {
					target.count = target.count + 1
				} else {
					console.log(111)
					var target = self.seckillData;
					target.count = 1;
					target.isSelect = true;
				}
				self.$Utils.showToast('加购成功', 'none');
				self.$Utils.setStorageArray('cartData', target, 'skuId', 999);
			},

			getLocation() {
				const self = this;
				const callback = (res) => {
					if (res) {
						if (res.authSetting) {
							self.$Utils.showToast('请至小程序设置中打开位置权限，以便我们提供更好的服务')
							return
						};
						self.currentCity = res.address_component.city;
						self.city = res.address_component.city;
						self.province = res.address_component.province.substring(0, res.address_component.province.length - 1);
						self.getLabelData(self.province)

					}
					console.log('res', res)
					//self.$Utils.finishFunc('getLocation');
				};
				self.$Utils.getLocation('reverseGeocoder', callback);
			},

			getLabelData(name) {
				const self = this;
				const postData = {};
				postData.searchItem = {
					thirdapp_id: 2,
					type: 2,
					title: ['LIKE', ['%' + name + '%']]
				};
				postData.noLoading = true;
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.addressData = res.info.data[0]
						self.getMainData(true);
						self.getSeckillData()
					}
				};
				self.$apis.labelGet(postData, callback);
			},


			getSeckillData() {
				var self = this;
				var postData = {};
				postData.searchItem = {
					thirdapp_id: 2,
					region: self.addressData.id,
					seckill: 1,
					start_time: ['<', (new Date()).getTime()],
					end_time: ['>', (new Date()).getTime()],
					on_shelf:1
				};
				postData.getAfter = {
					sku: {
						tableName: 'Sku',
						middleKey: 'product_no',
						key: 'product_no',
						searchItem: {
							status: 1
						},
						condition: 'in'
					}
				};
				postData.noLoading = true;
				var callback = function(res) {
					if (res.info.data.length > 0) {
						self.seckillData = res.info.data[0].sku[0];
						self.productData = res.info.data[0];
						self.seckillData.less = (parseFloat(self.seckillData.o_price) - parseFloat(self.seckillData.price)).toFixed(2);
						let time = parseInt((parseInt(self.productData.end_time) - (new Date()).getTime()) / 1000);
						console.log(time)
						
						self.interval = setInterval(function() {
							time--; //每执行一次让倒计时秒数减一
							var day = Math.floor( time/ (24*3600) ); // Math.floor()向下取整 
							var hourCount = Math.floor( (time - day*24*3600) / 3600);
							var minCount = Math.floor( (time - day*24*3600 - hourCount*3600) /60 );
							var secCount = time - day*24*3600 - hourCount*3600 - minCount*60; 
							if (day >= 0 && day <= 9) {
								day = "0" + day;
							};
							if (hourCount >= 0 && hourCount <= 9) {
								hourCount = "0" + hourCount;
							}
							if (minCount >= 0 && minCount <= 9) {
								minCount = "0" + minCount;
							}
							if (secCount >= 0 && secCount <= 9) {
								secCount = "0" + secCount;
							}
							Vue.set(self.productData,'day',day)
							Vue.set(self.productData,'hourCount',hourCount)
							Vue.set(self.productData,'minCount',minCount)
							Vue.set(self.productData,'secCount',secCount)
							//如果当秒数小于等于0时 停止计时器 且按钮文字变成重新发送 且按钮变成可用状态 倒计时的秒数也要恢复成默认秒数 即让获取验证码的按钮恢复到初始化状态只改变按钮文字
							if (time <= 0) {
								clearInterval(self.interval)
							}
						}, 1000);
					};
				};
				self.$apis.productGet(postData, callback);
			},

			getMainData(isNew) {
				var self = this;
				console.log(123456)
				if (isNew) {
					self.mainData = [];
					self.paginate = {
						count: 0,
						currentPage: 1,
						pagesize: 10,
						is_page: true,
					}
				};
				var postData = {};
				postData.paginate = self.$Utils.cloneForm(self.paginate);
				postData.noLoading = true;
				postData.searchItem = {
					thirdapp_id: 2,
					type: 1,
					region: self.addressData.id,
					seckill: 0,
					on_shelf:1
				};
				postData.order = {
					listorder: 'desc'
				};
				var callback = function(res) {
					if (res.info.data.length > 0) {
						self.mainData.push.apply(self.mainData, res.info.data);
					};
				};
				self.$apis.productGet(postData, callback);
			},
			
			submit() {
				const self = this;
				const callback = (user, res) => {
					console.log(user)
					self.getUserData(user);
				};
				self.$Utils.getAuthSetting(callback);
			},

			getUserData(user) {
				const self = this;
				const postData = {};
				postData.tokenFuncName = 'getProjectToken';
				postData.noLoading = true;
				if(user&&user.nickName){
					postData.refreshToken = true;
				};
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.userData = res.info.data[0];
						if (self.userData.headImgUrl == '') {
							self.is_show = true
						}else{
							self.is_show = false
						}
						/* if (self.userData.info.behavior == 1 && self.userData.info.idCard == '') {
							self.rz_show = true
						} */
						if(self.userData.info.behavior == 1){
							self.less = parseInt((self.userData.info.deadline - (new Date()).getTime()/1000)/86400)
						}
					};
				};
				self.$apis.userGet(postData, callback);
			},

			getCardData() {
				const self = this;
				const postData = {};
				postData.searchItem = {
					thirdapp_id: 2,
					type: 2
				};
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.cardData = res.info.data[0]
					}
					self.$Utils.finishFunc('getCardData');
				};
				self.$apis.productGet(postData, callback);
			},

			getSliderData() {
				const self = this;
				const postData = {};
				postData.searchItem = {
					thirdapp_id: 2,
					menu_id: 3
				};
				postData.order = {
					listorder: 'desc'
				};
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.sliderData = res.info.data
					}
					self.$Utils.finishFunc('getSliderData');
				};
				self.$apis.articleGet(postData, callback);
			},

			getEquityData() {
				const self = this;
				const postData = {};
				postData.searchItem = {
					thirdapp_id: 2,
					menu_id: 1
				};
				postData.paginate = {
					count: 0,
					currentPage: 1,
					pagesize: 8,
					is_page: true,
				};
				postData.order = {
					listorder: 'desc'
				};
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.equityData = res.info.data
					}
					self.$Utils.finishFunc('getEquityData');
				};
				self.$apis.articleGet(postData, callback);
			},



			isShow(type) {
				const self = this;
				if (type == 'rzh') {
					self.rz_show = !self.rz_show;
				} else {
					self.is_show = !self.is_show
				}
			}
		}
	};
</script>
<style scoped>
	.storeBg {
		width: 100%;
		height: 1461rpx;
		position: absolute;
		top: 0;
	}

	.input {
		color: #ECB86D;
		flex: 1;
	}

	.ss {
		width: 290rpx;
		height: 62rpx;
		border-radius: 31rpx;
		border: 1px solid rgba(253, 231, 185, 1);
	}

	.txtImg {
		width: 295rpx;
		height: 42rpx;
	}

	.bg2 {
		margin: 65rpx auto 0;
	}

	.bgImg2 {
		width: 630rpx;
		height: 340rpx;
		position: absolute;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		margin: 0 auto;
	}

	.vipBtn {
		width: 166rpx;
		line-height: 54rpx;
		text-align: center;
		background: #BC9667;
		color: #FDECDB;
		border-radius: 27rpx;
	}

	.vipCon1 {
		padding-bottom: 72rpx;
		width: 630rpx;
		margin: auto;
	}

	.vipCon2 {
		background: #1D1E42;
		padding: 50rpx 34rpx;
		color: #C2C5D7;
	}

	.txtImg2 {
		width: 637rpx;
		height: 35rpx !important;
	}

	.wh82 {
		width: 82rpx;
		height: 82rpx;
		margin-bottom: 15rpx;
	}

	.vipCon2 .item {
		margin-right: 60rpx;
		margin-bottom: 50rpx;
	}

	.vipCon2 .item:nth-child(4n) {
		margin-right: 0;
	}

	.btnAuto {
		color: #18192A;
	}

	swiper,
	swiper-item {
		width: 690rpx;
		height: 214rpx;
	}

	swiper image {
		height: 164rpx;
		border-radius: 20rpx;
	}

	.conTxt {
		margin-top: -30rpx;
	}

	.img {
		height: 340rpx;
	}

	.bg3 {
		height: 131rpx;
		position: absolute;
		top: 0;
	}

	.nullImg {
		width: 520rpx;
		height: 370rpx;
		margin: 0 auto 65rpx;
	}

	.mask1 {
		width: 618rpx;
		height: 736rpx;
		margin: 25% auto 15%;
	}
</style>
