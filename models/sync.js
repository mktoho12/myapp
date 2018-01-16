'use strict'

const loader = require('./sequelize-loader')
const User = require('./user')

loader.database.sync()
.then(() =>
  loader.database.close()
)
.then(() => {
  console.log('db sync done!')
})

