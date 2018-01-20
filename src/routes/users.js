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
  res.render('users/new', { csrfToken: req.csrfToken() })
})

router.post('/', async (req, res) => {
  const errors = new Map()
  Object.entries(req.body).forEach(([key, value]) => {
    if (value.trim() === '') {
      errors.set(key, '入力してください')
    }
  })
  if (await User.findByEmail(req.body.email)) {
    errors.set('email', '既に使用されているメールアドレスです')
  }
  if (errors.size > 0) {
    res.render('users/new', { user: req.body, errors: errors })
    return
  }

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
