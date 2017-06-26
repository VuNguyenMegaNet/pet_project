import { validNick, findIndex, sanitizeString } from './../../shared/util';
const users = [];
const sockets = {};

module.exports = function (io) {
	io.on('connection', (socket) => {
		const nick = socket.handshake.query.nick;
		const currentUser = {
			id: socket.id,
			nick
		};

		if (findIndex(users, currentUser.id) > -1) {
			console.log('User ID is already connected, kicking.');
			socket.disconnect();
		} else if (!validNick(currentUser.nick)) {
			socket.disconnect();
		} else {
			console.log(`User ${currentUser.nick} connected!`);
			sockets[currentUser.id] = socket;
			users.push(currentUser);
			io.emit('userJoin', { nick: currentUser.nick });
			console.log(`[INFO] Total users: ${users.length}`);
		}

		socket.on('ding', () => {
			socket.emit('dong');
		});

		socket.on('disconnect', () => {
			if (findIndex(users, currentUser.id) > -1) users.splice(findIndex(users, currentUser.id), 1);
			console.log(`User ${currentUser.nick} disconnected!`);
			socket.broadcast.emit('userDisconnect', { nick: currentUser.nick });
		});

		socket.on('userChat', (data) => {
			const _nick = sanitizeString(data.nick);
			const _message = sanitizeString(data.message);
			const date = new Date();
			const time = (`0 ${date.getHours()}`).slice(-2) + (`0 ${date.getMinutes()}`).slice(-2);

			console.log(`[CHAT] [${time}] ${_nick} : ${_message}`);
			socket.broadcast.emit('serverSendUserChat', { nick: _nick, message: _message });
		});
	});
};
