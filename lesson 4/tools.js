const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer')
const { returnLiteral, prevPathRegExp } = require('./constants')

const pathValidator = input =>
	fs.existsSync(input) ? true : 'Пожалуйста, проверьте путь к файлу'

const getPathPromptConfig = () => ({
	name: 'path',
	type: 'input',
	message: 'Пожалуйста, укажите путь до файла (напр. "C:/.../"): ',
	validate: pathValidator,
})

const getSearchPatternConfig = () => ({
	name: 'search',
	type: 'input',
	message: 'Пожалуйста, введите строку или шаблон для поиска в файле: ',
})

const getChoicesWithReturn = choicesArr => [
	returnLiteral,
	new inquirer.Separator(),
	...choicesArr,
]

const getListPromptConfig = (folderContentList, isRoot) => ({
	name: 'path',
	type: 'list',
	message: 'Выберите файл или директорию:',
	choices: isRoot ? folderContentList : getChoicesWithReturn(folderContentList),
})

const isFile = path => fs.lstatSync(path).isFile()
const isDirectory = path => fs.lstatSync(path).isDirectory()
const getFolderList = path => fs.readdirSync(path)

const getSplitPath = path => {
	let newPath = path
	if (newPath.slice(-1) === '/') {
		newPath = newPath.slice(0, newPath.length - 1)
	}
	const idx = newPath.lastIndexOf('/')

	const lastPart = newPath.slice(idx + 1)
	const basePath = prevPathRegExp.exec(newPath)?.[0].slice(0, idx) ?? '/'
	return [basePath, lastPart]
}

const getNormalizedPath = arr => path.join(...arr)

const isRootFolder = str => str === '/'

const getWriteStream = prefix =>
	fs.createWriteStream(
		path.join(__dirname, `${prefix}-access.log`),
		{ flags: 'a' },
		'utf8'
	)

module.exports = {
	getPathPromptConfig,
	getListPromptConfig,
	getSearchPatternConfig,
	isFile,
	isDirectory,
	getFolderList,
	getSplitPath,
	getNormalizedPath,
	isRootFolder,
	getWriteStream,
}
