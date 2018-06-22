
var app=getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 创建一个canvas绘图上下文CanvasContext
        // const pen = wx.creatCanvasContext('my_canvas')
    // 描述在Canvas中绘制的内容
        // pen.setFillStyle('red');
        // pen.fillRect(10, 10, 150, 75);
      // 绘制
        // pen.draw()
    
  }, 
  canvas: function () {
    var cxt_arc = wx.createCanvasContext('canvasArc'); //创建并返回绘图上下文context对象。 


    cxt_arc.setLineWidth(6);
    cxt_arc.setStrokeStyle('#FFAB50');
    cxt_arc.setLineCap('round')
    cxt_arc.beginPath(); //开始一个新的路径 
    cxt_arc.arc(106, 114, 29, -Math.PI * this.data.step, Math.PI * 1.5, false);
    cxt_arc.stroke(); //对当前路径进行描边 

    cxt_arc.draw();

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
    
  }
})