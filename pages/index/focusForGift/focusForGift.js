
var app=getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    qwe:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // function sortNumber(a, b) {
    //   return a - b
    // }

    // sort()排序函数
    var arr = new Array(6)
    arr[0] = "10"
    arr[1] = "5"
    arr[2] = "40"
    arr[3] = "25"
    arr[4] = "1000"
    arr[5] = "1"
    function sort_number(a,b){
      if(a-b>0){
        return 1;
      }else{
        return -1
      }
    }
    console.log(arr.sort());
    console.log(arr.sort(sort_number))

    // ES6箭头函数 无形参
    var myfuc=()=>{
      console.log('1')
    }
    myfuc()

    // ES6箭头函数 有形参 返回对象的时候用小括号包裹起来 因为大括号被占用了
    var myfuc = (a,b) => {
      return ({
        sum:a+b,
        sub:a-b
      })
    }

    console.log(myfuc(1,1))

    // ES6箭头函数 sort排序
    var arr_2 =[1, 9, 2, 4, 3, 8]
    // var sort_num=(a,b)=>{
    //   if(a-b>0){
    //     return 1
    //   }else{
    //     return -1
    //   }
    // }
    // console.log(arr_2.sort(sort_num))
    var arr_3 = [15, 9, 2, 4, 3, 8].sort((a, b) => {
      if (a - b > 0) {
        return 1
      } else {
        return -1
      }
    })
    console.log(arr_3)
    




    var qwe=this.data.qwe
    setInterval(function(){
      qwe+=0.1;
      // console.log(qwe)
    // 页面渲染完成  
    var cxt_arc = wx.createCanvasContext('canvasArc');//创建并返回绘图上下文context对象。  
    cxt_arc.setLineWidth(6);
    cxt_arc.setStrokeStyle('#d2d2d2');
    cxt_arc.setLineCap('round')
    cxt_arc.beginPath();//开始一个新的路径  
            // 圆心坐标 圆半径  圆周起始位置 Math.PI*2 为正圆弧长 false为顺时针
    cxt_arc.arc(106, 106, 100, 0, 2 * Math.PI, false);//设置一个原点(106,106)，半径为100的圆的路径到当前路径  
    cxt_arc.stroke();//对当前路径进行描边  

    cxt_arc.setLineWidth(6);
    cxt_arc.setStrokeStyle('#3ea6ff');
    cxt_arc.setLineCap('round')
    cxt_arc.beginPath();//开始一个新的路径  
    cxt_arc.arc(106, 106, 100, 0, Math.PI * qwe, false);
    cxt_arc.stroke();//对当前路径进行描边  

    cxt_arc.draw();

    }, 300)
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
