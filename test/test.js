'use strict'

const assert = require('assert')
const bcrypt = require('bcrypt')
const request = require('supertest')

const app = require('../app')
const sequelize = require('../models/sequelize-loader').database
const User = require('../models/user')

before(() => 
  sequelize.sync()
)

after(() =>
  sequelize.close()
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
    User.findAll({
      where: { email: 'test@gmail.com' }
    })
    .then(users => 
      Promise.all(users.map(user => user.destroy()))
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
        username: 'テストユーザー2',
        password: 'password',
        email: 'test2@gmail.com'
      })
      .expect(302)
      .expect('Location', '/users')
      .then(() =>
        User.findOne({ where: { email: 'test2@gmail.com' } })
      )
      .then(user => {
        assert.equal(user.name, 'テストユーザー2')
        assert.ok(bcrypt.compareSync('password', user.password_hash))
        return user.destroy()
      })
  )

})

