const { request } = require("../../../utils/request");
const setList = require("./setList");

module.exports = function(name) {
  const url = "/secret";

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

  request(url)
    .then(res => {
      this.setData({
        isFetching: false,
        list: setList.apply(this, [
          name,
          {
            isFetching: false
          }
        ])
      });
    })
    .catch(e => {
      const msg = e && e.data;
      const error = typeof msg === "string" ? msg : "error";
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
