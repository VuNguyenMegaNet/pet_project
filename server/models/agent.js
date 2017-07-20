const crypto = require('crypto');

module.exports = (sequelize, DataTypes) => {
	return sequelize.define('agents', {
		'username': { type: DataTypes.STRING, allowNull: false, unique: true },
		'password': { type: DataTypes.STRING, allowNull: false },
		'gender': { type: DataTypes.STRING },
		'email': { type: DataTypes.STRING },
		'address': { type: DataTypes.STRING },
		'permissions': { type: DataTypes.STRING }
	},
	{
		setterMethods: {
			password: function(v) {
				if (v) {
					this.setDataValue('password', crypto.createHash('md5').update(v).digest('hex'));
				}
			},
			email: function(v) {
				if (v) this.setDataValue('email', v.toLowerCase());
			}
		},
		underscored: true,
		tableName: 'agents'
	});
};
