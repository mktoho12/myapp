'use strict';
const Sequelize = require('sequelize')
const sequelize = new Sequelize(
  process.env.DATABASE_URL || 'sqlite:db/myapp.db',
  { logging: console.log, operatorsAliases: false })

module.exports = {
  database: sequelize,
  Sequelize: Sequelize
}

