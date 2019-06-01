class Storage {
  constructor(key) {
    this.key = key;
  }

  setStorage(data) {
    return new Promise((reject, resolve) => {
      wx.setStorage({
        key: this.key,
        data,
        success: res => {
          reject(res);
        },
        fail: e => {
          resolve(e);
        }
      });
    });
  }

  getStorage() {
    return new Promise((resolve, reject) => {
      wx.getStorage({
        key: this.key,
        success: res => {
          resolve(res);
        },
        fail: e => {
          reject(e);
        }
      });
    });
  }
}

module.exports = Storage;
