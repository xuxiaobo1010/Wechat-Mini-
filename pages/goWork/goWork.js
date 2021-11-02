// pages/goWork/goWork.js
const app = getApp()
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    deviceName:'',
    deviceProduct:'',
    upImgNum:0,
    deviceId:'',
    banner: [], //轮播图片
    photo:[],
    chooseViewShowBanner:true,
    orderType:'故障维修',
    productid:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(options.deviceId)
    that.setData({
      deviceName:options.deviceName,
      deviceProduct:options.deviceType,
      deviceId:options.deviceId,
      productid:options.productid
    })
    that.onQueryDeviceType()

  },

  radioChange(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.setData({
      orderType:e.detail.value
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
   
  /** 选择图片Banner */
  chooseBanner: function() {
    var that = this;
    if (that.data.banner.length < 4) {
      wx.chooseImage({
        count: 3 - that.data.banner.length, //最多选择2张图片- that.data.banner.length,
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function(res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          console.log(res.tempFilePaths);
          if (res.tempFilePaths.count == 0) {
            return;
          }
          //上传图片
          var imgArrNow = that.data.banner;
          imgArrNow = imgArrNow.concat(res.tempFilePaths);
          that.setData({
            banner: imgArrNow
          })
          that.chooseViewShowBanner();
        }
      })
    } else {
      wx.showToast({
        title: '限制选择3个文件',
        icon: 'loading',
        duration: 1000
      })
    }
  },
 
  /** 删除图片Banner */
  deleteImvBanner: function(e) {
    var banner = this.data.banner;
    var itemIndex = e.currentTarget.dataset.id;
    banner.splice(itemIndex, 1);
    this.setData({
      banner: banner
    })
    //判断是否隐藏选择图片
    this.chooseViewShowBanner();
  },
 
 
  /** 是否隐藏图片选择Banner*/
  chooseViewShowBanner: function() {
    if (this.data.banner.length >= 3) {
      this.setData({
        chooseViewShowBanner: false
      })
    } else {
      this.setData({
        chooseViewShowBanner: true
      })
    }
  },
 
  /** 查看大图Banner */
  showImageBanner: function(e) {
    var banner = this.data.banner;
    var itemIndex = e.currentTarget.dataset.id;
    console.log("itemIndex:" + JSON.stringify(e))
    wx.previewImage({
      current: banner[itemIndex], // 当前显示图片的http链接
      urls: banner // 需要预览的图片http链接列表
    })
  },

   //查询设备信息··············
onQueryDeviceType:function(){
  var that = this
   wx.request({
     url: app.globalData.httpUrl+'iotapi/device_info?deviceid='+that.data.deviceId, //仅为示例，并非真实的接口地址
     method: 'GET',
     header: {
       'content-type': 'application/json', // 默认值
       'sessionToken': app.globalData.token//读取cookie // 默认值
     },
     success(res) {
       var mType = '';
       if( res.statusCode == 200){
       
         if(  res.data.status == 'ONLINE' ){
           mType = "在线"
         }else{
           mType = "离线"
         }
         var role = '';
         for( var key in res.data.ACL ){
           console.log('-----'+ key ? key.substr(5):'')
           role = key ? key.substr(5):''
         }
         that.setData({
           deviceItem:res.data
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
   * 上传图片
   */
  onUpImg:function(){

    var that = this 
   
    wx.uploadFile({
      //url: app.globalData.httpUrl+'dgiotproxy/shuwa_file/group1/upload',
      url:'https://flow.hzmctech.com/group1/upload',
      filePath:that.data.banner[that.data.upImgNum] + "",
      auth_token: app.globalData.token,
      header: {
        "Content-Type": "multipart/form-data",
        'accept': 'application/json',
        'sessionToken': app.globalData.token//读取cookie // 默认值
      },
      name: 'file',
      success: function(res) {      
        if( res.statusCode == 200 ){
          that.data.upImgNum++;
          that.data.photo.push(res.data)
          if( that.data.upImgNum < that.data.banner.length ){
          that.onUpImg()
          }else{
            that.onOrder()
        console.log( that.data.photo)
          }
        }                                         
      }
    })

  },

  /**
   * 提交工单
   */
  onOrder:function(){
    wx.showLoading()
    var that = this;
  
    if( that.data.banner.length > 0 && that.data.upImgNum < that.data.banner.length){
      that.onUpImg()
    }else{
      var mData = {}
      var timestamp = Date.parse(new Date());  
      timestamp = timestamp / 1000;
      mData.number = timestamp+""
      mData.type =  that.data.orderType;
      mData.ACL = {}
      var str1 = app.globalData.info.objectId
      var str2 = 'role:'+app.globalData.info.roles[0].name
      mData.ACL[str1] = {"read":true,"write":true}
      mData.ACL[str2] = {"read":true,"write":true}
      console.log( mData.ACL )
//       const setAcl = {}
// setAcl['*'] = {
//   read: true,
//   write: true,
// }
//mData.ACL = setAcl

      //mData.product = that.data.deviceItem.product

      var infoItem = {}
      infoItem.photo = that.data.photo
      var timelineList = []
      var timeItem={}
      timeItem.timestamp = util.formatTime(new Date());
      timeItem.h4='生成工单'
      timeItem.p= app.globalData.info.nick +' 新建工单 '
      timelineList.push (timeItem)
      infoItem.timeline = timelineList
      infoItem.description = that.data.memo
      infoItem.step1 = {}
      infoItem.step2 = {}
      infoItem.step3 = {}
      infoItem.step4 = {}
      
      infoItem.productid = that.data.productid
      infoItem.productname = that.data.deviceProduct
      infoItem.devicename = that.data.deviceName
      infoItem.deviceid = that.data.deviceId
      infoItem.createdname = app.globalData.info.nick
      infoItem.createdphone = app.globalData.info.phone
      infoItem.receiveusername = ''
      infoItem.receiveuseid = ''
      infoItem.receiveuserphone = ''

      var deviceItem = {}
      deviceItem.objectId = that.data.deviceId
      deviceItem.__type = "Pointer"
      deviceItem.className = "Device"
      mData.device = deviceItem
      mData.info = infoItem
      console.log(mData)
      wx.request({
        url: app.globalData.httpUrl+'iotapi/classes/Maintenance', 
        data: mData,
        method: 'POST',
        header: {
          'content-type': 'application/json', // 默认值
          'sessionToken': app.globalData.token//读取cookie // 默认值
        },
        success(res) {
          wx.hideLoading()
          if( res.statusCode == 201 ){
            setTimeout(item => {
              wx.navigateBack({
               delta: 1 //返回上一级页面
              })
             },2000)
            wx.showToast({
              title: '创建工单成功',
              icon: 'success',
              duration: 2000
            })
          }else{
            that.setData({
              upImgNum:0
            })
            wx.showToast({
              title: '创建工单失败',
              icon: 'error',
              duration: 2000
            })
          }
          }
        })
    }
  }
})