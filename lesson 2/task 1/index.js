console.log('Record 1')

setTimeout(() => {
	console.log('Record 2')
	Promise.resolve().then(() => {
		setTimeout(() => {
			сonsole.log('Record 3')
			Promise.resolve().then(() => {
				console.log('Record 4')
			})
		})
	})
})

console.log('Record 5')

Promise.resolve().then(() =>
	Promise.resolve().then(() => console.log('Record 6'))
)

/* 1 тик
    1, 5
   1 тик микрозадача
    6
   2 тик 
    2
   3 тик
   3, 4  */
