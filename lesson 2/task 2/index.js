const EventEmitter = require('events')
const rl = require('readline').createInterface({
	input: process.stdin,
	output: process.stdout,
})

const { timersLimit } = require('./constants')
const { Timers } = require('./timersModel/index')
const { handleLine, handleCountdown, handleError } = require('./utils/handlers')

const emitter = new EventEmitter()
const timers = new Timers()

console.log(`
	--		Добро пожаловать! 		-- \b \n
    Привет! Это приложение поможет тебе поставить таймер обратного отсчёта! \b 
    Пожалуйста, вводи каждый таймер с новой строки \b
	Вводи либо сразу время до которого нужно запустить отсчёт,\b
	либо время и дату от которого нужно запустить таймер \b
    Всё нужно вводить в формате: чч-мм-сс-ДД-ММ-ГГГГ \b
    Максимум можно запустить ${timersLimit} таймера(-ов)'\b 
  `)

emitter.on('countdown', timers => handleCountdown(timers, emitter))
emitter.on('shutdown', () => rl.close())
emitter.on('error', handleError)

try {
	const main = async () => {
		rl.prompt()
		rl.on('line', line => handleLine(line, emitter, timers))
	}
	main()
} catch (err) {
	console.log(err)
}
