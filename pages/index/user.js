const { requestAuth } = require("../../utils/request");

module.exports = function(res) {
  const { rawData, signature } = res;

  const data = {
    rawData,
    signature
  };

  const options = {
    method: "POST",
    data
  };
  requestAuth("/user", options)
    .then(res => {})
    .catch(e => {
      console.log(e);
    });
};
