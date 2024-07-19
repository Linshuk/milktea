// pages/search-prod-show/search-prod-show.js

const http = require('../../utils/http')
const config = require('../../utils/config')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sts: 0,
    prodName: '',
    searchProdList: [],
    showType: 2
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options);
    this.setData({
      prodName: options.prodName
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
    this.loadGoodData()
  },

  loadGoodData(){
    var page = this
    var params = {
      url: config.searchProdPageUrl,
      method: "GET",
      data: {
        prodName: this.data.prodName,
        shopId: 1,
        orderBy: 0,
        sort: 0
      },
      callBack(res){
      
        page.setData({
          searchProdList: res.records
        })
        console.log(page.data.searchProdList);
      },
      errCallBack(res){
      }
    }
    http.request(params)
  },

/***
 * 状态点击事件
 */
  onStsTap(e){
    console.log(e);
    var sts = e.currentTarget.dataset.sts
    this.setData({
      sts: sts
    })
    this.loadGoodData()
  },

  toProdPage(e){
    var prodId = e.currentTarget.dataset.prodid
    wx.navigateTo({
      url: '../detail/detail?prodId=' + prodId,
    })
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