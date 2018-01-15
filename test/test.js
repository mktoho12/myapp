'use strict'

const assert = require('assert')
const bcrypt = require('bcrypt')
const request = require('supertest')

const app = require('../app')
const database = require('../models/sequelize-loader').database
const User = require('../models/user')

before(() => 
  database.sync()
)

after(() =>
  database.close()
)

describe('/users', () => {

  before(() => 
    User.create({
      email: 'test@gmail.com',
      name: 'テストユーザー',
      password_hash: bcrypt.hashSync('password', 10)
    })
  )

  after(() => 
    User.findOne({
      where: { email: 'test@gmail.com' }
    })
    .then(user =>
      user.destroy()
    )
  )

  it('ユーザー一覧に表示される', () => 
    request(app)
      .get('/users')
      .expect(/テストユーザー/)
      .expect(200)
  )

  it('アカウント作成でユーザーが登録される', () =>
    request(app)
      .post('/users')
      .send({
        username: 'テストユーザー3',
        password: 'password',
        email: 'test2@gmail.com'
      })
      .expect(302)
      .end((err, res) => {
        if (err) assert.ng()
        return User.findOne({ where: { email: 'test2@gmail.com' } }).then(user => {
          assert.equal(user.name, 'テストユーザー3')
          assert.ok(bcrypt.compareSync('password', user.password_hash))
          return user.destroy()
        })
      })
  )
})

