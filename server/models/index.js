const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const lodash = require('lodash');
const config = require('config');

const sequelize = new Sequelize(config.db.name, config.db.user, config.db.pass, {
	host: config.db.host,
	dialect: config.db.dialect || 'mysql',
	port: config.db.port || 3306
});

const db = {};

fs
	.readdirSync(__dirname)
	.filter(file => {
		return (file.indexOf('.js') !== 0) && (file !== 'index.js');
	})
	.map(file => {
		db[file.replace('.js', '')] = sequelize.import(path.join(__dirname, file));
	});

Object.keys(db).map((modelName) => {
	if ('associate' in db[modelName]) {
		db[modelName].associate(db);
	}
});

sequelize.sync()
	.then(() => {
		console.log('Sync done');
	})
	.catch((err) => {
		console.log(err);
	});

module.exports = lodash.assignIn({
	sequelize,
	Sequelize
}, db);

(function (DB) {
})(module.exports);
