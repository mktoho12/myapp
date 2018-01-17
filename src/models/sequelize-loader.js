'use strict';
const Sequelize = require('sequelize')
const sequelize = new Sequelize(
  process.env.DATABASE_URL || 'postgres://postgres@localhost/myapp', {
    logging: console.log,
    operatorsAliases: false
  }
)

const User = require('./user')
sequelize.models = { User }

module.exports = {
  database: sequelize,
  Sequelize: Sequelize
}

