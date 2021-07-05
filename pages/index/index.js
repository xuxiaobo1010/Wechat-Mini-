// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },

  onLoad() {
   this.onLogin()
  },

  onLogin:function(){
    wx.login({
      success (res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'http://1.117.219.33/iotapi/wechat?jscode='+res.code,
            success(res) {
              console.log(res)
              if( res.statusCode != 200 ){
                setTimeout(function () {
                  wx.navigateTo({
                    url: '../../pages/login/login'
                  })
                }, 2000)
              }
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
 
})
