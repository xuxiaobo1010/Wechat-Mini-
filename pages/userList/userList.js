// pages/userList/userList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    viewH:0,
    userList:["1","2"],
    index:1000,
    array: ['美国', '中国', '巴西', '日本'],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // 先取出页面高度 windowHeight
    wx.getSystemInfo({
     success: function(res) {
         that.setData({
          viewH:res.windowHeight - (res.statusBarHeight + 46 * 2)
         });
     }
 });
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
   * 选择公司部门
   */
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

  /**
   * 添加用户
   */
  onAddUser:function(){
    wx.navigateTo({
      url: '../../pages/addUser/addUser?type=1'
    })
  },

  /**
   * 修改用户
   */
  onUpdateUser:function(){
    wx.navigateTo({
      url: '../../pages/addUser/addUser?type=2&name=李宏&phone=18810013034'
    })
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