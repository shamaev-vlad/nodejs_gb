const {
	isDurationValid,
	isFormatValid,
	isTimersQuantityValid,
	formatStrToDate,
	timersLimit,
} = require('../index')

const handleLine = (line, emitter, timers) => {
	if (line === 'start') {
		emitter.emit('countdown', timers)
		return
	}
	if (!isFormatValid(line)) {
		console.log(
			'Пожалуйста, вводите правильное значение даты и времени, используйте следующий формат чч-мм-сс-ДД-ММ-ГГГГ'
		)
		return
	}
	const timerValue = formatStrToDate(line)
	if (!isDurationValid(timerValue)) {
		console.log('Введите дату и время до которого запустить таймер')
		return
	}
	timers.add(timerValue)
	if (!isTimersQuantityValid(timers.getLength(), timersLimit)) {
		emitter.emit('countdown', timers)
	}
}

module.exports = {
	handleLine,
}
