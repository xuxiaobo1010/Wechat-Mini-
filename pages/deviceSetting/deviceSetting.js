// pages/deviceSetting/deviceSetting.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    deviceId:'',
    paramsList:[],
    productItem:{},
    deviceItem:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      deviceId : options.deviceId
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    that.setData({
      options1:app.globalData.departmentList
    })
    this.onQueryDeviceType();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  onChange1(e) {
    // this.setData({ title1: e.detail.options.map((n) => n.label).join('/') })
    this.setData({
      title1:e.detail.options[e.detail.options.length - 1].label,
     })
     console.log('onChange1', e.detail.options[e.detail.options.length - 1].label)
    },
  /**
   * 所属部门
   */
  onOpen1:function() {
    this.setData({ visible1: true })
  },
  onClose1:function(){
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确定将此设备迁移到'+that.data.title1+'部门吗？',
      success (res) {
        if (res.confirm) {
         that.onPutDevice();
        } else if (res.cancel) {
          that.setData({ visible1: false })
        }
      }
    })
  },

  goWork:function(){
    var that =this;
    wx.navigateTo({
      url: '../../pages/goWork/goWork?deviceName='+that.data.deviceName+'&deviceType='+that.data.deviceProduct
      +'&deviceId='+that.data.deviceId+'&productid='+that.data.productid
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

  },


  //迁移设备
  onPutDevice:function(){
    wx.showLoading()
    var that = this;
    
    var mDataStr = '{"ACL":{"role:'+ that.data.title1 +'":{"read":true,"write":true}},"detail":{"factory":"'+that.data.title1+'"}}'
    wx.request({
      url: app.globalData.httpUrl+'iotapi/classes/Device/'+that.data.deviceId, //仅为示例，并非真实的接口地址
      method: 'PUT',
      data: mDataStr,
      header: {
        'content-type': 'application/json', // 默认值
        'sessionToken': app.globalData.token//读取cookie // 默认值
      },
      success(res) {
        wx.hideLoading()
          if( res.statusCode == 200 ){
            wx.showToast({
              title: '迁移设备成功',
              icon: 'success',
              duration: 2000
            })
            that.setData({
              visible1:false,
              deviceCompany:that.data.title1
            })
          }else{
            wx.showToast({
              title: '迁移设备失败',
              icon: 'error',
              duration: 2000
            })
          }
      }
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
          deviceType:mType,
          deviceProduct:res.data.productname,
          productid:res.data.product.objectId,
          deviceName:res.data.name,
          deviceCode:res.data.devaddr,
          deviceCompany:role,
          deviceAddress:res.data.detail.address,
          paramsList:res.data.params,
          productItem:res.data.product,
          detailItem:res.data.detail,
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
   * 选择
   */
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e)
    var that = this;
    var mList = that.data.paramsList
    var mIndex = e.target.dataset.index
    mList[mIndex].value = e.detail.value
    that.setData({
      paramsList:mList
    })
  },

  bindinput:function(e){
    console.log('输入框，携带值为', e)
    var that = this;
    var mList = that.data.paramsList
    var mIndex = e.target.dataset.index
  
    mList[mIndex].value = e.detail.value
    that.setData({
      paramsList:mList
    })
  },

  /**
   * 修改设备
   */
  onSaveDevice:function(){
    var mItem = {}
    var that = this
    mItem.name = that.data.deviceName
    mItem.devaddr = that.data.deviceCode
    var productItem = that.data.productItem
    var detailItem = that.data.detailItem
    var location = that.data.deviceItem.location
    var basedataItem = that.data.deviceItem.basedata
    var mList = that.data.paramsList
    for (const key in mList) {
      var mKey = mList[key].identifier
      basedataItem[mKey] = mList[key].value
    }

    mItem.product = productItem
    mItem.detail = detailItem
    mItem.location = location
    mItem.basedata= basedataItem

    console.log(mItem)
    wx.showLoading({
      title: '正在保存',
    })
    wx.request({
      url: app.globalData.httpUrl+'iotapi/classes/Device/'+that.data.deviceId, //仅为示例，并非真实的接口地址
      method: 'PUT',
      data:mItem,
      header: {
        'content-type': 'application/json', // 默认值
        'sessionToken': app.globalData.token//读取cookie // 默认值
      },
      success(res) {
        wx.hideLoading()
        if( res.statusCode == 200){
          wx.showToast({
            title: '保存成功',
            icon: 'success',
            duration: 2000
          })
        }else{
          wx.showToast({
            title: '保存失败',
            icon: 'error',
            duration: 2000
          })
        }
      }
    })

  }

})