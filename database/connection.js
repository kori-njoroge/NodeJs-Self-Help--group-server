const Sequelize = require('sequelize');
// const sequelize = new Sequelize('myproject','corey','Kheriac1@',{dialect:'mysql',host:"54.164.66.87"});
const sequelize = new Sequelize('myproject','root','@Kheriac1',{dialect:'mysql',host:"127.0.0.1",timezone:'+10:00'});


module.exports = sequelize;