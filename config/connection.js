const sequelize = require("sequelize");

const sequelize = new Sequelize("chatify", "root", "D@l3C00p3r!", {
	host: "localhost",
	port: 3306,
	dialect: "mysql",
	pool: {
		max: 5,
		min: 0,
		idle: 10000
	}
});

module.exports = sequelize;