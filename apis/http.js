import store from "@/store"
import config from "@/config/index.config.js";
import token from '@/common/token.js';
import Router from '@/common/router.js';

export default {
	HTTP(obj) {
		var self = this;	
		const callback = (res)=>{
            if(res){
                obj.data.refreshToken=false;
            };
			console.log('sTokenAfter',obj);
			console.log('res.info.user_no',res);
			if(obj.data.sTokenAfter){
				obj.data.searchItem[obj.data.sTokenAfter] = res.info.user_no;
			};
            self.HTTP(obj);
        };
        if(obj.data.tokenFuncName){
            
            if(obj.data.refreshToken){
                token[obj.data.tokenFuncName](callback,{refreshToken:true});
            }else{
                //obj.data.token = token[obj.data.tokenFuncName](callback);
				obj.data.token = uni.getStorageSync('user_token');
            };
            if(!obj.data.token){
                return;
            };
            
        };
	
		var custom_header = {'content-type': 'application/json',};
		if(!obj.data.noLoading){
			uni.showLoading({
				title: '加载中',
				mask: true
			});
		}
		
		uni.request({
			url: config.baseUrl + obj.url, //仅为示例，并非真实接口地址。
			data: obj.data,		
			method:obj.type,
			header:custom_header,
			success: (res) => {
				if(uni.getStorageSync('loadAllArray').length==0||!uni.getStorageSync('loadAllArray')){
					uni.hideLoading();
				};
				var code = res.data.solely_code;
			
                if (res.data.solely_code == '200000') {
                   uni.removeStorageSync('user_info');
                   uni.removeStorageSync('user_token');
                   getApp().globalData.isLogin =  false;
					Router.reLaunch({route:{path:'/pages/index/index'}})
                   // token[obj.data.tokenFuncName](callback,{refreshToken:true});
                } else {
                    obj.sCallback && obj.sCallback(res.data);
                };
			},
            fail: function (err) {
                
                uni.showToast({
                    title:'网络故障',
                    icon:'fail',
                    duration:2000,
                    mask:true,
                });
            }
		});	
	}
}
