// pages/detail/detail.js
const http = require('../../utils/http')
const config = require('../../utils/config')
const util = require('../../utils/util')
const api = require('../../utils/extendApi')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopId: 1,
    picDomain: config.picDomain,
    indicatorDots: true,
    indicatorColor: '#f2f2f2',
    indicatorActiveColor: '#eb2444',
    autoplay: true,
    interval: 3000,
    duration: 1000,
    prodNum: 1,
    totalCartNum: 0,
    pic: "",
    imgs: '',
    prodName: '',
    price: 0,
    content: '',
    prodId: 0,
    brief: '',
    skuId: 0,
    popupShow: false,
    // 是否获取过用户领取过的优惠券id
    loadCouponIds: false,
    skuShow: false,
    commentShow: false,
    couponList: [],
    skuList: [],
    skuGroup: {},
    findSku: true,
    defaultSku: undefined,
    selectedProp: [],
    selectedPropObj: {},
    propKeys: [],
    allProperties: [],
    prodCommData: {},
    prodCommPage: {
      current: 0,
      pages: 0,
      records: []
    },
    littleCommPage: [],
    evaluate: -1,
    isCollection: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options);
    this.setData({
      prodId: options.prodId
    })
    // 获取商品的详情数据
    this.getGoodDetail()
    // 获取商品是否存在收藏列表中
    this.getCollection()
    // 加载评论的数据
    this.getProdCommData()
    // 获取部分的评论
    this.getLittleProdComm()
  },

  getGoodDetail() {
    var page = this
    var params = {
      url: config.prodInfoUrl,
      method: "GET",
      data: {
        prodId: this.data.prodId
      },
      callBack(res) {
        var imgs = res.imgs.split(',')
        var content = util.formatHtml(res.content);
        console.log(imgs);
        page.setData({
          prodName: res.prodName,
          imgs,
          content,
          price: res.price,
          prodId: res.prodId,
          brief: res.brief,
          skuList: res.skuList,
          pic: res.pic
        })

        page.groupSkuProp()

      },
      errCallBack(res) {}
    }
    console.log(params);
    http.request(params)
  },

  /**
   * 整合SKU数据
   */
  groupSkuProp() {
    var skuList = this.data.skuList;

    //当后台返回只有一个SKU时，且SKU属性值为空时，即该商品没有规格选项，该SKU直接作为默认选中SKU
    if (skuList.length == 1 && skuList[0].properties == "") {
      this.setData({
        defaultSku: skuList[0]
      });
      return;
    }

    var skuGroup = {}; //所有的规格名(包含规格名下的规格值集合）对象，如 {"颜色"：["金色","银色"],"内存"：["64G","256G"]}
    var allProperties = []; //所有SKU的属性值集合，如 ["颜色:金色;内存:64GB","颜色:银色;内存:64GB"]
    var propKeys = []; //所有的规格名集合，如 ["颜色","内存"]

    for (var i = 0; i < skuList.length; i++) {

      //找到和商品价格一样的那个SKU，作为默认选中的SKU
      var defaultSku = this.data.defaultSku;
      var isDefault = false;
      if (!defaultSku && skuList[i].price == this.data.price) {
        defaultSku = skuList[i];
        isDefault = true;
        this.setData({
          defaultSku: defaultSku
        });
      }

      var properties = skuList[i].properties; //如：版本:公开版;颜色:金色;内存:64GB
      allProperties.push(properties);
      var propList = properties.split(";"); // 如：["版本:公开版","颜色:金色","内存:64GB"]

      var selectedPropObj = this.data.selectedPropObj;
      for (var j = 0; j < propList.length; j++) {

        var propval = propList[j].split(":"); //如 ["版本","公开版"]
        var props = skuGroup[propval[0]]; //先取出 规格名 对应的规格值数组

        //如果当前是默认选中的sku，把对应的属性值 组装到selectedProp
        if (isDefault) {
          propKeys.push(propval[0]);
          selectedPropObj[propval[0]] = propval[1];
        }

        if (props == undefined) {
          props = []; //假设还没有版本，新建个新的空数组
          props.push(propval[1]); //把 "公开版" 放进空数组
        } else {
          if (!this.array_contain(props, propval[1])) { //如果数组里面没有"公开版"
            props.push(propval[1]); //把 "公开版" 放进数组
          }
        }
        skuGroup[propval[0]] = props; //最后把数据 放回版本对应的值
      }
      this.setData({
        selectedPropObj: selectedPropObj,
        propKeys: propKeys
      });
    }
    this.parseSelectedObjToVals();
    this.setData({
      skuGroup: skuGroup,
      allProperties: allProperties
    });

  },


  /***
   * 把已选的{key：val，key2：val2} 转换成 [val,val2]
   */
  parseSelectedObjToVals() {
    // 选中的属性
    var selectedPropObj = this.data.selectedPropObj
    var selectProperties = ''
    var selectedProp = []

    for (const key in selectedPropObj) {
      selectedProp.push(selectedPropObj[key])
      selectProperties += key + ':' + selectedPropObj[key] + ";"
    }

    selectProperties = selectProperties.substring(0, selectProperties.length - 1)
    this.setData({
      selectedProp: selectedProp
    })

    var findSku = false
    for (let i = 0; i < this.data.skuList.length; i++) {
      if (this.data.skuList[i].properties == selectProperties) {
        findSku = true;
        this.setData({
          defaultSku: this.data.skuList[i]
        })
        break
      }
    }
    this.setData({
      findSku: findSku
    })
  },

 //点击选择规格
 toChooseItem: function(e) {
  var val = e.currentTarget.dataset.val;
  var key = e.currentTarget.dataset.key;
  var selectedPropObj = this.data.selectedPropObj;
  selectedPropObj[key] = val;
  this.setData({
    selectedPropObj: selectedPropObj
  });
  this.parseSelectedObjToVals();
},

 //判断数组是否包含某对象
 array_contain: function(array, obj) {
  for (var i = 0; i < array.length; i++) {
    if (array[i] == obj) //如果要求数据类型也一致，这里可使用恒等号===
      return true;
  }
  return false;
},



  /***
   * 获取商品是否存在于收藏夹中
   */
  getCollection() {
    var page = this
    var params = {
      url: config.isCollectionUrl,
      method: "GET",
      data: {
        prodId: this.data.prodId
      },
      callBack(res) {
        page.setData({
          isCollection: res
        })
      },
      errCallBack(res) {}
    }
    console.log(params);
    http.request(params)
  },

  /***
   * 更新商品的收藏状态
   * 添加或取消商品的收藏
   */
  addOrCancleCollection() {
    wx.showLoading()
    var page = this
    var params = {
      url: config.addOrCancelUrl,
      method: "POST",
      data: this.data.prodId,
      callBack(res) {
        page.setData({
          isCollection: !page.data.isCollection
        })
        console.log(page.data.isCollection);
        wx.hideLoading()
      },
      errCallBack(res) {}
    }
    console.log(params);
    http.request(params)
  },


  /***
   * 获取评论的数据
   */
  getProdCommData() {
    wx.showLoading()
    var page = this
    var params = {
      url: config.prodCommDataUrl,
      method: "GET",
      data: {
        prodId: this.data.prodId
      },
      callBack(res) {
        page.setData({
          prodCommData: res
        })
        wx.hideLoading()
      },
      errCallBack(res) {}
    }
    console.log(params);
    http.request(params)
  },


  /**
   * 获取部分评论
   */
  getLittleProdComm() {
    if (this.data.prodCommPage.records.length) {
      return;
    }
    this.getProdCommPage();
  },

  /***
   * 获取分页评论数据
   */
  getProdCommPage(e) {
    if (e) {
      if (e.currentTarget.dataset.evaluate === this.data.evaluate) {
        return;
      }
      this.setData({
        prodCommPage: {
          current: 0,
          pages: 0,
          records: []
        },
        evaluate: e.currentTarget.dataset.evaluate
      })
    }
    http.request({
      url: config.prodCommPageByProdUrl,
      method: "GET",
      data: {
        prodId: this.data.prodId,
        size: 10,
        current: this.data.prodCommPage.current + 1,
        evaluate: this.data.evaluate
      },
      callBack: (res) => {
        res.records.forEach(item => {
          if (item.pics) {
            item.pics = item.pics.split(',')
          }
        })
        let records = this.data.prodCommPage.records
        records = records.concat(res.records)
        this.setData({
          prodCommPage: {
            current: res.current,
            pages: res.pages,
            records: records
          }
        })
        // 如果商品详情中没有评论的数据，截取两条到商品详情页商品详情
        if (!this.data.littleCommPage.length) {
          this.setData({
            littleCommPage: records.slice(0, 2)
          })
        }
      }
    })
  },

  /***
   * 跳转到首页
   */
  toHomePage(){
    wx.switchTab({
      url: '../index/index',
    })

  },
    /***
   * 跳转到购物车
   */
  toCartPage(){
    wx.switchTab({
      url: '../basket/basket',
    })

  },


  /***
   * 加入购物车
   */
  addToCart(){
    if (!this.data.findSku) {
      return
    }

    var page = this
    var params = {
      url: config.changeItemUrl,
      method: "POST",
      data: {
        basketId: 0,
        count: this.data.prodNum,
        prodId: this.data.prodId,
        shopId: 1,
        skuId: this.data.defaultSku.skuId
      },
      callBack(res){
        console.log(res);
        page.setData({
          totalCartNum: this.data.totalCartNum + this.data.prodNum
        })

        api.toast({
          title: "添加成功",
          icon: 'success'
        })

      },
      errCallBack(res){
      }
    }
    http.request(params)

  },


  /***
   * 跳转到下单页面
   */
  buyNow(){
    wx.navigateTo({
      url: '../submit-order/submit-order?order-entrytype=1',
    })

  },

  /***
   * 显示弹窗
   */
  showSku: function () {
    this.setData({
      skuShow: true
    })
  },
  showComment: function() {
    this.setData({
      commentShow: true
    });
  },
  /***
   * 关闭弹窗
   */
  closePopup: function () {
    this.setData({
      skuShow: false,
      commentShow: false
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