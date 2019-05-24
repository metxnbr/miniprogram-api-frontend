const { requestAuth } = require("../../../utils/request");
const setList = require("./setList");

module.exports = function(name) {
  this.setData({
    isFetching: true,
    list: setList.apply(this, [
      name,
      {
        isFetching: true,
        error: "",
        result: ""
      }
    ])
  });

  const app = getApp();

  const url = "/user";
  const { rawData, signature } = app.globalData.userRes;

  const data = {
    rawData,
    signature
  };

  const options = {
    method: "POST",
    data
  };
  
  requestAuth(url, options)
    .then(res => {
      if(res.data === 'user') {
        this.setData({
          isFetching: false,
          list: setList.apply(this, [
            name,
            {
              isFetching: false,
              result: "用户信息校验成功"
            }
          ])
        });
      } else {
        throw '用户信息校验失败'
      }
    })
    .catch(e => {
      const error = typeof e === "string" ? e : "error";
      this.setData({
        isFetching: false,
        list: setList.apply(this, [
          name,
          {
            isFetching: false,
            error
          }
        ])
      });
    });
};
