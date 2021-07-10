const { logFinish, logTimer, delay } = require('../index')

const handleCountdown = (timers, emitter) => {
	console.log('\n')
	if (!timers.getLength()) {
		emitter.emit('shutdown')
		return
	}
	timers.getTimers().forEach((timer, idx) => {
		if (timer <= new Date()) {
			timers.exclude(idx)
			logFinish(idx)
			return
		}
		logTimer(timer, idx)
	})
	delay(1000).then(() => {
		emitter.emit('countdown', timers)
	})
}

module.exports = {
	handleCountdown,
}
