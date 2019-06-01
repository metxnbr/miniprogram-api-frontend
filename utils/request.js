const { apiHost } = require("../env");
const tokenStorage = require("./tokenStorage");

const checkRes = res => {
  const { statusCode } = res;
  if (statusCode >= 200 && statusCode < 300) {
    return true;
  }
  return false;
};

const requestWithoutAuth = ({ type, url, options }) => {
  return new Promise((resolve, reject) => {
    wx[type]({
      url,
      ...options,
      success: res => {
        if (checkRes(res)) {
          resolve(res);
        } else {
          reject(res);
        }
      },
      fail: e => {
        reject(e);
      }
    });
  });
};

const requestWithAuth = ({ type, url, options = {} }) => {
  return new Promise((resolve, reject) => {
    tokenStorage
      .getStorage()
      .then(res => {
        const access_token = res && res.data;
        wx[type]({
          url,
          header: {
            Authorization: access_token
          },
          ...options,
          success: res => {
            if (checkRes(res)) {
              resolve(res);
            } else {
              reject(res);
            }
          },
          fail: e => {
            reject(e);
          }
        });
      })
      .catch(e => {
        reject({ e, statusCode: 401 });
      });
  });
};

const requestBase = ({ type = "request", auth = false }) => {
  return (url, options = {}) => {
    // add apiHost
    url = `${apiHost}${url}`;

    if (auth) {
      return requestWithAuth({ type, url, options });
    } else {
      return requestWithoutAuth({ type, url, options });
    }
  };
};

module.exports = {
  requestBase,
  request: requestBase({}),
  requestAuth: requestBase({ auth: true })
};
