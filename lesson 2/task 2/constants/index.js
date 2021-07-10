const timersLimit = 2

const yearReg = '(202[1-9])'
const monthReg = '(0[1-9]|1[0-2])'
const dayReg = '(0[1-9]|1[0-9]|2[0-9]|3[0-1])'
const hourReg = '([0-1][0-9]|2[0-3])'
const minuteReg = '([0-5][0-9])'
const secondReg = '([0-5][0-9])'
const timerRegExp = new RegExp(
	`^${hourReg}-${minuteReg}-${secondReg}-${dayReg}-${monthReg}-${yearReg}$`
)
module.exports = {
	timersLimit,
	timerRegExp,
}
