//app.js
App({

  data:{
    flag:false
  },
  onLaunch: function () {
    
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        var code = res.code;
        wx.request({
          url: 'https://chz.dundashi.com.cn/index.php/api/v1/token/user', //仅为示例，并非真实的接口地址
          method: "POST",
          data: {
            x: code
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            console.log(res)
          },
          fail: function (res) {
            console.log(res)
          }
        })
      }
    })
  },

  globalData: {
    userInfo: null
  }
})