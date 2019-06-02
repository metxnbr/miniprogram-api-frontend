const Storage = require("./storage");
const { ACCESS_TOKEN } = require("../constants");

const tokenStorage = new Storage(ACCESS_TOKEN);

module.exports = tokenStorage;
