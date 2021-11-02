// pages/workInfo1/workInfo1.js
var util = require('../../utils/util.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item:'',
    userList:[],
    memo:'',
    memo2:'',
    index:0,
    indicatorDots: true, // 是否显示面板指示点
    autoplay: true, // 是否自动切换
    interval: 5000, // 自动切换时间间隔
    duration: 500, // 滑动动画时长
    circular: true, // 是否采用衔接滑动
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      item : JSON.parse(options.item)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.onQueryUser();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

   //查询用户列表
onQueryUser:function(){
  var that = this;
  wx.request({
    url: app.globalData.httpUrl+'iotapi/classes/_User?order=createdAt&limit=1000&skip=0', 
    header: {
      'content-type': 'application/json', // 默认值
      'sessionToken': app.globalData.token//读取cookie // 默认值
    },
    success(res) {
      if(res.statusCode == 200){
        var tList =  res.data.results
        var uList = []
        for (const i in tList) {
          uList.push(tList[i].nick)
        }
      that.setData({
        cUserList: uList,
        userList:tList
      })
    }else if(res.statusCode == 401){
      wx.reLaunch({
          url: '../../pages/index/index' 
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
  seeImg:function(e){
    console.log(e)
    var current=e.target.dataset.index;
		wx.previewImage({
		  	current: current, // 当前显示图片的http链接
		  	urls: this.data.item.info.photo // 需要预览的图片http链接列表
		})

  },

  /**
  * 获取输入信息
  */
 inputTilte2: function (e) {
  let that = this;
  that.data.memo = e.detail.value;
},


 

  /**
   * 处理
   */
  onEndOrder:function(){
    wx.showLoading({
      title: '正在请求',
    })
    var that = this;
    var mInfo = that.data.item.info
    var mStep = {}
    mStep.Remarks =  that.data.memo
    mInfo.step2 = mStep
    var timeItem={}
    timeItem.timestamp = util.formatTime(new Date());
    timeItem.h4='已处理'
    timeItem.p= app.globalData.info.nick +' 已处理了这条工单 '
    mInfo.timeline.push(timeItem) 
    wx.request({
      url: app.globalData.httpUrl+'iotapi/classes/Maintenance/'+that.data.item.objectId, //仅为示例，并非真实的接口地址
      method: 'PUT',
      data: {
        status: 2,
        info: mInfo,
        ACL:that.data.item.ACL
      },
      header: {
        'content-type': 'application/json', // 默认值
        'sessionToken': app.globalData.token//读取cookie // 默认值
      },
      success(res) {
        wx.hideLoading({
          success: (res) => {},
        })
        if( res.statusCode == 200 ){
          setTimeout(item => {
            wx.navigateBack({
             delta: 1 //返回上一级页面
            })
           },1000)
      }else{
        wx.showToast({
          title: '结单失败'
        })
      }
    }
    })
  },

  /**
   * 删除订单
   */
  onDeleteOrder:function(){
    wx.showLoading({
      title: '正在派单',
    })
    var that = this;

    wx.request({
      url: app.globalData.httpUrl+'iotapi/classes/Maintenance/'+that.data.item.objectId, //仅为示例，并非真实的接口地址
      method: 'DELETE',
      header: {
        'content-type': 'application/json', // 默认值
        'sessionToken': app.globalData.token//读取cookie // 默认值
      },
      success(res) {
        wx.hideLoading({
          success: (res) => {},
        })
        if( res.statusCode == 200 ){
          setTimeout(item => {
            wx.navigateBack({
             delta: 1 //返回上一级页面
            })
           },1000)
      }else{
        wx.showToast({
          title: '删除工单失败'
        })
      }
    }
    })

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