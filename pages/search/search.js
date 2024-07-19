// pages/search/search.js

const http = require('../../utils/http')
const config = require('../../utils/config')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotSearchList: [], // 热门搜索列表
    prodName: '',
    recentSearch: []
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

    this.getHotSearch()


  },


  getHotSearch(){
    var page = this
    var params = {
      url: config.hotSearchByShopIdUrl,
      method: "GET",
      data: {
        shopId: 1,
        number: 10,
        sort: 1
      },
      callBack(res){
        page.setData({
          hotSearchList: res
        })
      },
      errCallBack(res){
      }
    }
    http.request(params)
  },

  /***
   * 获取历史搜索
   */
  getRecentSearch(){
    let recentSearch = wx.getStorageSync('recentSearch')
    console.log("recentSearch" + recentSearch);
    this.setData({
      recentSearch
    })
  },

  /***
   * 输入商品名获取数据 || 绑定输入值
   */
  getSearchContent(e){
    this.setData({
      prodName: e.detail.value
    })
  },


  /***
   * 点击取消
   */
  goBackIndex(){
    wx.navigateBack()
  },


  /***
   * 点击搜索历史
   */
  onHistSearch(e){
    var name = e.currentTarget.dataset.name
    this.setData({
      prodName: name
    })
    this.toSearchProdPage()
  },


  clearSearch(){
    wx.clearStorageSync("recentSearch")
    this.getRecentSearch()
  },


  /***
   * 搜索提交，按回车键提交
   */
  toSearchProdPage(){
    console.log("toSearchProdPage prodName == " + this.data.prodName);
    if(this.data.prodName.trim()){
 
      let recentSearch = wx.getStorageSync('recentSearch') || []
      recentSearch = recentSearch.filter(item => item!== this.data.prodName)
      recentSearch.unshift(this.data.prodName)
      if(recentSearch.length > 10){
        recentSearch.pop()
      }
      wx.setStorageSync('recentSearch', recentSearch)
    }

    // 跳转到搜索结果页面
    wx.navigateTo({
      url: '../search-prod-show/search-prod-show?prodName=' + this.data.prodName,
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