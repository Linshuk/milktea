// pages/basket/basket.js
const http = require('../../utils/http')
const config = require('../../utils/config')
const api = require('../../utils/extendApi')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopCartItemDiscounts: [],
    allChecked: false,
    totalMoney: 0,
    finalMoney: 0,
    subtractMoney: 0,
    count: 0

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.loadBasketData()
  },

  onShow(){
    console.log('onShow');
  },

  /***
   * 加载购物车数据
   */
  loadBasketData() {
    var page = this
    var params = {
      url: config.cartInfoUrl,
      method: "POST",
      data: {},
      callBack(res) {
        console.log(res);
        if (res.length > 0) {
          // 有数据
          var shopCartItemDiscounts = res[0].shopCartItemDiscounts
          shopCartItemDiscounts.forEach(item => {
            item.shopCartItems.forEach(cartItem => {
              cartItem.checked = false
            })
          })

          page.setData({
            shopCartItemDiscounts: shopCartItemDiscounts,
            allChecked: false
          })

        } else {
          page.setData({
            shopCartItemDiscounts: []
          })
        }


      },
      errCallBack(res) {}
    }
    http.request(params)
  },

  /***
   * 计算购物车的总额
   */
  calTotalPrice() {
    var shopCartItemDiscounts = this.data.shopCartItemDiscounts
    var shopCartIds = []
    for (let i = 0; i < shopCartItemDiscounts.length; i++) {
      var items = shopCartItemDiscounts[i].shopCartItems
      for (let j = 0; j < items.length; j++) {
        if (items[j].checked) {
          shopCartIds.push(items[j].basketId)
        }
      }
    }

    var page = this
    wx.showLoading()
    var params = {
      url: config.totalPayUrl,
      method: "POST",
      data: shopCartIds,
      callBack(res) {
        console.log(res);
        page.setData({
          finalMoney: res.finalMoney,
          totalMoney: res.totalMoney,
          subtractMoney: res.subtractMoney,
        })
        wx.hideLoading()
      },
      errCallBack(res) {}
    }
    http.request(params)
  },

  /***全选 */
  onSelAll() {
    var allChecked = this.data.allChecked
    allChecked = !allChecked
    var shopCartItemDiscounts = this.data.shopCartItemDiscounts
    console.log(shopCartItemDiscounts);

    for (let i = 0; i < shopCartItemDiscounts.length; i++) {
      var items = shopCartItemDiscounts[i].shopCartItems
      for (let j = 0; j < items.length; j++) {
        items[j].checked = allChecked
      }
    }

    this.setData({
      allChecked: allChecked,
      shopCartItemDiscounts: shopCartItemDiscounts
    })

    this.calTotalPrice()

  },

  /***每一项的点击事件 */
  onSelectedItem(e) {
    var index = e.currentTarget.dataset.index
    var scindex = e.currentTarget.dataset.scindex

    var shopCartItemDiscounts = this.data.shopCartItemDiscounts // 获取购物车列表
    var checked = shopCartItemDiscounts[scindex].shopCartItems[index].checked
    shopCartItemDiscounts[scindex].shopCartItems[index].checked = !checked

    this.setData({
      shopCartItemDiscounts: shopCartItemDiscounts
    })

    this.checkAllSelected()
    this.calTotalPrice()
  },


  /***检查全选的状态 */
  checkAllSelected() {
    var allChecked = true
    var shopCartItemDiscounts = this.data.shopCartItemDiscounts // 获取购物车列表
    var flag = false

    for (let i = 0; i < shopCartItemDiscounts.length; i++) {
      var items = shopCartItemDiscounts[i].shopCartItems
      for (let j = 0; j < items.length; j++) {
        if (!items[j].checked) {
          allChecked = !allChecked
          flag = true
          break
        }
      }
      if (flag) {
        break
      }
    }

    this.setData({
      allChecked: allChecked
    })

  },

  /***
   *  减少数量
   */
  onCountMinus(e) {
    var index = e.currentTarget.dataset.index
    var scindex = e.currentTarget.dataset.scindex
    var shopCartItemDiscounts = this.data.shopCartItemDiscounts // 获取购物车列表
    var prodCount = shopCartItemDiscounts[scindex].shopCartItems[index].prodCount
    if (prodCount > 1) {
      this.updateCount(shopCartItemDiscounts, scindex, index, -1)
    }
  },


  /***
   *  增加数量
   */
  onCountPlus(e) {
    var index = e.currentTarget.dataset.index
    var scindex = e.currentTarget.dataset.scindex
    var shopCartItemDiscounts = this.data.shopCartItemDiscounts // 获取购物车列表

    this.updateCount(shopCartItemDiscounts, scindex, index, 1)
  },



  /***
   * 更新购物车的数量
   */
  updateCount(shopCartItemDiscounts, scindex, index, prodCount) {
    var page = this
    wx.showLoading()
    var params = {
      url: config.changeItemUrl,
      method: "POST",
      data: {
        count: prodCount,
        prodId: shopCartItemDiscounts[scindex].shopCartItems[index].prodId,
        skuId: shopCartItemDiscounts[scindex].shopCartItems[index].skuId,
        shopId: 1
      },
      callBack(res) {
        shopCartItemDiscounts[scindex].shopCartItems[index].prodCount += prodCount
        page.setData({
          shopCartItemDiscounts: shopCartItemDiscounts,
          
        })

        page.calTotalPrice() //计算总价
        wx.hideLoading()
      },
      errCallBack(res) {}
    }
    http.request(params)
  },


  /***
   * 结算
   */
  toFirmOrder(e) {
    console.log(e);
    // 获取购物车列表
    var shopCartItemDiscounts = this.data.shopCartItemDiscounts
    // 创建购物车ID
    var basketId = []
    // 遍历购物车列表
    shopCartItemDiscounts.forEach(item => {
      // 购物车数据
      item.shopCartItems.forEach(cartItem => {

        //把有被选中的挑选出来
        if (cartItem.checked) {
          basketId.push(cartItem.basketId)
        }
      })
    })

    if (!basketId.length) {
      api.toast({
        title: "请选择商品"
      })
      return
    }

    // 1、拼接到url后面，转json字符串
    // 2、存缓存
    wx.setStorageSync('basketIds', JSON.stringify(basketId))
    wx.navigateTo({
      url: '../submit-order/submit-order?order-entrytype=2',
    })

  },


  /***
   * 删除商品
   */
  onDelBasket() {

    // 获取购物车列表
    var shopCartItemDiscounts = this.data.shopCartItemDiscounts
    // 创建购物车ID
    var basketId = []
    // 遍历购物车列表
    shopCartItemDiscounts.forEach(item => {
      // 购物车数据
      item.shopCartItems.forEach(cartItem => {

        //把有被选中的挑选出来
        if (cartItem.checked) {
          basketId.push(cartItem.basketId)
        }
      })
    })

    if (!basketId.length) {
      api.toast({
        title: "请选择商品"
      })
      return
    } else {

      wx.showModal({
        title: '',
        content: '确认要删除选中的商品吗？',
        confirmColor: '#eb2444',
        complete: (res) => {
          if (res.cancel) {

          }

          if (res.confirm) {
            var page = this
            wx.showLoading()
            var params = {
              url: config.deleteItemUrl,
              method: "DELETE",
              data: basketId,
              callBack(res) {
                page.calTotalPrice()
                page.loadBasketData()
              },
              errCallBack(res) {}
            }
            http.request(params)
          }
        }
      })
    }
  },

  onPullDownRefresh(){
    console.log("onPullDownRefresh");
    this.loadBasketData()
  }


})