import express from 'express';
import http from 'http';
import compression from 'compression';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import morgan from 'morgan';
import config from 'config';
import passport from 'passport';
require('./models');

const app = express();
const socketServer = http.createServer(app);
const io = require('socket.io').listen(socketServer);
const port = process.env.PORT || 3000;

app.use(compression({}));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
	secret: '__MegaNet__',
	key: 'sessionId',
	cookie: {
		maxAge: config.server.session.cookie.maxAge
	},
	resave: true,
	saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8081');
	res.header('Access-Control-Allow-Credentials', true);
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

/* Modules */
require('./modules/passport');
require('./modules/socket.js')(io);

/* Routes */
require('./routes/session')(app);

socketServer.listen(port, () => {
	console.log('app listening on port 3000');
});
