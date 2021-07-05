// pages/addDevice/addDevice.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    viewWidth:0,
    idx : 0,
    codeValue: '',
    deviceTypeList:[
      {'num':'我是第一个'},
      { 'num': '我是第二个' },
      { 'num': '我是第三个' },
      { 'num': '我是第四个' },
      { 'num': '我是第五个' },
      {'num':'我是第六个'},
      { 'num': '我是第七个' },
      { 'num': '我是第八个' },
      { 'num': '我是第九个' },
      { 'num': '我是第十个' }  
     ],
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
           viewWidth:res.windowWidth - 87
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
   * 选择产品类型
   */
  goIndex (e) {
    let index = e.currentTarget.dataset.index; 
    // console.log('每个index',index)
    this.setData({
      idx: index
     })
   },

   /**
    * 去扫码
    */
   onQrScan:function(){
     var that = this;
    wx.scanCode({
      success (res) {
        console.log(res)
        that.setData({
          codeValue:res.result
        })
      }
    })
   },

     //用户名和密码输入框事件
  userNameInput:function(e){
    this.setData({
      codeValue:e.detail.value
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