'use strict'

import loader from './sequelize-loader'

const sync = async () => {
  await loader.database.sync()
  await loader.database.close()
}

sync()
