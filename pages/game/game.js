//logs.js
const util = require('../../utils/util.js')


Page({
  data: {
    key:{},
    logs: [],
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
  },
  choose: function (event) {
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
      wx.navigateBack({

      })
    };
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