//logs.js
const util = require('../../utils/util.js')


Page({
  data: {
    lock: false,
    // 遮罩层唤醒
    showGift: false,
    key:{},
    logs: [],
    // 倒计时 时间
    interval:'10000',
    // 进度条步长
    
    // 玩家财产
    property:'',
    // 第几题 (三位数的时候结构会产生问题)
    ji:'1',
    // 判断对错信号量
    judge:'',
    // 呼出勾叉图片信号量 首次加载页面隐藏png
    hide:true,
    isclick: false,
    isclick_2: false,
    // 用于储存当前用户点击的event.currentTarget.dataset.option_id值
    selected:''
  },
  onLoad: function () {
    // 获取缓存
    var key=wx.getStorageSync('key')
    //获取来自首页缓存的玩家金币数量
    var p = key.money_num
    //获取来自首页缓存的玩家关卡数量
    var j = key.number_gk
    
    this.setData({ 
      property:p,
      ji:j,
      key:key
    
    })

    // 选项_数组 不能超过三项
    var options_content=[
      {
        hz_option:'粮',
        option_id:1
      },
      {
        hz_option: '凉',
        option_id: 2
      },
      {
        hz_option: '良',
        option_id: 3
      }
    ];
    this.setData({
      hz_options:options_content
    })

      //  倒计时canvas圆形进度条绘制
      // var step = parseFloat(this.data.step);
      var inte = parseFloat(this.data.interval);
      var step = Math.PI * 60 / inte;
      var st=0;
      var that=this;

      var time = setInterval(function () {

        // 外圈
        var cxt_arc = wx.createCanvasContext('canvasArc');//创建并返回绘图上下文context对象。  
        cxt_arc.setLineWidth(8);
        cxt_arc.setStrokeStyle('white');
        cxt_arc.setLineCap('round')
        cxt_arc.beginPath();//开始一个新的路径  
        // 圆心坐标 圆半径  圆周起始位置 Math.PI*2 为正圆弧长 false为顺时针
        cxt_arc.arc(38, 38, 31, 0, 2 * Math.PI, false);//设置一个原点(106,106)，半径为100的圆的路径到当前路径  
        cxt_arc.stroke();//对当前路径进行描边  
        // 内圈
        cxt_arc.setLineWidth(4);
        cxt_arc.setStrokeStyle('white');
        cxt_arc.setLineCap('round')
        cxt_arc.beginPath();//开始一个新的路径  
        cxt_arc.arc(38, 38, 27, 0, Math.PI * 2, false);
        cxt_arc.stroke();//对当前路径进行描边  

        // 内圈
        cxt_arc.setLineWidth(5);
        cxt_arc.setStrokeStyle('#F5AA4C');
        cxt_arc.setLineCap('round')
        cxt_arc.beginPath();//开始一个新的路径  
        cxt_arc.arc(38, 38, 30, 0,  Math.PI * 2, false);
        cxt_arc.stroke();//对当前路径进行描边  




        cxt_arc.setLineWidth(6);
        cxt_arc.setStrokeStyle('white');
        cxt_arc.setLineCap('round')
        cxt_arc.beginPath();//开始一个新的路径

        cxt_arc.arc(38, 38, 30, 0, st, false);
        cxt_arc.stroke();//对当前路径进行描边 
        cxt_arc.draw();

        st+=step;

        if (st >= 2 * Math.PI) {
          that.setData({
            lock: true
          })
          clearInterval(time)
        }

      }, 30)

  },
  // 事件处理函数

  // 玩家答题业务
  choose: function (event) {
    if(this.data.lock){
      return
    }else{

    // 获取玩家财产 property
    var pro = parseFloat(this.data.property);
    // 获取玩家闯关关卡数 ji
    var guanqia = parseFloat(this.data.ji);
    // 获取用户选择下标ID
    var id= event.currentTarget.dataset.option_id;
    this.setData({
      selected: id,
      hide:false
    })
    //假设后台传来的id为0;
    if (id === 0) {
      pro+=10;
      guanqia++;
      this.setData({
        judge: true,
        property: pro,
        ji: guanqia,
      })

    } else {
      this.setData({
        judge: false
      })
      // 重新设置缓存
      this.data.key.money_num = pro;
      this.data.key.number_gk = guanqia;
      wx.setStorageSync('key', this.data.key)
      // 触发定时器 延时
      var that=this;
      setTimeout(function () {

        that.setData({
        showGift: true
        })
        // 回到首页
        // wx.navigateBack({

        // })
      },1000)
    };
    }
  },

  // 游戏失败
  // 关注有好礼遮罩层 唤醒
  // gift_show: function () {
  //   this.setData({
  //     showGift: true
  //   })
  // },
  // 关注有好礼遮罩层 隐藏
  gift_hide: function () {
    this.setData({
      showGift: false
    })
        // 回到首页
        wx.navigateBack({

        })
  },

  onShareAppMessage: function () {

  }
})



    // this.setData({
    //   logs: (wx.getStorageSync('logs') || []).map(log => {
    //     return util.formatTime(new Date(log))
    //   })
    // })

  // shareToFriend:function(){
  // },
  // shareToTeam:function(){
  // },

  // click_bg: function () {
  //   this.setData({
  //     isclick:true
  //   })
  // },
  // click_bg_2: function () {
  //   this.setData({
  //     isclick_2: true
  //   })
  // }