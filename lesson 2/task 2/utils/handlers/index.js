const { handleCountdown } = require('./handleCountdown')
const { handleLine } = require('./handleLine')
const { logError } = require('../index')

module.exports = {
	handleCountdown,
	handleLine,
	handleError: logError,
}
