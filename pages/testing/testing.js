// pages/testing/testing.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgs: [
      "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Ffile02.16sucai.com%2Fd%2Ffile%2F2014%2F0829%2F372edfeb74c3119b666237bd4af92be5.jpg&refer=http%3A%2F%2Ffile02.16sucai.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg",
      "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F201609%2F26%2F20160926081306_GM2tv.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg","https://gimg2.baidu.com/image_search/src=http%3A%2F%2Ffile02.16sucai.com%2Fd%2Ffile%2F2014%2F0829%2F372edfeb74c3119b666237bd4af92be5.jpg&refer=http%3A%2F%2Ffile02.16sucai.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg",
      "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F201609%2F26%2F20160926081306_GM2tv.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg",
    ],
    videoList:[],
    direction: [{
      top: 10,
      left: 10
    }, {
      top: 30,
      left: 50
    }, {
      top: 60,
      left: 100
    }, {
      top: 150,
      left: 150
    }, {
      top: 200,
      left: 100
    }, {
      top: 250,
      left: 150
    },{
      top: 350,
      left: 100
    },{
      top: 400,
      left: 210
    }],
    top1: 10,
    left1: 10,
    top2:20,
    left2:80,
    start:{
      x:0,
      y:0
    },
    end:{
      x:0,
      y:0
    },
    current:0,
    isShow:false,
    isVideoShow:false,
  },
onShow:function(){
  var id = Math.floor(Math.random()*8);
  var vid = Math.floor(Math.random()*8);
   this.setData({
      top1:this.data.direction[id].top,
      left1:this.data.direction[id].left,
      top2:this.data.direction[vid].top,
      left2:this.data.direction[vid].left,
   })
  
},
handleShow(){
  this.setData({
    isShow:!this.data.isShow
  })
},
handleVideoShow(){
  this.setData({
    isVideoShow:!this.data.isVideoShow
  })
},
//上传视频
videoUpload(){
  console.log("111");
  
  var that = this
  wx.chooseVideo({
    sourceType: ['album','camera'],
    maxDuration: 60,
    camera: 'back',
    success(res) {
      console.log(res.tempFilePath);
      let videoList = that.data.videoList;
      videoList.push(res.tempFilePath);
      that.setData({
        videoList
      })
    }
  })
  // wx.chooseVideo({
  //   sourceType: ['album', 'camera'],
  //   maxDuration: 200,
  //   camera: 'back',
  //   success: function (res) {
  //     console.log("res",res);
      
  //     that.setData({
  //       video: res.tempFilePath,
  //       size: (res.size / (1024 * 1024)).toFixed(2)
  //     })
  //     // 调用上传接口
  //   }
  // })

},
//上传文件
upLoad(){
  let _this = this;
  wx.chooseImage({
    count: 1, // 默认9  
    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有  
    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
    success: function success(res) {
      console.log("res",res);
      
      wx.showToast({
        title: '正在上传...',
        icon: 'loading',
        mask: true,
        duration: 1000
      });
      // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片 
       let imgs = _this.data.imgs;
       imgs.push(...res.tempFilePaths)
       console.log(imgs);
       
      _this.setData({
        imgs
      });
      console.log(res.tempFilePaths);
    }
  });
  // wx.request({
  //   url: 'https://prod.dgiotcloud.com/group1/upload',
  //   method:'POST',
  //   data: {
  //     devaddr:that.data.codeValue,
  //     latitude: that.data.mLatitude,
  //     longitude: that.data.mLongitude,
  //     productid:that.data.deviceTypeList[that.data.idx].objectId
  //   },
  //   header: {
  //     'content-type': 'application/json',// 默认值
  //     'sessionToken': app.globalData.token//读取cookie // 默认值
  //   },
  // })
},
touchStart(e) {
  console.log(e)
  this.setData({
    "start.x": e.changedTouches[0].clientX,
    "start.y": e.changedTouches[0].clientY
  });
},
touchEnd(e) {
  let x = e.changedTouches[0].clientX;
  let y = e.changedTouches[0].clientY;
  this.setData({
    "end.x":x,
    "end.y":y
  })
   let turn =  this.getTouchData(this.data.end.x,this.data.end.y,this.data.start.x,this.data.start.y)
   console.log(turn);
   if(turn=="left"){
     let current = this.data.current;
     if(current<this.data.imgs.length-1){
       current++;
       this.setData({
         current
       })
       var id = Math.floor(Math.random()*8);
  var vid = Math.floor(Math.random()*8);
   this.setData({
      top1:this.data.direction[id].top,
      left1:this.data.direction[id].left,
      top2:this.data.direction[vid].top,
      left2:this.data.direction[vid].left,
   })
     }

   }else if(turn=="right"){
     let current = this.data.current;
     if(current>0){
      current--;
      this.setData({
        current
      })
      var id = Math.floor(Math.random()*8);
      var vid = Math.floor(Math.random()*8);
       this.setData({
          top1:this.data.direction[id].top,
          left1:this.data.direction[id].left,
          top2:this.data.direction[vid].top,
          left2:this.data.direction[vid].left,
       })
     }
   }
   
},
getTouchData(endX, endY, startX, startY){
  let turn = "";
  if (endX - startX > 50 && Math.abs(endY - startY) < 50) {      //右滑
    turn = "right";
  } else if (endX - startX < -50 && Math.abs(endY - startY) < 50) {   //左滑
    turn = "left";
  }
  return turn;
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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