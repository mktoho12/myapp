'use strict'

import Sequelize from 'sequelize'
import User from './user'

export const database = new Sequelize(
  process.env.DATABASE_URL || 'postgres://postgres@localhost/myapp', {
    operatorsAliases: false
  }
)

database.models = { User }
