// pages/work/work.js
const app = getApp()
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    deviceList:[],
    workList:[],
    workTypeList:['全部','故障维修','设备移位'],
    orderTypeList:['全部','待分配','待处理','已处理','已结单'],
    viewH:0,
    scrollViewHeight:0,
    visible2:false,
    sessionToken:'',
    mSkip:0,
    whereType:{"$ne":""},
    whereStatus:{"$ne":9},
    index1:0,
    index2:0,
    index5:0,
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
          viewH:res.windowHeight - (res.statusBarHeight +35),
          sessionToken:app.globalData.token
         });
     }
 });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.onQueryUser()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    that.setData({
      mSkip : 0
    })
    that.onAllDevice();
  },

  bindPickerChange: function(e) {
    var that = this;
    var mValue = '';
    if( e.detail.value == 0 ){
      mValue = ''
    }else(
      mValue = that.data.workTypeList[e.detail.value]
    )
    console.log('picker发送选择改变，携带值为', mValue)

    this.setData({
     whereType:mValue,
     index1:e.detail.value,
     mSkip : 0
    })
    that.onAllDevice();
  },
  onClose1() {
    this.setData({
        visible2: false,
    })
},
onClose2() {
  this.setData({
      visible3: false,
  })
},
  bindPickerChange2: function(e) {
    var mValue = '';
    var that =this;
    if( e.detail.value == 0 ){
      mValue = {"$ne":9}
    }else if(e.detail.value == 1){
      mValue = '0'
    }else if(e.detail.value == 2){
      mValue = '1'
    }else if(e.detail.value == 3){
      mValue = '2'
    }else if(e.detail.value == 4){
      mValue = '3'
    }
    console.log('picker发送选择改变，携带值为', mValue)

    this.setData({
     whereStatus:mValue,
     index2:e.detail.value,
     mSkip : 0
    })
    that.onAllDevice();
  },

  /**
   * 获取工单列表
   */
  onMainWork:function(){
    var that = this;
    var whereItem =  {'info.receiveuseid': app.globalData.info.objectId}
    whereItem.status=that.data.whereStatus
    whereItem.type = that.data.whereType
    console.log('whereItem==='+JSON.stringify(whereItem ))
    wx.request({
      url: app.globalData.httpUrl+'iotapi/classes/Maintenance', 
      data: {
        skip: that.data.mSkip,
        limit:10,
        include:'device,user',
        order:'-createdAt',
        where:whereItem
      },
      header: {
        'content-type': 'application/json', // 默认值
        'sessionToken': that.data.sessionToken//读取cookie // 默认值
      },
      success(res) {
        wx.hideLoading()

        var tList = res.data.results;
        for (const i in tList) {
          tList[i].createdAt  = util.formatTimeTwo(tList[i].createdAt, 'Y-M-D h:m');
         // tList[i].deviceName = tList[i].device.name
        }

        if( that.data.mSkip == 0 ){
          that.setData({
            workList: tList,
          })
        } else{
          that.setData({
            workList:that.data.workList.concat(tList)
          })
        }
        }
      })
  },

  /**
   * 获取所有设备
   */
  onAllDevice:function(){
    wx.showLoading({
      title: '请求中',
    })
    var that = this;

    if( that.data.deviceList.length == 0 ){
    wx.request({
      url: app.globalData.httpUrl+'iotapi/classes/Device', 
      data: {
        skip: 0,
        keys:'name',
        limit:10,
        // where:{"product":"0765bee775"}
      },
      header: {
        'content-type': 'application/json', // 默认值
        'sessionToken': that.data.sessionToken//读取cookie // 默认值
      },
      success(res) {
         // that.getDeviceName(item.device.objectId)
        
        that.setData({
          deviceList:res.data.results
        })
         that.onMainWork();
      }
    })
  }else{
    that.onMainWork();
  }
  },

  /**
   * 跳转到详情
   */
  goInfo:function(e){
    var _this = this;
    let _index = e.currentTarget.dataset.index;
    var mList = _this.data.workList;
    var mItemData = JSON.stringify(mList[_index] );
    wx.navigateTo({
      url: '../../pages/myWorkInfo/myWorkInfo?item='+mItemData
  })
  },

 
  showPop:function(e){
    var that =this
    let _index = e.currentTarget.dataset.index;
    this.setData({
      visible2: true,
      item:that.data.workList[_index]
  })
  },
  showPop2:function(e){
    var that =this
    let _index = e.currentTarget.dataset.index;
    this.setData({
      visible3: true,
      item:that.data.workList[_index]
  })
  },


//滑动到底部
onDownListener: function () {
  console.log("==========")
  var that = this;
  if( that.data.mSkip > that.data.workList.length ){
   return
  }
 
  that.setData({
    mSkip: that.data.mSkip + 10
  })
  that.onMainWork();
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
      if( res.statusCode == 200 ){
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
  * 获取输入信息
  */
 inputTilte2: function (e) {
  let that = this;
  that.data.memo = e.detail.value;
},
  /**
  * 获取输入信息
  */
 inputTilte3: function (e) {
  let that = this;
  that.data.memo2 = e.detail.value;
},


  /**
   * 处理工单
   */
  onEndOrder:function(){
    wx.showLoading({
      title: '正在请求',
    })
    var that = this;
    var mInfo = that.data.item.info
    var mStep = {}
    mStep.Remarks =  that.data.memo2
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
          that.onShow();
         that.onClose2();
      }else{
        wx.showToast({
          title: '结单失败'
        })
      }
    }
    })
  },
})