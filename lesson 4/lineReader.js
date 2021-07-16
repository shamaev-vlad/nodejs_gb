const { EOL } = require('os')
const fs = require('fs')
const readline = require('readline')

const { getWriteStream } = require('./tools')

const generateLogsDumpByPattern = (path, searchParams) => {
	const readStream = fs.createReadStream(path, {
		encoding: 'utf8',
	})

	const lineReader = readline.createInterface({
		input: readStream,
	})

	const writeStream = getWriteStream(searchParams)

	lineReader.on('line', line => {
		if (line.includes(searchParams)) {
			writeStream.write(`${line}${EOL}`)
		}
	})

	readStream.on('end', () => {
		console.log('Чтение файла завершено')
	})
	readStream.on('error', err => {
		console.log(err)
	})
}

module.exports = {
	generateLogsDumpByPattern,
}
