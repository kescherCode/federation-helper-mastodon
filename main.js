const {CronJob} = require('cron');
const {updateRelationships} = require("./lib/bot");

// <second> <minute> <hour> <day of month> <month> <day of week>
new CronJob('0 0 * * * *', function () {
	console.log('Cronjob triggered');
	updateRelationships().then(() => {
		console.log('Compared successfully');
	}).catch(error => {
		console.error(error);
	});
}, null, true, 'Europe/London');