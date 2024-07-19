// index.js
const http = require('../../utils/http')
const config = require('../../utils/config')
Page({
  data: {
    
    indexImgs: [], // 轮播图数据
    news: [], // 公告列表
    itemList: [  // 四个小标签的数据
      {
        id:1,
        imgUrl: "../../images/icon/newProd.png",
        tagName: "新品推荐",
        navigateUrl: ""
      },
      {
        id:2,
        imgUrl: "../../images/icon/timePrice.png",
        tagName: "限时特惠",
        navigateUrl: ""
      },
      {
        id:3,
        imgUrl: "../../images/icon/neweveryday.png",
        tagName: "每日疯抢",
        navigateUrl: ""
      },
      {
        id:4,
        imgUrl: "../../images/icon/newprods.png",
        tagName: "领优惠券",
        navigateUrl: ""
      }
    ],

    tagList: []


  },

  onLoad(){
    this.getAllData()
  },



  /***跳转商品详情页面 */
  gotoSeach(e){
    console.log(e);
    wx.navigateTo({
      url: '../search/search' ,
    })
  },

  /***跳转商品详情页面 */
  gotoDetail(e){
    console.log(e);
    wx.navigateTo({
      url: '../detail/detail?prodId=' + e.currentTarget.dataset.prodid ,
    })
  },



  getAllData(){
    this.getCartCount() // 获取购物车的数量
    this.getBannerList()
    this.getNoticeList()
    this.getTag()
  },

  /***
   * 获取购物车的数量角标
   */
  getCartCount(){
    var page = this
    var params = {
      url: config.prodCount,
      method: "GET",
      data: {},
      callBack(res){
        if(res > 0){
          wx.setTabBarBadge({
            index: 2, // 购物车的tabbar角标
            text: res + "" // 
          })
        }else{
          wx.removeTabBarBadge({
            index: 2,
          })
        }
      },
      errCallBack(res){
      }
    }
    http.request(params)



  },


  // 获取轮播图数据
  getBannerList(){
    var page = this
    var params = {
      url: config.bannerUrl,
      method: "GET",
      data: {},
      callBack(res){
        page.setData({
          indexImgs: res
        })
      },
      errCallBack(res){
      }
    }
    http.request(params)
  },


  // 获取公告列表
  getNoticeList(){
    var page = this
    var params = {
      url: config.noticeList,
      method: "GET",
      data: {},
      callBack(res){
        page.setData({
          news: res.records
        })
      },
      errCallBack(res){
      }
    }
    http.request(params)
  },

  getTag(){
    var page = this
    var params = {
      url: config.prodTagList,
      method: "GET",
      data: {},
      callBack(res){

        page.setData({
          tagList: res
        })
        for(var i = 0; i < res.length ; i++){
          page.getTagProd(res[i].id,i)
        }


      },
      errCallBack(res){
      }
    }
    http.request(params)
  },

  getTagProd(id,index){
    console.log(index);
    var page = this
    var params = {
      url: config.prodListByTagId,
      method: "GET",
      data: {
        tagId: id,
        size: 6
      },
      callBack: (res) => {
        var taglist = this.data.tagList;
        taglist[index].prods = res.records

        this.setData({
          tagList: taglist,
        });
      },
      errCallBack(res){
      }
    }
    http.request(params)
  }


})
