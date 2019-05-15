const { request } = require("../../../utils/request");
const setList = require("./setList");

module.exports = function(name) {
  const url = "/secret";

  this.setData({
    name: "",
    isFetching: true,
    list: setList.apply(this, [
      name,
      {
        isFetching: true
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
      const result = e.data;
      this.setData({
        isFetching: false,
        list: setList.apply(this, [
          name,
          {
            isFetching: false,
            result
          }
        ])
      });
    });
};
