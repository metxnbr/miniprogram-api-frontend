const { request } = require("./utils/request");

module.exports = function() {
  wx.checkSession({
    success: () => {
      console.log("checkSession success");
      wx.getStorage({
        key: "ACCESS_TOKEN",
        success: res => {
          const access_token = res && res.data;
          if(!access_token) {
            login();
          }
        },
        fail: () => {
          login();
        }
      });
    },
    fail: () => {
      login();
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
              success: () => {}
            });
          })
          .catch(e => {
            console.log(e);
          });
      }
    });
  }
};
