<template>
	<view>
		<view class="p-s top-0 z10 top">
			
			<view class="flex1 p-3 bg-white" v-if="type&&type=='search'">
				<view class="ss px-2 flex">
					<image src="../../static/images/sreach-icon.png" class="ss-icon"></image>
					<input type="text" v-model="keywords" focus="true" placeholder="输入关键字" placeholder-class="input" />
				</view>
				<view class="font-34 color8" @click="search">搜索</view>
			</view>
			
			<view class="nav flexX color8 font-30 bT-f5 bg-white z10" v-if="!type||(type=='search'&&mainData.length>0)">
				<view class="li flex0 flex-shrink" v-for="(item,index) in labelData" :key="index" @click="changeNav(index)" :class="navIndex==index||temNavIndex==index?'colorM':''">
					<view>{{item.title}}</view>
					
					<image src="../../static/images/all-icon2.png" class="sj-icon ml-1" v-if="(navIndex==index||temNavIndex==index)&&item.title!='幕墙'"></image>
					<image src="../../static/images/sreach-icon1.png" class="sj-icon ml-1" v-if="navIndex!=index&&item.title!='幕墙'"></image>
				</view>
			</view>
			
		</view>
		
		<!-- 下拉选择 -->
		<view class="bg-mask d-flex flex-column" v-show="is_show">
			<view class="bg-white px-3 font-34 color8 bT-f5">
				<!-- <view class="py-3 flex1 bB-e1" v-if="labelData[navIndex]" v-for="(item,index) in labelData[navIndex].child" :key="index"
				:class="Utils.inArray(item.id,chooseCategory)!=-1?'colorM':''" @click="changeCategory(index)">
					<view>{{item.title}}</view>
					<image src="../../static/images/all-icon1.png" class="wh32" v-if="Utils.inArray(item.id,chooseCategory)!=-1"></image>
					<image src="../../static/images/all-icon.png" class="wh32" v-else></image>
				</view> -->
				<view class="py-3 flex1 bB-e1" v-if="labelData&&labelData[navIndex]&&labelData[navIndex].child" v-for="(item,index) in childLabel" :key="index" 
				:class="Utils.inArray(item.id,chooseCategory)!=-1?'colorM':''" @click="changeCategory(index)">
					<view>{{item.title}}</view>
					<image src="../../static/images/all-icon1.png" class="wh32" v-if="Utils.inArray(item.id,chooseCategory)!=-1"></image>
					<image src="../../static/images/all-icon.png" class="wh32" v-else></image>
				</view>
				
				<view class="flex1 py-2">
					<view class='btnAuto' @click="reset()">重置</view>
					<view class='btnAuto' @click="confirm()">确定</view>
				</view>
			</view>
			<view class="flex-1" @click="close()"></view>
		</view>
		
		
		<view class="bg-f9 px-3 py-2 d-flex j-sb flex-wrap">
			<view class="radius30 overflow-h mb-3 bg-white goods" v-for="(item,index) in mainData" 
			:key="index" v-if="mainData.length>0"
			 :data-id="item.id" 
			 @click="tz($event.currentTarget.dataset.id)"
			 >
				<image :src="item.mainImg&&item.mainImg[0]?item.mainImg[0].url:''"  class="radius30-T"></image>
				<view class="p-2">
					<view class="font-26 color2 avoidOverflow2">{{item.title}}</view>
					<view class="font-22 color8">低于市场价≈<text class="font-30 colorR font-w">{{item.description}}</text>/吨</view>
				</view>
			</view>
			<view class="pt-5 bg-f9" v-if="mainData.length==0&&type&&type=='search'">
				<image src="../../static/images/store-img1.png" class="nullImg"></image>
				<!-- <view class="ft-34 color9 text-center pb-5">暂无商品</view> -->
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Router:this.$Router,
				liCurr:0,
				conCurr:0,
				is_show:false,
				labelData:[],
				navIndex:-1,
				mainData:[],
				searchItem:{
					thirdapp_id: 2,
					type: 1,
					seckill: 0,
					on_shelf:1
				},
				chooseCategory:[],
				Utils:this.$Utils,
				temNavIndex:-1,
				childLabel:[],
				type:'',
				keywords:''
			}
		},
		onLoad(options) {
			const self = this;
				self.paginate = self.$Utils.cloneForm(self.$AssetsConfig.paginate);
			if(options.type){
				self.type = options.type;
				uni.setNavigationBarTitle({
					title:'搜索商品'
				})
			}else{
				self.getMainData()
			}
		
			self.$Utils.loadAll(['getLabelData'], self);
		},
		
		onReachBottom() {
			console.log('onReachBottom')
			const self = this;
			if (!self.isLoadAll && uni.getStorageSync('loadAllArray')) {
				self.paginate.currentPage++;
				self.getMainData()
			};
		},
		
		methods: {
			
			search(){
				const self = this;
				delete self.searchItem.category_id;
				if(self.keywords==''){
					self.$Utils.showToast('请输入关键词搜索','none')
				}else{
					self.searchItem.title = ['LIKE',['%'+self.keywords+'%']]
					self.getMainData(true)
				}
			},
			
			tz(id){
				const self = this;
				self.Router.navigateTo({route:{path:'/pages/goodsDetail/goodsDetail?id='+id}})
			},
			
			reset(index){
				const self = this;
				
				self.chooseCategory = []
			},
			
			confirm(){
				const self = this;
				if(self.chooseCategory.length>0){
					self.is_show = false
					self.searchItem.category_id = ['in',self.chooseCategory];
					self.getMainData(true)
				}else{
					self.is_show = false
				};
				self.temNavIndex = -1
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
				postData.searchItem = self.$Utils.cloneForm(self.searchItem)
					
				postData.order = {
					listorder: 'desc'
				};
				var callback = function(res) {
					if (res.info.data.length > 0) {
						self.mainData.push.apply(self.mainData, res.info.data);
					}else{
						if(self.type=='search'){
							self.$Utils.showToast('未搜索到相关产品','none')
						}
					}
					//self.$Utils.finishFunc('getMainData');
				};
				self.$apis.productGet(postData, callback);
			},
			
			changeNav(index){
				const self = this;
				if(self.navIndex!=index){
					self.navIndex = index;
					self.chooseCategory = [];
					self.childLabel = self.labelData[self.navIndex].child;
					if(self.labelData[index].title!='幕墙'){
						//self.temNavIndex = index
						self.is_show = true
					}else{
						self.searchItem.category_id = self.labelData[index].id
						self.getMainData(true)
					}
				}else{
					if(self.labelData[index].title!='幕墙'){
						//self.temNavIndex = index
						self.is_show = true
					}
				}	
			},
			
			changeCategory(index){
				const self = this;
				console.log(index);
				var options = self.chooseCategory.indexOf(self.labelData[self.navIndex].child[index].id);
				console.log(options);
				if(options>-1){
					self.chooseCategory.splice(options,1)
				}else{
					self.chooseCategory.push(self.labelData[self.navIndex].child[index].id)
				}
				console.log(self.chooseCategory);
			},
			
			getLabelData() {
				const self = this;
				const postData = {};
				postData.searchItem = {
					thirdapp_id: 2,
				};
				postData.getBefore = {
					parent:{
						tableName:'Label',
						middleKey:'parentid',
						key:'id',
						searchItem:{title:['in',['类别']]},
						condition:'in'
					}
				};
				postData.getAfter = {
					child:{
						tableName:'Label',
						middleKey:'id',
						key:'parentid',
						searchItem:{status:1},
						condition:'=',
						order:{
							listorder:'desc'
						}
					}
				};
				postData.order = {
					listorder:'desc'
				};
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.labelData = res.info.data
					}
					self.$Utils.finishFunc('getLabelData');
				};
				self.$apis.labelGet(postData, callback);
			},
			
			
			
			
			close(){
				const self = this;
				self.is_show = false
			}
		}
	}
</script>
<style>
page{background-color: #F9F9FB;}
</style>
<style scoped>
.nav{position: sticky;top: 0;}
.li{padding: 0 30rpx;line-height: 88rpx;}
.bg-mask{margin-top: 88rpx;}
.btnAuto{width: 314rpx;background: none;border: 1px solid #F87F27;color: #F87F27;margin: 0;}
.btnAuto:nth-child(2){background: #F87F27;color: #fff;}
.ss-icon{width: 28rpx;height: 26rpx;}
.ss{background-color: #FEF9F6;height: 66rpx;width: 588rpx;border-radius: 33rpx;box-sizing: border-box;}
input{font-size: 30rpx;}
.input{font-size: 30rpx;color: #888;}
</style>
