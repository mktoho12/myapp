'use strict';
import Sequelize from 'sequelize'
export const database = new Sequelize(
  process.env.DATABASE_URL || 'postgres://postgres@localhost/myapp', {
    operatorsAliases: false
  }
)

import User from './user'
database.models = { User }
