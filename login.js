const { request } = require("./utils/request");

module.exports = function() {
  wx.checkSession({
    success: () => {
      wx.getStorage({
        key: "ACCESS_TOKEN",
        success: res => {
          const access_token = res && res.data;
          if (!access_token) {
            login.call(this);
          } else {
            if (this.loginReadyCallback) {
              this.loginReadyCallback(res);
            }
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
                if (this.loginReadyCallback) {
                  this.loginReadyCallback(res);
                }
              },
              fail: e => {
                console.log(e);
              }
            });
          })
          .catch(e => {
            console.log(e);
            if (this.loginErrorCallback) {
              this.loginErrorCallback(e);
            }
          });
      }
    });
  }
};
