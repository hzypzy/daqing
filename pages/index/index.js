//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    // 金币数
    money_num:'',
    // 等级徽章图
    lv_url:'',
    // 等级数字
    lv_num:'',
    // 已经挑战的关卡数
    number_gk:'',
    // 用户信息
    userInfo: {},
    // 遮罩层唤醒
    showGift: false,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  gift_live:function(){
    this.setData({
      showGift: !showGift
    })
  },
  new_rank: function () {
    wx.navigateTo({
      url: '../rank/rank'
    })
  },
  friend_pk_rank:function(){
    wx.navigateTo({
      url: '../friend_pk/frd_pk'
    })
  },
  game_start:function(){
    wx.navigateTo({
      url: '../game/game',
    })
  },
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  gift_show:function(){
    this.setData({
      showGift: true
    })
  },
  gift_hide: function () {
    this.setData({
      showGift: false
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      // console.log(button.open - type.getUserInfo)
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        console.log(res.userInfo)
        console.log(typeof (res.userInfo))
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  onShow: function () {
    this.setData({
      // 设置金币数量到data
      money_num:'888888',
      // 设置已挑战关卡数目到data
      number_gk: '0',
      // 设置等级数目到data
      lv_num:'一',
      // 设置等级图片路径到data
      lv_url: 'data:image/png;base64,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'
    })
   

  },

  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
