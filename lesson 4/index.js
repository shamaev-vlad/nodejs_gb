#!/usr/bin/env node

const inquirer = require('inquirer')

const { returnLiteral } = require('./constants')
const {
	getListPromptConfig,
	getPathPromptConfig,
	getSearchPatternConfig,
	isFile,
	getFolderList,
	isDirectory,
	getSplitPath,
	getNormalizedPath,
	isRootFolder,
} = require('./tools')
const { generateLogsDumpByPattern } = require('./lineReader')

try {
	let targetPath = ''
	let searchParams = ''
	const main = async (questions, isInitCall) => {
		const params = await inquirer.prompt(questions)
		if (params.search) {
			searchParams = params.search
		}
		const [basePath] = getSplitPath(targetPath)
		if (params.path === returnLiteral) {
			targetPath = basePath
			main(getListPromptConfig(getFolderList(targetPath)))
			return
		}
		targetPath = isInitCall
			? getNormalizedPath(getSplitPath(params.path))
			: getNormalizedPath([targetPath, params.path])
		if (isFile(targetPath)) {
			generateLogsDumpByPattern(targetPath, searchParams)
			return
		}
		if (isDirectory(targetPath)) {
			main(
				getListPromptConfig(getFolderList(targetPath), isRootFolder(targetPath))
			)
			return
		}
		throw new Error('Unhandled exception')
	}
	main([getPathPromptConfig(), getSearchPatternConfig()], true)
} catch (err) {
	console.log(err)
}
