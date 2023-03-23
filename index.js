const nodemailer = require('nodemailer');
const ping = require('net-ping');
const dns = require('dns');
var exec = require('child_process').exec;
// website URL

require('dotenv').config();

const url = 'google.com';

createping(url);

async function createping(ip) {
	exec('timeout 2 ping -t ' + ip, function (err, stdout, stderr) {
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
				convertTZ(new Date(), 'America/Caracas'), // Tue Apr 20 2012 17:10:30 GMT+0700 (Western Indonesia Time) // Subject line
			text: 'Hello world ', // plaintext body
			html: stdout, // html body
		};

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
