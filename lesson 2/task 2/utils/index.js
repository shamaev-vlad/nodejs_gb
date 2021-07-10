const { intervalToDuration } = require('date-fns')
const { timerRegExp } = require('../constants')

// Валидация

const isFormatValid = str => timerRegExp.test(str)
const isDurationValid = date => date > new Date()
const isTimersQuantityValid = (timersQuantity, limit) => timersQuantity < limit

// Формат

const formatStrToDate = str => {
	const [, hour, minute, second, day, month, year] = timerRegExp.exec(str)
	return new Date(+year, +month - 1, +day, +hour, +minute, +second)
}

const formatDateToDuration = timer =>
	intervalToDuration({
		start: new Date(),
		end: new Date(timer),
	})

// Задержка

const delay = ms => {
	return new Promise(resolve => {
		setTimeout(resolve, ms)
	})
}

// Вывод

const logTimer = (timer, idx) => {
	console.log(
		`Таймер ${idx} осталось времени ${JSON.stringify(
			formatDateToDuration(timer)
		)}`
	)
}

const logFinish = idx => {
	console.log(`Таймер ${idx} завершился`)
}

const logError = err => {
	console.log(`Ошибка: ${err}`)
}

module.exports = {
	logTimer,
	logFinish,
	logError,
	isFormatValid,
	isDurationValid,
	isTimersQuantityValid,
	delay,
	formatStrToDate,
	formatDateToDuration,
}
