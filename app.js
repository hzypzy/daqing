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

        this._request('token/user', code, "POST",function(){})

      }
    })
  },

  globalData: {

  },

  _request: function (url,data,requestType,success){
    wx.request({
      url: 'https://chz.dundashi.com.cn/index.php/api/v1/' + url,
      data: {
        data:data
      },
      header: {
        'content-type': requestType == 'POST' ?
          'application/x-www-form-urlencoded' : 'application/json'
      }, // 设置请求的 header
      method: requestType,
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        success(res)
      },
      fail: function (res) {
        console.log(res)
      },
      complete: function (res) {
        console.log(res)
      }
    })
  }
})
module.exports = {
  _request: App._request
}