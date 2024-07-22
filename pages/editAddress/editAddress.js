// pages/editAddress/editAddress.js
const http = require('../../utils/http')
const config = require('../../utils/config')
const api = require('../../utils/extendApi')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    receiver: '',
    addrId: 0,
    addr: "",
    postCode: "",
    mobile: "",
    provinceId: 0,
    cityId: 0,
    areaId: 0,
    province: "",
    city: "",
    area: ""


  },

  getName(e) {
    this.setData({
      receiver: e.detail.value
    })
  },
  getPhone(e) {
    this.setData({
      mobile: e.detail.value
    })
  },
  /***
   * 省市区
   */
  getRegion(e) {
    console.log(e);
    this.setData({
      provinceId: e.detail.code[0],
      cityId: e.detail.code[1],
      areaId: e.detail.code[2],
      province: e.detail.value[0],
      city: e.detail.value[1],
      area: e.detail.value[2]
    })


  },
  getDetailAddr(e) {
    this.setData({
      addr: e.detail.value
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      addrId: options.addrId,
    })

    this.loadAddrDetail()
  },

  /***
   * 加载地址详情信息
   */
  loadAddrDetail(){
    var page = this
    var params = {
      url: config.addrInfoUrl,
      method: "GET",
      data: {
        addrId: this.data.addrId
      },
      callBack: (res) => {
        console.log(res);
        page.setData({
          receiver:res.receiver,
          addr: res.addr,
          postCode: res.postCode,
          mobile: res.mobile,
          provinceId: res.provinceId,
          cityId: res.cityId,
          areaId: res.areaId,
          province: res.province,
          city: res.city,
          area: res.area
        })

      },
      errCallBack(res) {}
    }
    console.log(params);
    http.request(params)

  },


  onSaveAddr(e) {
    var page = this
    var params = {
      url: config.addAddrUrl,
      method: "POST",
      data: {
        addrId: 0,
        receiver:this.data.receiver,
        addr: this.data.addr,
        postCode: this.data.postCode,
        mobile: this.data.mobile,
        provinceId: this.data.provinceId,
        cityId: this.data.cityId,
        areaId: this.data.areaId,
        province: this.data.province,
        city: this.data.city,
        area: this.data.area
      },
      callBack: (res) => {
        console.log(res);
      },
      errCallBack(res) {}
    }
    console.log(params);
    http.request(params)
  },

  /***
   * 删除地址
   */
  onDeleteAddr(){
    var page = this
    var params = {
      url: config.deleteAddrUrl,
      method: "DELETE",
      data: {
        addrId: this.data.addrId
      },
      callBack: (res) => {
        console.log(res);
      },
      errCallBack(res) {}
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