// pages/addUser/addUser.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index:1000,
    array: ['美国', '中国', '巴西', '日本'],
    mName:'',
    mPhone:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    if( options.type == 1 ){
      wx.setNavigationBarTitle({
        title: '添加用户' 
      })
    }else{
      wx.setNavigationBarTitle({
        title: '编辑用户' 
      })
      _this.setData({
        mName:options.name,
        mPhone:options.phone
      })
    }
   
  
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
  that.data.mName = e.detail.value;
},

  /**
  * 获取输入信息
  */
 inputTilte2: function (e) {
  let that = this;
  that.data.mPhone = e.detail.value;
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
  * 保存
  */
 onSaveUser:function(){
  var that = this;

  if( that.data.index == 1000){
    that.anniu("请选择账号所属部门");
    return;
  }

  if (that.data.mName.trim().length == 0) {
    that.anniu("请输入姓名");
    return;
  }

  if (that.data.mPhone.trim().length != 11) {
    that.anniu("请输入手机号");
    return;
  }
 },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

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