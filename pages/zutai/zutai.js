// pages/zutai/zutai.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    devaddr:'',
    productid :'',
    viewH:'',
    viewW:'',
    imgUrl:'http://47.105.106.54:1250/group1/group1/31ca697ab2d73e4538d7f2436bd32c3.png?1622800627862'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
          that.setData({
           viewH:res.windowHeight,
           viewW:res.windowWidth,
           sessionToken:app.globalData.token,
          });
      } });
      
    that.setData({
      devaddr:options.devaddr,
      productid:options.productid
    })
  },
  loadImgSucc(e){
    console.log(e)
    var that = this
    var mList = that.data.dataList
    var eW = e.detail.width
    var eH = e.detail.height
    var viewH = that.data.viewH
    var viewW = that.data.viewW
    for (const key in mList) {
      if (mList[key].type == 'text') {
        mList[key].top = (mList[key].y / eH) * viewH
        mList[key].left = (mList[key].x / eW) * viewW
      }
    }

    that.setData({
      dataList:mList
    })

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
    this.onDeviceType()
  },

  //获取组态
  onDeviceType: function () {
    var that = this;
    wx.request({
      //url: app.globalData.httpUrl + 'iotapi/topo?productid='+ that.data.productid 
      //+'&devaddr='+ that.data.devaddr +'&type=wechat', //仅为示例，并非真实的接口地址
      
      url:app.globalData.httpUrl+'iotapi/topo?productid=c1e44b39f0&devaddr=868615051803274&type=wechat',
      header: {
        'sessionToken': app.globalData.token //读取cookie // 默认值
      },
      success(res) {
       if(  res.statusCode != 200 ){
         wx.showToast({
           title: '没有组态',
         })
        }else{
        

          that.setData({
            dataList:res.data.data
          })
        }

      }
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