// pages/login/login.js
const http = require('../../utils/http')
const config = require('../../utils/config')
const api = require('../../utils/extendApi')
const crypto = require('../../utils/crypto')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isRegister: true,
    userName: '',
    passWord: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options);
    this.setData({
      isRegister: options.isRegister == 0
    })


  },

  getInputVal(e) {
    console.log(e);
    if (e.currentTarget.dataset.type == 'account') {
      this.setData({
        userName: e.detail.value,
      })
    } else if (e.currentTarget.dataset.type == 'password') {
      this.setData({
        passWord: e.detail.value,
      })
    }


  },


  /***
   * 
   * 用户登录或者注册
   * 
   */
  handleLoginOrRegister(e) {

    if (!this.data.userName.trim()) {
      api.toast({
        title: '请输入用户名',
        icon: 'none'
      })
      return
    }
    if (this.data.password === '') {
      api.toast({
        title: '请输入密码',
        icon: 'none'
      })
      return
    }
    console.log("isRegister == " + this.data.isRegister);
    var page = this
    var params = {
      url: this.data.isRegister ?config.loginUrl :config.registerUrl ,
      method: "POST",
      data: {
        userName: this.data.userName,
        passWord: crypto.encrypt(this.data.passWord)
      },
      callBack(res) {
        console.log(res);
        wx.setStorageSync('token', res.accessToken)
        if (this.data.isRegister) {
          // 注册成功
          this.setData({
            userName: '',
            passWord: '',
            isRegister: !this.data.isRegister
          })
        } else {
          // 登录成功
          // 跳转首页
          wx.switchTab({
            url: '../index/index',
          })
        }


      },
      errCallBack(res) {}
    }
    console.log(params);
    http.request(params)
  },


  changeLoginOrRegister() {
    // console.log('changeLoginOrRegister');
    // this.setData({
    //   isRegister: !this.data.isRegister
    // })
    let str = this.data.isRegister ? '1' : '0'
    wx.redirectTo({
      url: '/pages/login/login?isRegister=' + str,
    })
  },

})