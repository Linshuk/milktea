// pages/prod-classify/prod-classify.js
const http = require('../../utils/http')
const config = require('../../utils/config')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sts: 0,   // 页签值
    prodList: [],
    title: '',
    content: 1,
    size: 10,
    pages: 0,
    tagid: 0,
    current: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      current: 1,
      pages: 0,
      sts: options.sts,
      title: options.title? options.title: ''
    })

    if(options.tagid){
      this.setData({
        tagid: options.tagid
      })
    }

    // 每日上新
    if(this.data.sts == 0){
      wx.setNavigationBarTitle({
        title: '每日上新',
      })
    }else if(this.data.sts == 1){
      // 商城热卖
      wx.setNavigationBarTitle({
        title: '商城热卖',
      })
    }else if(this.data.sts == 2){
      // 更多宝贝
      wx.setNavigationBarTitle({
        title: '更多宝贝',
      })
    }else if(this.data.sts ==3){
      // 新品推荐
      wx.setNavigationBarTitle({
        title: '新品推荐',
      })
    }else if(this.data.sts == 4){
      // 限时特惠
      wx.setNavigationBarTitle({
        title: '限时特惠',
      })
    }else if(this.data.sts == 5){
      // 我的收藏
      wx.setNavigationBarTitle({
        title: '我的收藏',
      })
    }

    // 加载商品数据
    this.loadProdData()

  },

  loadProdData(){
    let sts = this.data.sts
    if(sts == 5){
      this.loadCollectionData()
    }else if (sts == 3) {
      this.loadSaleData()
    }


  },

  /***
   * 加载收藏的数据
   */
  loadCollectionData(){
    var page = this
    var params = {
      url: config.prodsByUserUrl,
      method: "GET",
      data: {},
      callBack(res){
        console.log(res);
        page.setData({
          prodList: res.records
        })
      },
      errCallBack(res){
      }
    }
    http.request(params)
  },


  /**
   * 限时特惠 
   */
  loadSaleData(){
    var page = this
    var params = {
      url: config.lastedProdPageUrl,
      method: "GET",
      data: {},
      callBack(res){
        console.log(res);
        page.setData({
          prodList: res.records
        })
      },
      errCallBack(res){
      }
    }
    http.request(params)
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