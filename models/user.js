'use strict'
const loader = require('./sequelize-loader')
const Sequelize = loader.Sequelize

const User = loader.database.define('users', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password_hash: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
    freezeTableName: true,
    timestamps: true
  })

module.exports = User

