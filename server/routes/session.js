import passport from 'passport';

module.exports = (router) => {
	router.get('/logout', function (req, res) {
		req.logout();
		res.status(200).send({ status: 'LOGOUT_SUCCESS' });
	});

	router.post('/login', (req, res, next) => {
		passport.authenticate('local-signin', (err, user, info) => {
			if (err) {
				return next(err);
			} else {
				if (!user) {
					return res.status(403).send({ status: 'NOT_FIND_USER' });
				} else {
					req.logIn(user, (data, err) => {
						if (err) {
							return next(err);
						} else {
							return res.status(200).send({ status: 'OK' });
						}
					});
				}
			}
		})(req, res, next);
	});

	router.post('/signup', (req, res, next) => {
		passport.authenticate('local-signup', (err, user, info) => {
			if (err) {
				return next(err);
			} else {
				console.log('result=>');
				console.log(user);
				return res.status(200).json({ status: 'SIGNUP_SUCCESS' });
			}
		})(req, res, next);
	});

	router.get('/currentUser', (req, res) => {
		if (!req.user) {
			return res.status(403).json({ currentUser: null });
		} else {
			return res.status(200).json({
				currentUser: req.user
			});
		}
	});
};
