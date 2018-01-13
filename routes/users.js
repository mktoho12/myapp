const express = require('express')
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
  User.create({
    name: req.body.username,
    email: req.body.email
  })
  .then((user) => {
    console.log(user)
    res.redirect('/users')
  })
  .catch(error => {
    res.redirect('/error')
  })
})

module.exports = router

