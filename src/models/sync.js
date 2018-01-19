'use strict'

import database from './sequelize-loader'
import User from './user'

const sync = async () => {
  await User.sync()
  await database.close()
}

sync()
