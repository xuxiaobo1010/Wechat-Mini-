// pages/addUser/addUser.js
const app = getApp()
import data from './data'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow:false,
    isReq:false,
    index:1000,
    options1: [],
    gwList:[],
    gwList2:[],
    index8:0,
    mNick:'',
    mPhone:'',
    mEmail:'',
    mUser:'',
    mPwd:'',
    mPwd2:'',
    title1:'',
    mDeqName:'',
    mDepartment:'',
    value1:[]
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
    if( options.type == 1 ){
      wx.setNavigationBarTitle({
        title: '添加用户' 
      })
    }else{
      wx.setNavigationBarTitle({
        title: '编辑用户' 
      })
      _this.setData({
        mNick:options.name,
        mPhone:options.phone
      })
    }
   
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.onReqRole();
    this.onGwList();
  },

  //获取岗位模板
  onGwList:function(){
   
    var that = this;
    wx.request({
      url: app.globalData.httpUrl+'iotapi/classes/Dict?order=createdAt&limit=10&skip=0&keys=key&where=%7B%22data.level%22%3A%7B%22%24gt%22%3A0%7D%2C%22type%22%3A%22roletemp%22%7D', 
      header: {
        'content-type': 'application/json', // 默认值
        'sessionToken': app.globalData.token//读取cookie // 默认值
      },
      success(res) {
       wx.hideLoading()
       var mList = res.data.results;
       var mData = []
       for (let i = 0; i < mList.length ; i++){
        mData.push(mList[i].key)
        }
       that.setData({
        gwList:mData,
        gwList2:res.data.results,
       })
      }
    })
  },

  onShowView:function(){
    var that = this;
    var mS = that.data.isShow
    that.setData({
      isShow:!mS
    })
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
 inputTilte10: function (e) {
  let that = this;
  that.data.mDeqName = e.detail.value;
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
inputTilte5: function (e) {
  let that = this;
  that.data.mPwd = e.detail.value;
},
inputTilte6: function (e) {
  let that = this;
  that.data.mPwd2 = e.detail.value;
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
   * 新增部门
   */
  onAddDeq:function(){
    var that = this;

  if( that.data.title1.trim().length == 0){
    that.anniu("请选择账号所属部门");
    return;
  }

    if( that.data.mDeqName.trim().length == 0){
      that.anniu("请输入部门名称");
      return;
    }

    wx.showLoading({
      title: '请求中',
    })

    wx.request({
      url: app.globalData.httpUrl+'iotapi/role', 
      method:'POST',
      data:{
        depname:that.data.mDeqName,
        desc:'Project',
        name:that.data.mDeqName,
        parent:that.data.mDepartment,
        tempname:that.data.gwList[that.data.index8]
      },
      header: {
        'content-type': 'application/json', // 默认值
        'sessionToken': app.globalData.token//读取cookie // 默认值
      },
      success(res) {
      
        if( res.statusCode == 200){
          that.setData({
            mDepartment:res.data.objectId,
            isReq:true
          })
          that.onSaveUser()
        }else{
          wx.hideLoading()
        }
      }
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
  if (that.data.mPwd.trim().length == 0) {
    that.anniu("请输入密码");
    return;
  }

  if (that.data.mPwd2.trim().length == 0) {
    that.anniu("请输入确认密码");
    return;
  }

  if( that.data.mPwd.trim() != that.data.mPwd2.trim()  ){
    that.anniu("两次密码不一致，请检查");
    return;
  }


  //判断是否有新增部门这一步，在判断部门是否新增成功
  if( that.data.isShow && that.data.isReq == false){
    that.onAddDeq()
    return
  }
  
  wx.showLoading()

  var mTag = app.globalData.tag
  mTag.wechat = {openid: ""}
  //添加用户
  wx.request({
    url: app.globalData.httpUrl+'iotapi/user', 
    method: 'POST',
    data: {
      nick: that.data.mNick,
      phone: that.data.mPhone,
      email: that.data.mEmail,
      username: that.data.mUser,
      password: that.data.mPwd,
      tag: mTag,
      emailVerified:true,
      department: that.data.mDepartment,
    },
    header: {
      'content-type': 'application/json', // 默认值
      'sessionToken': app.globalData.token//读取cookie // 默认值
    },
    success(res) {
     wx.hideLoading()
     if( res.statusCode != 200){
      wx.showToast({
        title: '添加用户失败',
        icon: 'error',
        duration: 2000
      })
     }else if(res.data.result){
      setTimeout(item => {
        wx.navigateBack({
         delta: 1 //返回上一级页面
        })
       },2000)
      wx.showToast({
        title: '添加用户成功',
        icon: 'success',
        duration: 2000
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
   * 选择岗位
   */
  bindPickerChange5: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index8: e.detail.value,
    })
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