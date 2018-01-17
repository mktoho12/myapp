'use strict'

import express from 'express'
const router = express.Router()

import User from '../models/user'

router.get('/', (req, res) => {
  res.render('login')
})

router.post('/', async (req, res) => {
  const user = await User.findByEmail(req.body.email)
  if (await user.verifyPassword(req.body.password)) {
    // パスワード一致
  } else {
    // パスワード不一致
  }
  res.redirect('/')
})

export default router
