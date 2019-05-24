// constants
const NAMES = require('./constants')

// fns
const REQUEST_AUTH = require('./requestAuth')
const REQUEST_WITHOUT_AUTH = require('./reqWithoutAuth')
const REQUEST_USER_DATA = require('./requestUserData')
const NOTHING = require('./nothing')


module.exports = {
  NAMES,
  FNS: {
    REQUEST_AUTH,
    REQUEST_WITHOUT_AUTH,
    REQUEST_USER_DATA,
    NOTHING
  }
}