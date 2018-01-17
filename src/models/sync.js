'use strict'

import database from './sequelize-loader'

const sync = async () => {
  await database.sync()
  await database.close()
}

sync()
