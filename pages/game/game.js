//logs.js
const util = require('../../utils/util.js')


Page({
  data: {
    key:{},
    logs: [],
    // 玩家财产
    property:'0',
    // 第几题
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
    this.setData({ 
      property:p,
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
    console.log(this.data.property)
    var pro = parseFloat(this.data.property);
    // 获取用户选择下标ID
    var id= event.currentTarget.dataset.option_id;
    console.log(id);
    this.setData({
      selected: id,
      hide:false
    })
    //假设后台传来的id为0;
    if (id === 0) {
      pro+=10;
      this.setData({
        judge: true,
        property:pro
      })

    } else {
      this.setData({
        judge: false
      })
      // 重新设置缓存
      this.data.key.money_num=pro;
      console.log(pro)
      wx.setStorageSync('key', this.data.key)
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