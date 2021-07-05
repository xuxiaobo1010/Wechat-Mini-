// pages/home/home.js
var wxCharts = require('../../utils/wxcharts.js');
var ringChart = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nunBerZ:7,
    imgUrls: [
      'https://gw.alicdn.com/tfs/TB1KE6rkwoQMeJjy1XaXXcSsFXa-440-180.jpg',
      'https://gtd.alicdn.com/tfscom/TB1gotjX21TBuNjy0Fjwu1jyXXa',
      'https://gtd.alicdn.com/tfscom/TB1KSusKeOSBuNjy0FdSuvDnVXa'
      ],
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

  },

  onReady: function (e) {
    var that = this;
    ringChart = new wxCharts({
        animation: true,
        canvasId: 'ringCanvas',
        type: 'ring',
        extra: {
            ringWidth: 8,
            pie: {
                offsetAngle: 45
            }
        },
        title: {
            name: '设备总数',
            color: '#000000',
            fontSize: 11
        },
        subtitle: {
            name: '10',
            color: '#000000',
            fontSize: 25
        },
        series: [{
            name: '在线数',
            data: that.data.nunBerZ,
            color:'#2FC589',
            stroke: false
        }, {
            name: '离线数',
            data: 3,
            color:'#e44d44',
             stroke: false
        }, {
            name: '报警数',
            data: 1,
            color:'#99a3bb',
             stroke: false
        }],
        disablePieStroke: true,
        width: 130,
        height: 130,
        dataLabel: false,
        legend: false,
        background: '#f5f5f5',
        padding: 0,

    });
    ringChart.addEventListener('renderComplete', () => {
        console.log('renderComplete');
    });
    setTimeout(() => {
        ringChart.stopAnimation();
    }, 500);
},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

   /**
    * 跳转到添加设备
    */
   onAddDevice:function(){
    wx.navigateTo({
        url: '../../pages/addDevice/addDevice'
      })
   },

   /**
    * 跳转到地图
    */
   onMap:function(){
    wx.navigateTo({
        url: '../../pages/map/map'
      })
   },

   /**
    * 跳转到用户管理
    */
   onUser:function(){
    wx.navigateTo({
        url: '../../pages/userList/userList'
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