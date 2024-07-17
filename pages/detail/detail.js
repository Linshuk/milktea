// pages/detail/detail.js
const http = require('../../utils/http')
const config = require('../../utils/config')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    prodId: 0,
    prodName: '',
    imgs: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options);
    this.setData({
      prodId: options.prodId
    })

    this.getGoodDetail()

  },

  getGoodDetail(){
    var page = this
    var params = {
      url: config.prodInfoUrl,
      method: "GET",
      data: {
        prodId: this.data.prodId
      },
      callBack(res){
        var imgs = res.imgs.split(',')

        console.log(imgs);
        page.setData({
          prodName: res.prodName,
          imgs
        })
      },
      errCallBack(res){
      }
    }
    console.log(params);
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