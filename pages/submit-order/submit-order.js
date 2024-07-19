// pages/submit-order/submit-order.js
const http = require('../../utils/http')
const config = require('../../utils/config')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    popupShow: false,    // 是否显示弹框

    userAddr: null,
    orderItem: [],
    addrId: 0,
    // 订单入口： 1： 商品详情-立即购买，2：购物车
    orderEntry: 1,
    couponIds: [],    // 优惠券ID
    actualTotal: 0,
    total: 0,
    remark: '',
    reduceAmount: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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
    var page = getCurrentPages()
    var currentPage = page[page.length - 1]
    if (currentPage.data.setAddress == 'yes') {
      this.setData({
        userAddr: currentPage.data.item
      })
    }

    // 加载订单数据
    this.loadOrderData()
    // /p/order/confirm
  
  },

  /***
   * 加载订单数据
   */
  loadOrderData(){
    // var addrId = 0
    // if (this.data.userAddr.addrId != null) {
    //   addrId = this.data.userAddr.addrId
    // }
    wx.showLoading({
      mask: true
    })

    var page = this
    var params = {
      url: config.orderConfirmUrl,
      method: "POST",
      data: {
        addrId: 1,
        orderItem: this.data.orderEntry == "1" ? JSON.parse(wx.getStorageSync('orderItem')) : undefined,
        basketIds: this.data.orderEntry == "2" ? JSON.parse(wx.getStorageSync('basketIds')) : undefined,
        couponIds: this.data.couponIds, 
        userChangeCoupon: 1
      },
      callBack(res){
        wx.hideLoading()
        let orderItem = []

        res.shopCartOrders[0].shopCartItemDiscounts.forEach(itemDiscounts => {
          itemDiscounts = itemDiscounts.contat(itemDiscounts.shopCartItems)
        })

        // 展示可用的优惠券列表
        // if (res.shopCartOrders[0].coupons) {
          
        // }
        this.setData({
          orderItem: orderItem,
          actualTotal: res.actualTotal,
          remark: res.remark,
          total: res.total,
          transfee: res.transfee,
          shopReduce: res.shopReduce,
          userAddr: res.userAddr
        })


      },
      errCallBack(res){
      }
    }
    http.request(params)
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
   * 去地址页面
   */
  toAddrListPage: function() {
    wx.navigateTo({
      url: '/pages/delivery-address/delivery-address?order=0',
    })
  },
})