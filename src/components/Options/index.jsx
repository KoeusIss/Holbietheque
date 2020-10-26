

const genderOptions = [
	{ key: 'm', text: 'Male', value: 'male' },
	{ key: 'f', text: 'Female', value: 'female' },
	{ key: 'o', text: 'Other', value: 'other' },
]

const maritalStatus = [
	{ key: 'm', text: 'Married', value: 'married' },
	{ key: 's', text: 'Single', value: 'single' },
	{ key: 'o', text: 'Other', value: 'other' },
]

const days = []
let d = 1
while (d < 32) {
	days.push({ key: d, text: (d).toString(), value: (d).toString() });
	d++;
}

const months = [
	{ key: '1', text: 'January', value: '01' },
	{ key: '2', text: 'February', value: '02' },
	{ key: '3', text: 'March', value: '03' },
	{ key: '4', text: 'April', value: '04' },
	{ key: '5', text: 'May', value: '05' },
	{ key: '6', text: 'June', value: '06' },
	{ key: '7', text: 'July', value: '07' },
	{ key: '8', text: 'August', value: '08' },
	{ key: '9', text: 'September', value: '09' },
	{ key: '10', text: 'October', value: '10' },
	{ key: '11', text: 'November', value: '11' },
	{ key: '12', text: 'December', value: '12' }
]

const years = []
let y = 0
while (y < 100) {
	years.push({ key: y, text: (1990 + y).toString(), value: (1990 + y).toString() });
	y++;
}

export {
	genderOptions,
	maritalStatus,
	days,
	months,
	years
}