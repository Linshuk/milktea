// wx.request({
//   url: 'http://www.baidu.com',
//   method: "POST",
//   data: {},
//   header: "",
//   dataType: {},
//   responseType: {},
//   success(){},
//   fail(){},
//   complete(){}
// })

var config = require('config.js')
var api = require('extendApi.js')
/***
 * 封装请求方法
 * 所有的请求都需要做用户是否登录的判断: login 字段
 */
function request(params,isGetToken){
  api.toast({
    title: '正在请求中',
  })
  wx.request({
    url: config.domain + params.url, //接口请求地址
    data: params.data,
    header: {
      // 'content-type': params.method == "GET" ? 'application/x-www-form-urlencoded' : 'application/json;charset=utf-8',
      'Authorization': params.login ? undefined : wx.getStorageSync('token')
    },
    method: params.method == undefined ? "POST" : params.method,
    dataType: 'json',
    responseType: params.responseType == undefined ? 'text' : params.responseType,
    success: function(res) {
			const responseData = res.data

      // 00000 请求成功
      if (responseData.code === '00000') {
        if (params.callBack) {
          params.callBack(responseData.data);
        }
        return
      }

      // A00004 未授权
      if (responseData.code === 'A00004') {
        wx.navigateTo({
          url: '/pages/login/login',
        })
				return
      }

      // A00005 服务器出了点小差
      if (responseData.code === 'A00005') {
        console.error('============== 请求异常 ==============')
        console.log('接口: ', params.url)
        console.log('异常信息: ', responseData)
        console.error('============== 请求异常 ==============')
        if (params.errCallBack) {
          params.errCallBack(responseData)
          return
        }
        wx.showToast({
          title: '服务器出了点小差~',
          icon: 'none'
        })
      }

      // A00001 用于直接显示提示用户的错误，内容由输入内容决定
      if (responseData.code === 'A00001') {
        if (params.errCallBack) {
          params.errCallBack(responseData)
          return
        }
        wx.showToast({
          title: responseData.msg || 'Error',
          icon: 'none'
        })
        return
      }

      // 其他异常
      if (responseData.code !== '00000') {
        // console.log('params', params)
      	wx.hideLoading();
        if (params.errCallBack) {
          params.errCallBack(responseData)
        } else {
          console.log(`接口: ${params.url}`)
          console.log(`返回信息： `, res)
        }
      }
 
    },
    fail: function(err) {
      wx.hideLoading();
      wx.showToast({
        title: "服务器出了点小差",
        icon: "none"
      });
    }
  })


}

/***获取购物车的数量 */
function getCartCount(){
  var params = {
    url: config.prodCountUrl,
    method: 'GET',
    data:{},
    callBack(res){
      if(res > 0){
        wx.setTabBarBadge({
          index: 2,
          text: res + "",
        })

        var app = getApp()
        app.globalData.totalCartCount = res;


      }else{
        wx.removeTabBarBadge({
          index: 2,
        })
        var app = getApp()
        app.globalData.totalCartCount = 0;
      }
    },
    errCallBack(res){
    }
  }

  request(params)
}





exports.request = request;
exports.getCartCount = getCartCount;



