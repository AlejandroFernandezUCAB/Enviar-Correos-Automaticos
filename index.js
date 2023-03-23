const nodemailer = require('nodemailer');
const ping = require('net-ping');
const dns = require('dns');
var exec = require('child_process').exec;
const fs = require('fs');

require('dotenv').config();

const url = 'google.com';

// var minutes = 1,
// 	the_interval = minutes * 60 * 1000;
// setInterval(function () {
// 	console.log('I am doing my' + minutes + 'minutes check');
// 	createping(url);
// }, the_interval);
createping(url);
async function createping(ip) {
	let date = new Date();

	exec('timeout 1 ping -t ' + ip, function (err, stdout, stderr) {
		//Funcion que envia correo electronico
		var transporter = nodemailer.createTransport({
			host: 'smtp-mail.outlook.com', // hostname
			secureConnection: false, // TLS requires secureConnection to be false
			port: 587, // port for secure SMTP
			tls: {
				ciphers: 'SSLv3',
			},
			auth: {
				user: process.env.EMAIL,
				pass: process.env.PASSWORD,
			},
		});

		let toAddress = process.env.TO_EMAIL;
		// setup e-mail data, even with unicode symbols
		var mailOptions = {
			from: process.env.EMAIL, // sender address (who sends)
			to: toAddress, // list of receivers (who receives)
			subject:
				'Recepcion de ping a las: ' +
				convertTZ(date, 'America/Caracas'), // Tue Apr 20 2012 17:10:30 GMT+0700 (Western Indonesia Time) // Subject line
			text: 'Hello world ', // plaintext body
			html: stdout, // html body
		};

		let dateString =
			date.getDate() +
			'-' +
			date.getMonth() +
			'-' +
			date.getFullYear() +
			'-' +
			date.getHours() +
			'.' +
			date.getMinutes() +
			'.' +
			date.getSeconds();

		console.log(dateString);
		fs.writeFile(
			__dirname + '/ping-files/ping-' + dateString + '.txt',
			date + ' ' + stdout,
			function (err) {
				if (err) {
					return console.log(err);
				}
				console.log('The file was saved!');
			}
		);

		transporter.sendMail(mailOptions, function (error, info) {
			if (error) {
				return console.log(error);
			}

			console.log(info);
		});
	});
}

function convertTZ(date, tzString) {
	return new Date(
		(typeof date === 'string' ? new Date(date) : date).toLocaleString(
			'en-US',
			{ timeZone: tzString }
		)
	);
}
