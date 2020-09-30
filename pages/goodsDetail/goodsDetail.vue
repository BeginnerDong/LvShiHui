<template>
	<view>

		<view class="banner p-r">
			<swiper :indicator-dots="false" :autoplay="true" :interval="3000" :duration="1000" :current="currIndex" @change="changeCurrent">
				<swiper-item v-for="(item,index) in mainData.bannerImg" :key="index">
					<image :src="item.url"></image>
				</swiper-item>
			</swiper>

			<view class="p-a bg-black ml-3 o4 radius-5 wh55" :style="{top:statusBar+10+'px'}" @click="Router.back({route:{path:-1}})">
				<image src="../../static/images/detail-back.png" mode="widthFix"></image>
			</view>
			<view class="sign Mgb" v-show="type==0">省￥{{mainData.less?mainData.less:'0.00'}}/{{mainData.weight?mainData.weight:''}}</view>
			<view class="dots">{{currIndex+1}}/{{mainData.bannerImg?mainData.bannerImg.length:0}}</view>
		</view>

		<view class="radius30-T pt-2 bg-white p-r con">
			<!-- 秒杀商品展示 -->
			<view v-show="type==0">
				<view class="p-3 bg-white flex1">
					<image src="../../static/images/store-img9.png" class="msImg"></image>
					<view class="msTime flex">
						距结束<text>{{mainData.day?mainData.day:'00'}}</text>天
						<text>{{mainData.hourCount?mainData.hourCount:'00'}}</text>:
						<text>{{mainData.minCount?mainData.minCount:'00'}}</text>:
						<text>{{mainData.secCount?mainData.secCount:'00'}}</text>
					</view>
				</view>
				<view class="f720"></view>
			</view>

			<view class="px-3 color3 font-32">
				<!-- 秒杀商品展示 -->
				<view class="flex1 py-3" v-show="type==0">
					<view class="font-34 colorR"><text class="font-50 price">{{skuData.price?skuData.price:'0.00'}}</text>/{{mainData.weight?mainData.weight:''}}</view>
					<view class="font-30 colorM scj">{{skuData.o_price?skuData.o_price:'0.00'}}/{{mainData.weight?mainData.weight:''}}</view>
				</view>
				<!-- 正常商品展示 -->
				<view class="pb-3" v-show="type==1">低于市场价=<text class="price1 font-50">{{mainData.description?mainData.description:''}}</text>/吨</view>

				<view class="pb-4 font-34">{{mainData.title?mainData.title:''}}</view>
				<!-- 秒杀商品展示 -->
				<view class="flex1 bT-e1 py-3" v-show="type==0" @click="Show('gg')">
					<view class="color8 pr-5">已选</view>
					<view class="flex-1">{{skuData.title?skuData.title:''}} {{count}}件</view>
					<image src="../../static/images/store-icon10.png" class="r-icon"></image>
				</view>


				<view class="flex1 bT-e1 py-3">
					<view class="color8 pr-5">地区</view>
					<view class="flex-1 flex">
						<image src="../../static/images/store-icon8.png" class="dw-icon mr-1"></image>
						<view>{{mainData.region?mainData.region.title:''}}</view>
					</view>
				</view>
			</view>
		</view>

		<view>
			<view class="p-3 bg-f7 font-32">商品详情</view>
			<view>
				<view class="content" style="padding:0;line-height: 0;width: 100%;" v-html="mainData.content">
				</view>
			</view>
		</view>

		<view style="height: 150rpx;"></view>
		<view class="p-fX bottom-0 z100 bg-white flex1 px-3 py-2 bT-f5">
			<button class="flex4 bg-white d-inline-block" open-type="contact">
				<image src="../../static/images/detail-icon1.png" class="wh44" style="margin-bottom: 8rpx;"></image>
				<view class="font-28 line-h">客服</view>
			</button>
			<view class="carBtn" v-show="type==0" @click="addCar()">加入购物车</view>
			<view class="carBtn" v-show="type==0" @click="goBuy()">立即购买</view>
			<view class="btnAuto" v-show="type==1" @click="phoneCall">电话咨询</view>
		</view>


		<!-- 规格 -->
		<view class="bg-mask" v-show="gg_show">
			<view class="bg-white radius40-T px-3 p-aX bottom-0 gg">
				<image src="../../static/images/detail-icon4.png" class="close"  @click="Show('gg')"></image>
				<view class="py-4 flex bB-f5">
					<image :src="skuData.mainImg&&skuData.mainImg[0]?skuData.mainImg[0].url:''" class="wh190 radius30"></image>
					<view class="flex5 font-30 pl-3 py-1 ggtxt">
						<view class="font-50 price">{{skuData.price?skuData.price:'0.00'}}</text>/{{mainData.weight?mainData.weight:''}}</view>
						<view class="color8">库存：{{skuData.stock?skuData.stock:'0.00'}}件</view>
						<view>{{skuData.title?skuData.title:''}}</view>
					</view>
				</view>

				
				<view class="py-3 bB-f5" v-for="(item,index) in labelData" :key="index">
					<view class="font-32 color3">{{item.title}}</view>
					<view class="flex flex-wrap">
						<!-- 选中的标签样式类名  tagOn -->
						<view class="tag" v-for="(c_item,c_index) in item.children" :key="c_item.id"
						:class="Utils.inArray(c_item.id,choose_sku_item)==-1?'cantChoose'
						:(Utils.inArray(c_item.id,sku_item)!=-1?'tagOn':'')" :data-c_id = "c_item.id"
						:data-id = "item.id"
						@click="Utils.inArray($event.currentTarget.dataset.c_id,choose_sku_item)!=-1?
						chooseSku($event.currentTarget.dataset.id,$event.currentTarget.dataset.c_id):''">{{c_item.title}}</view>
					</view>
				</view>
				
				<view class="py-4 flex1">
					<view class="font-32 color3">购买数量</view>
					<view class="count flex">
						<view class='mr-1' @click="counter('-')">
							<image src="../../static/images/detail-icon5.png" class="jIcon1"></image>
						</view>
						<view>{{count}}</view>
						<view class='ml-1' @click="counter('+')">
							<image src="../../static/images/detail-icon6.png" class="jIcon2"></image>
						</view>
					</view>
				</view>
				<view class="btnAuto btn mt-2" @click="Show('gg')">确定</view>
				<view class="py-3 color8 text-center">秒杀商品除非质量问题不退不换 请谨慎挑选</view>
			</view>
		</view>

		<!-- 非会员提醒弹窗 -->
		<view class="bg-mask" v-show="vip_show">
			<image src="../../static/images/detail-icon2.png" class="mask1"></image>
			<image src="../../static/images/detail-icon3.png" class="wh60 m-a" @click="Show('vip')"></image>
		</view>

		<!-- 实名认证弹窗 -->
		<view class="bg-mask" v-show="rz_show">
			<view class="rzh p-aXY m-a bg-white radius20 flex5 overflow-h">
				<view class="rzhCon font-34 color3 flex-1">
					<image src="../../static/images/index-icon2.png" class="rzhImg"></image>
					<view class="mx-4 px-3">尊敬的会员 您好！为了保障您的权益 请先完成实名认证！</view>
				</view>
				<view class="flex font-38 text-center bT-e1">
					<view class="color3 w-50 py-3" @click="Show('rzh')">暂不认证</view>
					<view class="w-50 colorf Mgb py-3" @click="Router.navigateTo({route:{path:'/pages/authentication/authentication'}})">去认证</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	const app = getApp();
	import Vue from 'vue'
	export default {
		data() {
			return {
				Router: this.$Router,
				statusBar: app.globalData.statusBar,
				vip_show: false,
				rz_show: false,
				gg_show: false,
				type: 1,
				mainData: {},
				currIndex: 0,
				Utils:this.$Utils,
				labelData:[],
				skuData:[],
				
				sku_item:[],
				choose_sku_item:[],
				count:1,
				specsCurr:0,
				orderList:[],
				isLogin:getApp().globalData.isLogin
			}
		},

		onLoad(option) {
			const self = this;
			self.id = option.id;
			self.$Utils.loadAll(['getMainData'], self);

		},
		
		onShow() {
			const self = this;
			clearInterval(self.interval)
			self.orderList = [];
			uni.removeStorageSync('payPro');
			self.getUserData()
		},
		
		onUnload() {
			const self = this;
			clearInterval(self.interval)
		},

		methods: {
			
			
			getUserData() {
				const self = this;
				const postData = {};
				postData.tokenFuncName = 'getProjectToken';
				postData.noLoading = true;
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.userData = res.info.data[0];
						/* if (self.userData.headImgUrl == '') {
							self.is_show = true
						};
						if (self.userData.info.behavior == 1 && self.userData.info.idCard == '') {
							self.rz_show = true
						} */
					};
					self.$Utils.finishFunc('getUserData');
				};
				self.$apis.userGet(postData, callback);
			},
			
			goBuy(){
				const self = this;
				if(!self.isLogin){
					uni.showModal({
						content:'未登录，是否立即登录',
						success(res) {
							if(res.confirm){
								const callback = (res) => {
									self.isLogin = true
									self.$Utils.showToast('登陆成功','none')
									self.getUserData()
								};
								self.$Token.getProjectToken(callback, {
									refreshToken: true,
								})
							}
						}
					})
					return
				};
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
				uni.setStorageSync('canClick',false);
				self.orderList.push(
					{sku_id:self.skuData.id,count:self.count,
					type:1,product:self.mainData,skuIndex:self.specsCurr},
				);
				uni.setStorageSync('payPro', self.orderList);
				self.Router.navigateTo({route:{path:'/pages/orderDetail/orderDetail'}})
				uni.setStorageSync('canClick',true);
			},
			
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
				var obj = self.mainData;
				self.mainData.skuIndex = self.specsCurr;
				self.mainData.skuId = self.mainData.sku[self.specsCurr].id;
				var array = self.$Utils.getStorageArray('cartData');
				for (var i = 0; i < array.length; i++) {
					if (array[i].skuId == self.mainData.sku[self.specsCurr].id) {
						var target = array[i]
					}
				}
				console.log(target)
				if (target) {
					target.count = target.count + 1
				} else {
					console.log(111)
					var target = self.mainData;
					target.count = 1;
					target.isSelect = true;
				}
				self.$Utils.showToast('加购成功', 'none');
				self.$Utils.setStorageArray('cartData', target, 'skuId', 999);
			},
			
			counter(type) {
				const self = this;
				if (type == '+') {
					self.count++;
				} else {
					if (self.count > 1) {
						self.count--;
					}
				};
				//self.countTotalPrice();
			},
			
			chooseSku(parentid,id){
				const self = this;
			    self.skuData = {};
			    if(self.choose_sku_item.indexOf(parseInt(id))==-1){
					console.log('self.choose_sku_item',self.choose_sku_item.indexOf(id))
					console.log('self.choose_sku_item',self.choose_sku_item)
					console.log('id',id)
					console.log('parentid',parentid)
			      return;
			    };
			    self.choose_sku_item = [];
				console.log('parentid',parentid)
			    var sku = self.mainData.label[parentid];
				console.log('sku',sku)
			    for(var i=0;i<sku.children.length;i++){
			      if(self.sku_item.indexOf(sku.children[i].id)!=-1){
			        self.sku_item.splice(self.sku_item.indexOf(sku.children[i].id), 1);
			      };
			      self.choose_sku_item.push(sku.children[i].id);
			    };
			
			    
			    for (var i = 0; i < self.mainData.sku.length; i++) {
			      if(self.mainData.sku[i].sku_item.indexOf(parseInt(id))!=-1){
			        self.choose_sku_item.push.apply(self.choose_sku_item,self.mainData.sku[i].sku_item);  
			      };
			    };
			
			    for(var i=0;i<self.sku_item.length;i++){
			      if(self.choose_sku_item.indexOf(parseInt(self.sku_item[i]))==-1){
			        self.sku_item.splice(i, 1); 
			      };
			    };
			    self.sku_item.push(parseInt(id));
				console.log('self.sku_item',self.sku_item)
			    for(var i=0;i<self.mainData.sku.length;i++){ 
			      if(JSON.stringify(self.mainData.sku[i].sku_item.sort())==JSON.stringify(self.sku_item.sort())){
			        //self.id = self.mainData.sku[i].id;
			        self.skuData = self.$Utils.cloneForm(self.mainData.sku[i]);
					self.specsCurr = i
			      };   
			    }; 
			},

			phoneCall() {
				const self = this;
				uni.makePhoneCall({
					phoneNumber: self.mainData.phone
				})
			},

			changeCurrent(e) {
				console.log(e)
				const self = this;
				self.currIndex = e.detail.current
			},

			getMainData() {
				var self = this;
				var postData = {};
				postData.searchItem = {
					thirdapp_id: 2,
					id: self.id
				};
				postData.getAfter = {
					region: {
						tableName: 'Label',
						middleKey: 'region',
						key: 'id',
						searchItem: {
							status: 1
						},
						condition: '=',
						info: ['title']
					},
					sku: {
						tableName: 'Sku',
						middleKey: 'product_no',
						key: 'product_no',
						condition: '=',
						searchItem: {
							status: 1
						},
						order: {
							listorder: 'desc'
						}
					},
				};
				var callback = function(res) {
					if (res.info.data.length > 0) {
						self.mainData = res.info.data[0]
						
						if (self.mainData.seckill == 1) {
							self.type = 0;
							let time = parseInt((parseInt(self.mainData.end_time) - (new Date()).getTime()) / 1000);
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
								Vue.set(self.mainData,'day',day)
								Vue.set(self.mainData,'hourCount',hourCount)
								Vue.set(self.mainData,'minCount',minCount)
								Vue.set(self.mainData,'secCount',secCount)
								//如果当秒数小于等于0时 停止计时器 且按钮文字变成重新发送 且按钮变成可用状态 倒计时的秒数也要恢复成默认秒数 即让获取验证码的按钮恢复到初始化状态只改变按钮文字
								if (time <= 0) {
									clearInterval(self.interval)
								}
							}, 1000);
							for(var key in self.mainData.label){
							  if(self.mainData.sku_array.indexOf(parseInt(key))!=-1){
							    self.labelData.push(self.mainData.label[key])
							  };    
							};
							console.log('self.labelData',self.labelData)
							for (var i = 0; i < self.mainData.sku.length; i++) {
							  /* if(self.mainData.sku[i].id==self.id){
							    self.skuData = self.$Utils.cloneForm(self.mainData.sku[i]);
							  }; */
											
							  self.choose_sku_item.push.apply(self.choose_sku_item,self.mainData.sku[i].sku_item);
							};
							self.skuData = self.$Utils.cloneForm(self.mainData.sku[0]);
							self.sku_item = self.skuData.sku_item;
							self.mainData.less = (parseFloat(self.skuData.o_price) - parseFloat(self.skuData.price)).toFixed(2);
						}
						
					};
					self.$Utils.finishFunc('getMainData');
				};
				self.$apis.productGet(postData, callback);
			},

			Show(type) {
				const self = this;
				if (type == 'rzh') {
					self.rz_show = !self.rz_show;
				} else if (type == 'gg') {
					self.gg_show = !self.gg_show
				} else {
					self.vip_show = !self.vip_show
				}
			}
		}
	}
</script>
<style>
	page {
		background-color: #eee;
	}
</style>

<style scoped>
	swiper,
	swiper-item {
		height: 798rpx;
	}

	swiper-item image {
		width: 100%;
		height: 100%;
	}

	.back {
		margin: 10rpx 15rpx;
	}

	.sign {
		line-height: 64rpx;
		border-radius: 0 32rpx 32rpx 0;
		position: absolute;
		left: 0;
		bottom: 74rpx;
		color: #fff;
		font-size: 34rpx;
		padding: 0 30rpx;
	}

	.dots {
		line-height: 54rpx;
		border-radius: 27rpx 0 0 27rpx;
		position: absolute;
		right: 0;
		bottom: 74rpx;
		color: #fff;
		font-size: 28rpx;
		padding: 0 25rpx;
		background-color: rgba(0, 0, 0, 0.4);
	}

	.con {
		margin-top: -30rpx;
	}

	.scj {
		line-height: 54rpx;
		border-radius: 27rpx;
		background: rgba(248, 127, 39, 0.1);
		padding: 0 20rpx;
	}

	.carBtn {
		background-color: #F87F27;
		width: 290rpx;
		margin: 0;
	}

	.carBtn:nth-child(2) {
		background-color: #307EF8;
	}

	.btnAuto {
		width: 600rpx;
		background: #F87F27;
		margin: 0;
	}

	.mask1 {
		width: 552rpx;
		height: 648rpx;
		margin: 35% auto 10%;
	}

	.gg {
		max-height: 1100rpx;
		overflow-y: auto;
	}

	.ggtxt {
		height: 190rpx;
	}

	.btn {
		width: 690rpx;
	}

	.close {
		width: 42rpx;
		height: 42rpx;
		position: absolute;
		right: 30rpx;
		top: 30rpx;
	}
</style>
