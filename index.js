import jsonfile from 'jsonfile'
import moment from 'moment'
import simpleGit from 'simple-git'

const path = './data.json'
const git = simpleGit()

const makeCommits = n => {
	if (n === 0) return git.push()
	const x = Math.floor(Math.random() * 55)
	const y = Math.floor(Math.random() * 7)
	console.log(x, y)

	commits(x, y, n)
}

async function commits(x, y, n) {
	for (let i = 0; i < 3; i++) {
		if (n===0) return git.push()
		const hour = Math.floor(Math.random() * 25)
		const minute = Math.floor(Math.random() * 61)
		const seconds = Math.floor(Math.random() * 61)
		const time = { hour: hour, minute: minute, second: seconds }
		console.log(time)

		const date = moment()
			.subtract(1, 'y')
			.add(1, 'd')
			.add(x, 'w')
			.add(y, 'd')
			.set(time)
			.format()

		const data = {
			date: date,
		}
		console.log(date)

		await new Promise((resolve, reject) => {
			jsonfile.writeFile(path, data, (err) => {
				if (err) reject(err)
				else resolve()
			})
		})

		await git.add([path]).commit(date, {'--date':date}, makeCommits.bind(this, --n)).push()
	}
}

makeCommits(1)
