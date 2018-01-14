'use strict'

const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router()

const User = require('../models/user.js')

router.get('/', (req, res) => {
  res.render('login')
})

router.post('/', (req, res) => {
  User.findOne({
    where: { email: req.body.email }
  })
  .then(user => {
    if (bcrypt.compareSync(req.body.password, user.password_hash)) {
      // パスワード一致
    } else {
      // パスワード不一致
    }
    res.redirect('/')
  })
})

module.exports = router

