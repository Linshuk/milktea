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
    // this.getAllData()
  },

  getAllData(){
    this.getBannerList()
    this.getNoticeList()
    this.getTag()
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
    http.request(params,true)
  },


  // 获取公告列表
  getNoticeList(){
    var page = this
    var params = {
      url: config.noticeList,
      method: "GET",
      data: {},
      callBack(res){
        console.log("callBack");
        console.log(res.records);
        page.setData({
          news: res.records
        })
      },
      errCallBack(res){
      }
    }
    http.request(params,true)
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
    http.request(params,true)
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

        console.log(this.data.tagList);
      },
      errCallBack(res){
      }
    }
    http.request(params,true)
  }


})
