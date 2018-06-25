//logs.js
const util = require('../../utils/util.js')


Page({
  data: {
    lock: false,
    k:0,
    // 游戏结束 遮罩层唤醒
    showGift: false,
    
    // 这个是canvas变量
    st:0,

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
    selected: '',
    //这个是绘制canvas的定时器
    time: ''
  },
  onLoad: function () {
    // wx.clearStorageSync('key')
    // console.log('onload加载完毕' + this.data.k++)
    // 获取缓存
    var key=wx.getStorageSync('key')
    //获取来自首页缓存的玩家金币数量
    var p = key.money_num
    //获取来自首页缓存的玩家关卡数量
    var j = key.number_gk
    
    // 将缓存数据绑定到data
    this.setData({ 
      // 财产 关数 缓存'key'对象体 勾叉图png隐藏
      property:p,
      ji:j,
      key:key,
      hide: true,
      lock:false
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
      var step = parseFloat(this.data.step);
      var inte = parseFloat(this.data.interval);
      var step = Math.PI * 20 / inte;
      var st=this.data.st;
      var that=this;

      this.data.time =setInterval(function () {

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
          // 时间到 金币-10
          var pro = parseFloat(that.data.property);
          pro -= 10;
          that.setData({
            // 函数截留 (时间到 无法答题)
            lock: false,
            // 设置财产变量
            property: pro
          })
          // 更新缓存
          that.data.key.money_num = pro;
          wx.setStorageSync('key', that.data.key)
          // 重新赋值canvas变量
          st=0;
        }

      }, 10)
      


      // 游戏失败
      if (this.data.property <= 0) {
        // 重新设置缓存
        // this.data.key.money_num = pro;
        // this.data.key.number_gk = guanqia;
        // wx.setStorageSync('key', this.data.key)

        // 触发定时器 延时
        var that = this;
        setTimeout(function () {
          that.setData({
            showGift: true
          })
        }, 1000)

      }

  },
  // 事件处理函数


  // 游戏
  // 玩家答题
  choose: function (event) {
    var that=this;
    //玩家做出选择后 清除定时器 倒计时更新重启 (且无法选择其他项?)
    clearInterval(this.data.time)
    this.setData({
      time:''
    })

    // 节流防止二次点击
    if(this.data.lock){
      return
    } else {

    // 获取玩家财产 property
    var pro = parseFloat(this.data.property);
    // 获取玩家闯关关卡数 ji
    var guanqia = parseFloat(this.data.ji);
    // 获取用户选择下标ID
    var id= event.currentTarget.dataset.option_id;
    // 勾叉图片加载
    this.setData({
      selected: id,
      hide: false,
      lock:true
    })
    //假设后台传来的id为0;

    if (id === 0) {
        // 答案正确

      pro+=100;
      guanqia++;
      this.setData({
        judge: true,
        property: pro,
        ji: guanqia,
      })
      // 重新设置缓存
      this.data.key.money_num = pro;
      this.data.key.number_gk = guanqia;
      wx.setStorageSync('key', this.data.key)

      // 刷新页面更新选项和题目
      setTimeout(function () {
        that.onLoad()
      },2000)

    } else {
        // 答案错误

      pro -= 200;
      this.setData({
        judge: false,
        property: pro,
      })
      // 重新设置缓存
      this.data.key.money_num = pro;
      this.data.key.number_gk = guanqia;
      wx.setStorageSync('key', this.data.key)

      //玩家做出选择后 清除定时器 倒计时更新重启 (且无法选择其他项?)
      clearInterval(this.data.time)

      // 刷新页面更新选项和题目
      setTimeout(function () {
        that.onLoad()
      }, 2000)

    };
    }
  },

  // 关注有好礼遮罩层 隐藏
  gift_hide: function () {
    this.setData({
      showGift: false
    })
    clearInterval(this.data.time)
        // 回到首页
        wx.navigateBack({

        })
  },

  // 分享得金币
  get_golds:function(){
    this.setData({
      property:2000
    })
    // 重新设置缓存
    this.data.key.money_num = this.data.property;
    // this.data.key.number_gk = guanqia;
    wx.setStorageSync('key', this.data.key)
  },

  //音乐播放  没得用??????????????????????????????????????????????????????????????????????????????
  music_play: function () {
    wx.playVoice({
      filePath: 'http://sc1.111ttt.com/2016/1/09/28/202280605509.mp3',
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