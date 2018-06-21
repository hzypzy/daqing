
// 获取页面实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 我的排名
    my_ran_num:'undefined',
    // 我的金币
    my_money:'undefined',
    userInfo: {},
    hasUserInfo: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      // console.log(button.open - type.getUserInfo)
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        console.log(res.userInfo)
        console.log(typeof (res.userInfo))
        this.setData({
          userInfo: res.userInfo,
          lv_url: '',
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
    var posts_content = [
      {
        friend_rank_num: "1",
        friend_avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/SVV12e9CXBguwAqL3UupV1QZfibRejdlfQNibPPBFswoCIHNBqXN9ZTbx9WoTlz7iaYiaPOsoA8DEdiaNrmc9UvyhRQ/132',
        friend_nickName: 'zack',
        friend_money:'98765123456'

      },
      {
        friend_rank_num: "2",
        friend_avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/SVV12e9CXBguwAqL3UupV1QZfibRejdlfQNibPPBFswoCIHNBqXN9ZTbx9WoTlz7iaYiaPOsoA8DEdiaNrmc9UvyhRQ/132',
        friend_nickName: 'cloudofather',
        friend_money: '2654556'

      },
      {
        friend_rank_num: "3",
        friend_avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/SVV12e9CXBguwAqL3UupV1QZfibRejdlfQNibPPBFswoCIHNBqXN9ZTbx9WoTlz7iaYiaPOsoA8DEdiaNrmc9UvyhRQ/132',
        friend_nickName: 'jackkichen',
        friend_money: '47466'

      },
      {
        friend_rank_num: "4",
        friend_avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/SVV12e9CXBguwAqL3UupV1QZfibRejdlfQNibPPBFswoCIHNBqXN9ZTbx9WoTlz7iaYiaPOsoA8DEdiaNrmc9UvyhRQ/132',
        friend_nickName: 'coco',
        friend_money: '1216'

      },
      {
        friend_rank_num: "5",
        friend_avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/SVV12e9CXBguwAqL3UupV1QZfibRejdlfQNibPPBFswoCIHNBqXN9ZTbx9WoTlz7iaYiaPOsoA8DEdiaNrmc9UvyhRQ/132',
        friend_nickName: 'necnecnec',
        friend_money: '50'

      },
      {
        friend_rank_num: "6",
        friend_avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/SVV12e9CXBguwAqL3UupV1QZfibRejdlfQNibPPBFswoCIHNBqXN9ZTbx9WoTlz7iaYiaPOsoA8DEdiaNrmc9UvyhRQ/132',
        friend_nickName: 'lucylucyc',
        friend_money: '3'

      }
    ];
    this.setData({ posts_key: posts_content });

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