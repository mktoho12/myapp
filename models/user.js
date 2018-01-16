'use strict'
const loader = require('./sequelize-loader')
const Sequelize = loader.Sequelize
const bcrypt = require('bcrypt')

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
    underscored: true,
    timestamps: true
  })

User.prototype.verifyPassword = function(password) {
  console.log(`password_hash=[${this.password_hash}]`)
  return bcrypt.compare(password, this.password_hash)
}

module.exports = User

