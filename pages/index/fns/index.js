// constants
const NAMES = require('./constants')

// fns
const REQUEST_AUTH = require('./requestAuth')
const REQUEST_WITHOUT_AUTH = require('./reqWithoutAuth')
const NOTHING = require('./nothing')


module.exports = {
  NAMES,
  FNS: {
    REQUEST_AUTH,
    REQUEST_WITHOUT_AUTH,
    NOTHING
  }
}