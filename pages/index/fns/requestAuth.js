const { requestAuth } = require("../../../utils/request");
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

  requestAuth(url)
    .then(res => {
      const result = res.data;
      this.setData({
        isFetching: false,
        list: setList.apply(this, [
          name,
          {
            result,
            isFetching: false
          }
        ])
      });
    })
    .catch(e => {
      let error = "error";
      if (e.statusCode === 401) {
        error = "Unauthorized";
        this.setData({
          loginStatus: "not-logined"
        });
      }
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
