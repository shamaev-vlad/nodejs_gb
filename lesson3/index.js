const { EOL } = require('os')
const path = require('path')
const fs = require('fs')
const { getTargetIP } = require('./validation')
const readline = require('readline')
const { TARGET_IPs } = require('./constants')

const readStream = fs.createReadStream(path.join(__dirname, 'access.log'), {
	encoding: 'utf8',
})

const getWriteStream = prefix =>
	fs.createWriteStream(
		path.join(__dirname, `${prefix}-access.log`),
		{ flags: 'a' },
		'utf8'
	)

const writeStreamsMap = TARGET_IPs.reduce((acc, el) => {
	acc[el] = getWriteStream(el)
	return acc
}, {})

const lineReader = readline.createInterface({
	input: readStream,
})

lineReader.on('line', line => {
	const targetIp = getTargetIP(line)
	if (targetIp) {
		writeStreamsMap[targetIp].write(`${line}${EOL}`)
	}
})

readStream.on('end', () => {
	console.log('Чтение файла завершено')
})
readStream.on('error', err => {
	console.log(err)
})
