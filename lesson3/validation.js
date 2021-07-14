const { TARGET_IPs } = require('./constants')

const getTargetIP = str => TARGET_IPs.find(ip => str.includes(ip))

module.exports = {
	getTargetIP,
}
