import express from 'express'
import User from '../models/user'

const router = express.Router()

router.get('/email/exists', async (req, res) => {
  const user = await User.findByEmail(req.query.email)
  res.header('Content-Type', 'application/json; charset=utf-8')
  res.send({ status: 'ok', result: user !== null })
})

export default router
