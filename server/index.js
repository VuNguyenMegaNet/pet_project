import express from 'express';
import http from 'http';
import compression from 'compression';
import bodyParser from 'body-parser';
import morgan from 'morgan';

const app = express();
const socketServer = http.createServer(app);
const io = require('socket.io').listen(socketServer);
const port = process.env.PORT || 3000;

app.use(compression({}));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8081');
	res.header('Access-Control-Allow-Credentials', true);
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

require('./modules/socket.js')(io);

socketServer.listen(port, () => {
	console.log('app listening on port 3000');
});
