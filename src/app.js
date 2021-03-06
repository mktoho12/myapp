'use strict'

import express from 'express'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import csrf from 'csurf'

import database from './models/sequelize-loader'
import index from './routes/index'
import users from './routes/users'
import login from './routes/login'
import api from './routes/api'

const app = express()
export default app

// view engine setup
app.set('views', './views')
app.set('view engine', 'pug')

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static('./public'))
app.use(helmet())
app.use(csrf({ cookie: true }))

// モデルの読み込み
app.db = database

app.use('/', index)
app.use('/users', users)
app.use('/login', login)
app.use('/api', api)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})
