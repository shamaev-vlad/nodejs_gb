const colors = require('colors/safe')
// const prompt = require('prompt')

const first = process.argv[2]
const last = process.argv[3]

console.log(
	colors.bgWhite.blue(
		'Введённый диапазон чисел от ' + process.argv[2] + ' до ' + process.argv[3]
	)
)

function primeNumbers(first_number, second_number) {
	let counter = first_number - 1
	let counterColors = 1
	if (Number.isInteger(first_number) && Number.isInteger(second_number)) {
		nextPrime: for (let i = first_number; i <= second_number; i++) {
			for (let j = 2; j < i; j++) {
				if (i % j == 0) {
					counter++
					if (counter === second_number)
						console.log(
							colors.red(
								`Простых чисел в дипазоне от ${first_number} до ${second_number} нет.`
							)
						)
					continue nextPrime
				}
			}

			if (true) {
				if (counterColors > 3) counterColors = 1

				coloringPrimeNumbers(i, counterColors)
				counterColors++
			}
		}
	} else {
		console.log(colors.bgRed.yellow('В аргументах есть НЕ число'))
	}
}

primeNumbers(+first, +last)

/* Вариант с пакетом prompt */
// var schema = {
// 	properties: {
// 		first_number: {
// 			type: 'number',
// 			description: 'Введите первое число из желаемого диапазона',
// 		},
// 		second_number: {
// 			type: 'number',
// 			description: 'Введите второе число из желаемого диапазона',
// 		},
// 	},
// }

// prompt.start()

// prompt.get(schema, function (err, result) {
// 	function primeNumbersPrompt(first_number, second_number) {
// 		let counter = first_number - 1
// 		let counterColors = 1
// 		if (Number.isInteger(first_number) && Number.isInteger(second_number)) {
// 			nextPrime: for (let i = first_number; i <= second_number; i++) {
// 				for (let j = 2; j < i; j++) {
// 					if (i % j == 0) {
// 						counter++
// 						if (counter === second_number)
// 							console.log(
// 								colors.red(
// 									`Простых чисел в дипазоне от ${first_number} до ${second_number} нет.`
// 								)
// 							)
// 						continue nextPrime
// 					}
// 				}

// 				if (true) {
// 					if (counterColors > 3) counterColors = 1

// 					coloringPrimeNumbers(i, counterColors)
// 					counterColors++
// 				}
// 			}
// 		} else {
// 			console.log(colors.bgRed.yellow('В аргументах есть НЕ число'))
// 		}
// 	}

// 	primeNumbersPrompt(result.first_number, result.second_number)
// })

function coloringPrimeNumbers(primeNumber, counterColors) {
	if (counterColors === 1) {
		console.log(colors.green(`Простое число  ${primeNumber}`))
	} else if (counterColors === 2) {
		console.log(colors.yellow(`Простое число  ${primeNumber}`))
	} else if (counterColors === 3) {
		console.log(colors.red(`Простое число  ${primeNumber}`))
	}
}
