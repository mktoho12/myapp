'use strict'

const assert = require('assert')
const bcrypt = require('bcrypt')
const request = require('supertest')

const app = require('../app')
const User = require('../models/user')

describe('/users', () => {
  before(() => {
    User.create({
      email: 'test@gmail.com',
      name: 'テストユーザー',
      password_hash: bcrypt.hashSync('password', 10)
    })
  })

  after(() => {
    User.findOne({
      where: { email: 'test@gmail.com' }
    })
    .then(user => {
      user.destroy()
    })
  })

/*
  it('ユーザー一覧に表示される', done => {
    request(app)
      .get('/users')
      .expect(/テストユーザー/)
      .expect(200, done)
  })

  it('アカウント作成でユーザーが登録される', done => {
    request(app)
      .post('/users')
      .send({
        username: 'テストユーザー2',
        password: 'password',
        email: 'test2@gmail.com'
      })
      .expect(302)
      .end((err, res) => {
        if (err) done(err)
        User.findOne({ where: { email: 'test2@gmail.com' } }).then(user => {
          assert.equal(user.name, 'テストユーザー2')
          assert.ok(bcrypt.compareSync('password', user.password_hash))
          user.destroy()
          done()
        }).catch(done)
      })
  })
*/
})

