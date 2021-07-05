// pages/login/login.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mCode:'',
    mPwd:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  * 获取输入信息
  */
 inputTilte1: function (e) {
  let that = this;
  that.data.mCode = e.detail.value;
},

  /**
  * 获取输入信息
  */
 inputTilte2: function (e) {
  let that = this;
  that.data.mPwd = e.detail.value;
},


//登录账号
onLogin:function(){
  var that = this;

  if (that.data.mCode.trim().length == 0) {
    that.anniu("请输入用户名");
    return;
  }

  if (that.data.mPwd.trim().length == 0) {
    that.anniu("请输入密码");
    return;
  }

  wx.request({
    url: 'http://47.105.106.54/iotapi/login', //仅为示例，并非真实的接口地址
    method: 'POST',
    data: {
      password: that.data.mCode,
      username: that.data.mPwd
    },
    header: {
      'content-type': 'text/plain' // 默认值
    },
    success(res) {
     if( res.data.sessionToken == null ){
      that.anniu("用户名或密码错误，请重试");

      wx.navigateTo({
        url: '../../pages/home/home'
      })

      return;
     }
      that.setData({
        sessionToken: res.data.sessionToken,
      }),
      wx.navigateBack()
    }
  })

  },

  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    this.onLoginTest();
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

  },
   /**
   * 显示错误信息
   */
  anniu: function (e) {
    if (!this.data.show) {
      let that = this;
      this.setData({
        show: 1,
        showMsg: e,
      })
      setTimeout(function () {
        that.setData({
          show: 0
        })
      }, 2000)
    }
  },
})