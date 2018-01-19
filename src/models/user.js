'use strict'

import Sequelize from 'sequelize'
import bcrypt from 'bcrypt'
import database from './sequelize-loader'

export default class User extends Sequelize.Model {
  static findByEmail (email) {
    return this.findOne({ where: { email: email } })
  }

  verifyPassword (password) {
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
      allowNull: false,
      unique: true
    }
  }, {
    freezeTableName: true,
    underscored: true,
    timestamps: true,
    sequelize: database
  }
)
