class Timers {
	timers = []
	add(timer) {
		this.timers.push(timer)
	}
	getTimers() {
		return this.timers
	}
	exclude(idx) {
		const newTimers = [...this.timers]
		this.timers = [...newTimers.slice(0, idx), ...newTimers.slice(idx + 1)]
	}
	getLength() {
		return this.timers.length
	}
}

module.exports = {
	Timers,
}
