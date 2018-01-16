'use strict'

const loader = require('./sequelize-loader')
const User = require('./user')

const sync = async () => {
  await loader.database.sync()
  await loader.database.close()
  console.log('db sync done!')
}

sync()
