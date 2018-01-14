const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router()

const User = require('../models/user.js')

router.get('/', (req, res) => {
  User.findAll({
    order: [['id', 'ASC']]
  })
  .then(users => {
    res.render('users/index', { users: users })
  })
})

router.get('/new', (req, res) => {
  res.render('users/new')
})

router.post('/', (req, res) => {
  console.log(req.body)
  User.create({
    name: req.body.username,
    email: req.body.email,
    password_hash: hash(req.body.password)
  })
  .then((user) => {
    res.redirect('/users')
  })
  .catch(error => {
    res.redirect('/error')
  })
})

const hash = password => bcrypt.hashSync(password, 10)

module.exports = router

