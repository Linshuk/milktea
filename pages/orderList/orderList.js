// pages/orderList/orderList.js
const http = require('../../utils/http')
const config = require('../../utils/config')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sts: 0,
    list: [],
    current: 1,
    pages: 0
  },

  /***
   * 状态点击事件
   */
  onStsTap(e) {
    this.setData({
      sts: e.currentTarget.dataset.sts
    })
    this.loadOrderData(e.currentTarget.dataset.sts,1)
  },




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if (options.sts) {
      this.setData({
        sts: options.sts
      })
      this.loadOrderData(options.sts, 1)
    } else {

      this.loadOrderData(0, 1)
    }


  },

  loadOrderData(sts,current) {
    var page = this
    var params = {
      url: config.myOrderUrl,
      method: "GET",
      data: {
        status: sts
      },
      callBack(res) {
        console.log(res);
        page.setData({
          list: res.records
        })
      },
      errCallBack(res) {}
    }
    http.request(params)
  },

  onCancelOrder(e){
    var page = this
    wx.showModal({
      title: '',
      content: '是否取消该订单？',
      complete: (res) => {
        if (res.cancel) {
          
        }
    
        if (res.confirm) {
          wx.showLoading()
          var params = {
            url: config.cancelOrderUrl+ "/" + e.currentTarget.dataset.ordernum,
            method: "PUT",
            data: {},
            callBack(res) {
              console.log(res);
              page.loadOrderData(1,1)
              wx.hideLoading()
            },
            errCallBack(res) {}
          }
          http.request(params)
        }
      }
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