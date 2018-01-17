'use strict'

const loader = require('./sequelize-loader')
const Sequelize = loader.Sequelize
const sequelize = loader.database
const bcrypt = require('bcrypt')

class User extends Sequelize.Model {
  static findByEmail(email) {
    console.log(this)
    return this.findOne({ where: { email: email }})
  }

  verifyPassword(password) {
    return bcrypt.compare(password, this.password_hash)
  }
}

User.init(
  {
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
    timestamps: true,
    sequelize
  }
)

module.exports = User

