import jsonfile from 'jsonfile'
import moment from 'moment'
import simpleGit from 'simple-git'

const path = [
	'./dataStorage/data1.json',
	'./dataStorage/data2.json',
	'./dataStorage/data3.json',
	'./dataStorage/data4.json',
	'./dataStorage/data5.json',
]

const git = simpleGit()

const makeCommits = n => {
	if (n === 0) return git.push()
	for (let i = n; i > 0; i--) {
		const dataCommits = getData()
		getCommits(dataCommits, n)
	}
}

function getData() {
	let data = []

	for (let i = 0; i < 5; i++) {
		const x = Math.floor(Math.random() * 55)
		const y = Math.floor(Math.random() * 7)

		let time = []
		for (let j = 0; j < 5; j++) {
			const hour = Math.floor(Math.random() * 25)
			const minute = Math.floor(Math.random() * 25)
			const second = Math.floor(Math.random() * 25)
			time.push({ hour: hour, minute: minute, second: second })
		}

		data[i] = {
			x: x,
			y: y,
			time: time
		}
	}

	console.log(data)
	return data
}

function getCommits(dataCommits, n) {
	for (let i = 0; i < 5; i++) {
		const timeCommit = dataCommits[i].time
		for (let j = 0; i < 5; i++) {
			const date = moment()
				.subtract(1, 'y')
				.add(1, 'd')
				.add(dataCommits[i].x, 'w')
				.add(dataCommits[i].y, 'd')
				.set(timeCommit[j])
				.format()

			const data = {
				date: date,
			}
			console.log(date)

			jsonfile.writeFile(path[i], data, () => {
				git
					.add([path[i]])
					.commit(date, { '--date': date }, makeCommits.bind(this, --n))
					.push()
			})
		}
	}
}

makeCommits(1)
