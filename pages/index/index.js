//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    // 防止二次点击节流
    lock:false,
    g:false,
    // 金币数
    money_num:'0',
        // 等级徽章图0',
    // 等级徽章图
    lv_url:'1',
    // 等级数字
    lv_num:'1',
    // 已经挑战的关卡数
    number_gk:'1',
    // 用户信息
    userInfo: {},
    // 遮罩层唤醒
    showGift: false,
    // 开始挑战触摸事件信号量
    ishover:false,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function () {
    // 获取全局数据
    // var that=this
    // app._request('接口', 'data', 'requestType',function(){

    // })

    var that=this;
    setTimeout(function(){
      that.setData({
        g:true
      })
    },3000)
    var key=wx.getStorageSync('key');
    if (!key) {
      // 设置缓存
      wx.setStorageSync('key', {
        // 金币数
        money_num: this.data.money_num,
        // 等级徽章图
        lv_url: this.data.lv_url,
        // 等级数字
        lv_num: this.data.lv_num,
        // 已经挑战的关卡数
        number_gk: this.data.number_gk
      })
    }

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
    
    var key=wx.getStorageSync('key')
    if(key){
      this.setData({
        // 设置金币数量到data
        money_num:key.money_num,
        // 设置已挑战关卡数目到data
        number_gk: key.number_gk,
        // 设置等级数目到data
        lv_num: key.lv_num,
        // 设置等级图片路径到data
        lv_url: '../../img/lv (' + this.data.lv_num + ').png'
      })

    }
   

  },

  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onShareAppMessage: function () {

  },
  onHide:function(){
    this.setData({
      lock:false
    })
  },

  //事件处理函数
  aa: function (e) {
    console.log(e)
  },
  // 最新排行榜top100 跳转
  new_rank: function () {
    if (this.data.lock) {
      return
    } else {
      this.setData({
        lock: true
      })
      wx.navigateTo({
        url: '../rank/rank'
      })
    }
  },
  // 好友PK榜 跳转
  friend_pk_rank: function () {
    if (this.data.lock) {
      return
    } else {
      this.setData({
        lock: true
      })
      wx.navigateTo({
        url: '../friend_pk/frd_pk'
      })
    }
  },
  // 开始游戏 跳转
  game_start: function () {
    if (this.data.lock) {
      return
    } else {
      this.setData({
        lock: true
      })
      wx.navigateTo({
        url: '../game/game'
      })
    }
    // this.setData({
    //   ishover: false
    // })
  },
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  // 关注有好礼遮罩层 唤醒
  gift_show: function () {
    this.setData({
      showGift: true
    })
  },
  // 关注有好礼遮罩层 隐藏
  gift_hide: function () {
    this.setData({
      showGift: false
    })
  },
  hover: function () {
    this.setData({
      ishover: true
    })
  },
})
