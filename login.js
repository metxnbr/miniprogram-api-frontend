const { request } = require("./utils/request");
const tokenStorage = require("./utils/tokenStorage");

function setLoginReadyCallback({ res, status }) {
  this.globalData.loginStatus = status;
  if (this.loginReadyCallback) {
    this.loginReadyCallback({ res, status });
  }
}

module.exports = function() {
  wx.checkSession({
    success: () => {
      tokenStorage
        .getStorage()
        .then(res => {
          const access_token = res && res.data;
          if (!access_token) {
            login.call(this);
          } else {
            setLoginReadyCallback.call(this, { res, status: "logined" });
          }
        })
        .catch(e => {
          login.call(this);
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
            if (!access_token) {
              throw new Error("登录失败");
            }

            tokenStorage
              .setStorage(access_token)
              .then(res => {
                setLoginReadyCallback.call(this, { res, status: "logined" });
              })
              .catch(e => {
                setLoginReadyCallback.call(this, {
                  res: e,
                  status: "not-logined"
                });
              });
          })
          .catch(e => {
            setLoginReadyCallback.call(this, { res, status: "not-logined" });
          });
      }
    });
  }
};
