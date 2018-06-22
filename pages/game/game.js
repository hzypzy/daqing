//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: [],
    // 判断对错信号量
    judge:'',
    // 呼出勾叉图片信号量
    hide:true,
    isclick: false,
    isclick_2: false
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  },
  shareToFriend:function(){
  },
  shareToTeam:function(){
  },
  choose:function(){
    this.setData({
      judge:true,
      hide:false
    })
  },
  click_bg: function () {
    this.setData({
      isclick:true
    })
  },
  click_bg_2: function () {
    this.setData({
      isclick_2: true
    })
  }
})
