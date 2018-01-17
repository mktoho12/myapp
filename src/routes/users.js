import express from 'express'
import bcrypt from 'bcrypt'
import User from '../models/user'

const router = express.Router()

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
  const hashedPassword = await hash(req.body.password)
  await User.create({
    name: req.body.username,
    email: req.body.email,
    password_hash: hashedPassword
  })
  res.redirect('/users')
})

const hash = password => bcrypt.hash(password, 10)

export default router
