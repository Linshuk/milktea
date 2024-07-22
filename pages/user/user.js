// pages/user/user.js
const http = require('../../utils/http')
const config = require('../../utils/config')
const api = require('../../utils/extendApi')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    collectionCount: 0,
    msgCount: 0,
    historyCount: 0
  },

  /***
   * 注销登录
   */
  logout(){
    var page = this
    var params = {
      url: config.logoutUrl,
      method: "POST",
      callBack(res){
        // 移除购物车的角标
        wx.removeTabBarBadge({
          index: 2,
        })
        // 移除缓存
        wx.removeStorageSync('loginResult')
        // 移除token
        wx.removeStorageSync('token')

        api.toast({
          title: '退出成功'
        })

        // 跳转到首页的tab,重定向到登录页
        setTimeout(()=>{
          wx.switchTab({
            url: '../index/index',
          })
        },1000)

      },
      errCallBack(res){
      }
    }
    console.log(params);
    http.request(params)

  },

  /***
   * 跳转订单列表
   */
  gotoOrderList(e){
    var status = e.currentTarget.dataset.status

    console.log();
    wx.navigateTo({
      url: '../orderList/orderList?status=' + status,
    })
  },

  myCollectionHandle(e){
    wx.navigateTo({
      url: '../prod-classify/prod-classify?sts=' + e.currentTarget.dataset.sts,
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.loadCollectionCount()
  },

  
  loadCollectionCount(){
    var page = this
    var params = {
      url: config.collectionCountUrl,
      method: "GET",
      data: {},
      callBack: (res) => {
        page.setData({
          collectionCount: res
        })
      },
      errCallBack(res){
      }
    }
    http.request(params)
  },

  /***
   * 跳转收货地址列表
   */
  gotoAddrList(){
    wx.navigateTo({
      url: '../delivery-address/delivery-address',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})