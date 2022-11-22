const Sequelize = require('sequelize');
const sequelize = new Sequelize('myproject','corey','Kheriac@1',{dialect:'mysql',host:"127.0.0.1"});

module.exports = sequelize;