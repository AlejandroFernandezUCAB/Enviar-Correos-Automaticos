const nodemailer = require('nodemailer');
require('dotenv').config();

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
	subject: 'Hello ', // Subject line
	text: 'Hello world ', // plaintext body
	html: '<b>Hello world </b><br> This is the first email sent with Nodemailer in Node.js', // html body
};

transporter.sendMail(mailOptions, function (error, info) {
	if (error) {
		return console.log(error);
	}

	console.log(info);
});
