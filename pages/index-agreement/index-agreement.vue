<template>
	<view>
		
		<view class="bT-e1 color8 font-34 p-3">
			<view class="content ql-editor" style="padding:0;" v-html="artData.content">
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				artData:{}
			}
		},
		onLoad() {
			const self = this;
			self.$Utils.loadAll(['getArtData'], self);
		},
		methods: {
			
			getArtData() {
				const self = this;
				const postData = {};
				postData.searchItem = {
					thirdapp_id: 2,
					menu_id:2,
					title:'会员协议'
				};
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.artData = res.info.data[0]
					}
					self.$Utils.finishFunc('getArtData');
				};
				self.$apis.articleGet(postData, callback);
			},
			
		}
	}
</script>

<style>

</style>
