'use strict'

import Sequelize from 'sequelize'

const database = new Sequelize(
  process.env.DATABASE_URL || 'postgres://postgres@localhost/myapp', {
    operatorsAliases: false
  }
)

export default database
