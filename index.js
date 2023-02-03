// Loop over input items and add a new field
// called ‘myNewField’ to the JSON of each one
const ical = require('cal-parser');
const https = require('https');

https.get('https://calendar.google.com/calendar/ical/c_l339m73uh1kd5a0pdl3k8rtc6c%40group.calendar.google.com/public/basic.ics', res => {
	let data = [];
	const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';

	console.log('Status Code:', res.statusCode);
	console.log('Date in Response header:', headerDate);

	res.on('data', chunk => {
		data.push(chunk)
	});

	res.on('end', () => {
		console.log('Response ended: ');

		const file = Buffer.concat(data).toString();

		const parsed = ical.parseString(file);

		console.log(parsed);
	});
}).on('error', err => {
	console.log('Error: ', err.message);
});
