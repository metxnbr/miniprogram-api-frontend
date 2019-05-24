const { request } = require("./utils/request");
const { ACCESS_TOKEN } = require("./constants");

function setLoginReadyCallback({ res, status }) {
  this.globalData.loginStatus = status;
  if (this.loginReadyCallback) {
    this.loginReadyCallback({res, status});
  }
}

module.exports = function() {
  wx.checkSession({
    success: () => {
      wx.getStorage({
        key: ACCESS_TOKEN,
        success: res => {
          const access_token = res && res.data;
          if (!access_token) {
            login.call(this);
          } else {
            setLoginReadyCallback.call(this, { res, status: "logined" });
          }
        },
        fail: () => {
          login.call(this);
        }
      });
    },
    fail: () => {
      login.call(this);
    }
  });

  function login() {
    wx.login({
      success: res => {
        const url = "/onLogin";

        const { code } = res;

        const data = {
          code
        };

        const options = {
          data,
          method: "POST"
        };

        request(url, options)
          .then(res => {
            const { access_token } = (res && res.data) || {};
            wx.setStorage({
              key: "ACCESS_TOKEN",
              data: access_token,
              success: res => {
                setLoginReadyCallback.call(this, { res, status: "logined" });
              },
              fail: e => {
                setLoginReadyCallback.call(this, {
                  res,
                  status: "not-logined"
                });
              }
            });
          })
          .catch(e => {
            setLoginReadyCallback.call(this, { res, status: "not-logined" });
          });
      }
    });
  }
};
