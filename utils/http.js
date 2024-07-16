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
    // 访问地址: baseUrl + 接口名称
    url: config.domain + params.url,
    data: params.data,
    method: params.method === undefined ? "POST" : params.method,
    // header: {
    //   'Authorization' : params.login ? undefined : wx.getStorageSync('token')
    // }
    dataType: 'json',
    responseType: params.responseType === undefined ? 'text': params.responseType,
    success(res){
      const responseData = res.data
      if(responseData.code === '00000'){
        if(params.callBack){
          params.callBack(responseData.data)
        }
        return
      }

      // 接口未授权
      if(responseData.code === 'A00004'){
        wx.navigateTo({
          url: '/pages/login/login',
        })
      }

      // 接口异常
      if(responseData.code === 'A00005'){

        // 查看日志
        // 打印一下错误信息
        console.log("--------------------- 接口异常 start---------------");
        console.log("接口url == " + url);
        console.log("接口错误信息： " + responseData);
        console.log("--------------------- 接口异常 end---------------");
        if(params.errCallBack){
            params.errCallBack(responseData)
            return
        }
      }

      // 其他的异常
      if(responseData.code !== '00000'){
        console.log("--------------------- 接口异常 start---------------");
        console.log("接口url == " + url);
        console.log("接口错误信息： " + responseData);
        console.log("--------------------- 接口异常 end---------------");
        if(params.errCallBack){
            params.errCallBack(responseData)
            return
        }
      }
    },
    fail(){},
    complete(){}
  })


}


exports.request = request;







