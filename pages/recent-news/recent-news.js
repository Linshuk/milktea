// pages/recent-news/recent-news.js
// 公告页面
const http = require('../../utils/http')
const config = require('../../utils/config')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    news: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log("onLoad");
    this.loadNoticeList()
  },
  loadNoticeList(){
    console.log("loadNoticeInfo");
    var page = this
    var params = {
      url: config.noticeListUrl,
      method: "GET",
      data: {},
      callBack(res){
        console.log(res);
        page.setData({
          news: res.records
        })
      },
      errCallBack(res){
      }
    }
    http.request(params)
  },

  toNewsDetail(e){
    wx.navigateTo({
      url: '../news-detail/news-detail?id=' + e.currentTarget.dataset.id,
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