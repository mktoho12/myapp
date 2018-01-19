'use strict'

const path = require('path')

module.exports = {
  entry: './frontend/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public/javascripts')
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.common.js'
    }
  }
}

