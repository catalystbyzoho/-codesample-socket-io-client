const { io } = require('socket.io-client');

require('dotenv').config();

const domain = process.env.APPSAIL_DOMAIN;
const token = process.env.CODELIB_SECRET_KEY;

const socket = io(domain, {
	upgrade: false,
	autoConnect: false,
	transports: ['polling'],
	path: '/ws',
	auth: {
		token
	},
	query: {
		name: 'Socket' + Date.now()
	}
});

socket.on('connect', () => {
	console.log('Socket has been connected successfully.');
});

socket.on('connect_error', (err) => {
	console.log('Error occurred ::: ', err);
	process.exit(1);
});
socket.on('disconnect', () => {
	console.log('Socket has been disconnected.');
	process.exit(0);
});

socket.on('data', (data, cb) => {
	console.log('Data received ::: ', data);
	cb(); // Callback to acknowledge the event
});

socket.connect();
