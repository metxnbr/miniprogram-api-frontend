//index.js
const login = require("../../login");
const { ACCESS_TOKEN } = require("../../constants");
const { NAMES, FNS } = require("./fns/index");
const { NOTHING } = NAMES;
const KEYS = Object.keys(NAMES);

const LIST = KEYS.filter(item => item !== NOTHING).map(item => ({
  name: item,
  value: NAMES[item],
  isFetching: false,
  result: "",
  error: ""
}));

//获取应用实例
const app = getApp();

Page({
  data: {
    motto: "Hello World",
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse("button.open-type.getUserInfo"),
    isFetching: false,
    list: LIST,
    name: "",

    loginStatus: "loading"
  },

  reLogin: function() {
    wx.removeStorage({
      key: ACCESS_TOKEN,
      success: res => {
        this.setData({
          loginStatus: "loading"
        });
        login.call(app);
      }
    });
  },

  radioChange(e) {
    const { value } = e.detail;
    this.setData({
      name: value
    });
  },

  runFn: function() {
    const { name, isFetching } = this.data;
    if (isFetching) return;
    const fn = FNS[name] || FNS[NOTHING];

    fn.call(this, name);
  },

  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: "../logs/logs"
    });
  },
  onLoad: function() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      });
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        });
      };
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo;
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          });
        }
      });
    }

    const globalLoginStatus = app.globalData.loginStatus;
    if (globalLoginStatus) {
      this.setData({
        loginStatus: globalLoginStatus
      });
    } else {
      app.loginReadyCallback = ({ status }) => {
        this.setData({
          loginStatus: status
        });
      };
    }
  },
  getUserInfo: function(e) {
    console.log(e);
    app.globalData.userInfo = e.detail.userInfo;
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    });
  }
});
