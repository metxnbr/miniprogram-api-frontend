const { requestBase } = require("../../../utils/request");
const setList = require("./setList");

const requestUploadFile = requestBase({ type: "uploadFile", auth: true });

module.exports = function(name) {
  wx.chooseImage({
    success: res => {
      const tempFilePaths = res.tempFilePaths;
      uploadFile.call(this, tempFilePaths);
    }
  });

  function uploadFile(tempFilePaths) {
    const url = "/upload/file";

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
    const options = {
      filePath: tempFilePaths[0],
      name: "image"
    };
    requestUploadFile(url, options)
      .then(res => JSON.parse(res.data))
      .then(data => {
        const { message, status } = data || {};
        if (status === "success") {
          this.setData({
            isFetching: false,
            list: setList.apply(this, [
              name,
              {
                isFetching: false,
                result: message
              }
            ])
          });
        } else {
          throw message || "upload error";
        }
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
  }
};
