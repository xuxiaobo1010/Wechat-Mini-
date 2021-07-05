// pages/map/map.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    markers:[{ id: 18,
    latitude: 23.099994,
    joinCluster:true,
    longitude: 113.326520,
    width: 20,
    height: 20,
    title: "111"

  }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
wx.login({
      success (res) {
        if (res.code) {
          console.log('登录！' + res.code)
          wx.request({
            url: 'http://1.117.219.33/swagger/#/Wechat/post_wechat',
            method: 'POST',
            data: {
              jscode: res.code
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  clickMarker:function(e){
    var id = e.detail.markerId
    console.log(e)
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