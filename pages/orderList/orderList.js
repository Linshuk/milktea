// pages/orderList/orderList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status: 1,
    current: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options);
    var status = options.status
    var current = 0
    switch (status) {
      case '1':
        current = 0
        break
      case '2':
        current = 1
        break
      case '3':
        current = 2
        break
      case '5':
        current = 3
        break
    }

    this.setData({
      status,
      current
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