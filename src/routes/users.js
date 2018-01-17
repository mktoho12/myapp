import express from 'express'
import bcrypt from 'bcrypt'
const router = express.Router()

import User from '../models/user'

router.get('/', async (req, res) => {
  const users = await User.findAll({
    order: [['id', 'ASC']]
  })
  res.render('users/index', { users: users })
})

router.get('/new', (req, res) => {
  res.render('users/new')
})

router.post('/', async (req, res) => {
  const hashed_password = await hash(req.body.password)
  await User.create({
    name: req.body.username,
    email: req.body.email,
    password_hash: hashed_password
  })
  res.redirect('/users')
})

const hash = password => bcrypt.hash(password, 10)

export default router
