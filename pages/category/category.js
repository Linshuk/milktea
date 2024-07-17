
const http = require('../../utils/http')
const config = require('../../utils/config')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    categoryList: [],
    productList: [],
    selIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCategoryList()
  },

  /***
   * 点击切换数据
   */
  onMenuTab(e){
    var index = e.currentTarget.dataset.index;
    this.getRightCategoryList(this.data.categoryList[index].categoryId);
    this.setData({
      selIndex: index,
      categoryImg: this.data.categoryList[index].pic
    })
  },


  // 获取分类左侧的数据
  getCategoryList(){
    var page = this
    var params = {
      url: config.categoryInfo,
      method: "GET",
      data: {},
      callBack(res){
        console.log('-------------分类数据start-------------');
        console.log(res);
        console.log('-------------分类数据end-------------');
        page.setData({

          categoryImg: res[0].pic,
          categoryList: res
        })
        page.getRightCategoryList(res[0].categoryId)


      },
      errCallBack(res){
      }
    }
    http.request(params,true)
  },


 // 获取分类右侧的数据
 getRightCategoryList(categoryId){
  var page = this
  var params = {
    url: "/prod/pageProd",
    method: "GET",
    data: {
      categoryId: categoryId
    },
    callBack(res){
      console.log('-------------分类右侧数据start-------------');
      console.log(res);
      console.log('-------------分类右侧数据end-------------');
      page.setData({
        productList: res.records
      })
    },
    errCallBack(res){
    }
  }
  console.log(params);
  http.request(params,true)
},


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})