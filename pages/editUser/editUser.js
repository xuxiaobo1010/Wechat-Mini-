// pages/addUser/addUser.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index:1000,
    options1: [],
    mNick:'',
    mPhone:'',
    mEmail:'',
    mUser:'',
    mPwd:'',
    mPwd2:'',
    mDepartment:'',
    title1:'',
    value1:[],
    userId:''
  },

  onOpen1:function() {
    this.setData({ visible1: true })
},
onClose1:function(){
  this.setData({ visible1: false })
},

onChange1(e) {
 // this.setData({ title1: e.detail.options.map((n) => n.label).join('/') })
 this.setData({
   title1:e.detail.options[e.detail.options.length - 1].label,
   mDepartment:e.detail.options[e.detail.options.length - 1].objectId
  })
  console.log('onChange1', e.detail.options[e.detail.options.length - 1].label)
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
      _this.setData({
        mNick:options.name,
        mPhone:options.phone,
        mEmail:options.email,
        mUser:options.username,
        userId:options.userId,
        title1:options.title1,
        department:options.title1Id
      })
    
   
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.onReqRole();
  },

  onReqRole:function(){
    var that = this;
    wx.request({
      url: app.globalData.httpUrl+'iotapi/roletree', 
      header: {
        'content-type': 'application/json', // 默认值
        'sessionToken': app.globalData.token//读取cookie // 默认值
      },
      success(res) {
       wx.hideLoading()
       var mTimeList = res.data.results;
       for (let i = 0; i < mTimeList.length ; i++){
          mTimeList[i].value = mTimeList[i].label
        }
       that.setData({
         options1:mTimeList
       })
      }
    })
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
  that.data.mNick = e.detail.value;
},

  /**
  * 获取输入信息
  */
 inputTilte2: function (e) {
  let that = this;
  that.data.mPhone = e.detail.value;
},

inputTilte3: function (e) {
  let that = this;
  that.data.mEmail = e.detail.value;
},
inputTilte4: function (e) {
  let that = this;
  that.data.mUser = e.detail.value;
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

  if( that.data.title1.trim().length == 0){
    that.anniu("请选择账号所属部门");
    return;
  }

  if (that.data.mNick.trim().length == 0) {
    that.anniu("请输入姓名");
    return;
  }

  if (that.data.mPhone.trim().length != 11) {
    that.anniu("请输入手机号");
    return;
  }

  if (that.data.mEmail.trim().length == 0) {
    that.anniu("请输入邮箱");
    return;
  }

  if (!(/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(that.data.mEmail))){
    that.anniu("请输入正确邮箱格式");
    return
    }
   

  if (that.data.mUser.trim().length == 0) {
    that.anniu("请输入账号");
    return;
  }
  
  wx.showLoading()
  //添加用户
  wx.request({
    url: app.globalData.httpUrl+'iotapi/classes/_User/'+that.data.userId, 
    method: 'PUT',
    data: {
      nick: that.data.mNick,
      phone: that.data.mPhone,
      email: that.data.mEmail,
      username: that.data.mUser,
      emailVerified:true,
      department: that.data.mDepartment,
    },
    header: {
      'content-type': 'application/json', // 默认值
      'sessionToken': app.globalData.token//读取cookie // 默认值
    },
    success(res) {
     wx.hideLoading()
     if( res.statusCode == 200 ){

     }else{
      wx.showToast({
        title: '修改信息失败',
        icon: 'error',
        duration: 2000
      })
     }
    },
    
  })

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