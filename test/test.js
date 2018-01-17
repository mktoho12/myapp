'use strict'

import assert from 'assert'
import bcrypt from 'bcrypt'
import request from 'supertest'

import app from '../src/app'

const User = app.db.models.User

before(() =>
  app.db.sync()
)

after(() =>
  app.db.close()
)

describe('/users', () => {
  before(() =>
    User.create({
      email: 'test@gmail.com',
      name: 'テストユーザー',
      password_hash: bcrypt.hashSync('password', 10)
    })
  )

  after(async () => {
    const users = await User.findAll({
      where: { email: 'test@gmail.com' }
    })
    return Promise.all(users.map(user => user.destroy()))
  })

  it('ユーザー一覧に表示される', () =>
    request(app)
      .get('/users')
      .expect(200)
      .expect(/テストユーザー/)
  )

  it('アカウント作成でユーザーが登録される', async () => {
    await request(app)
      .post('/users')
      .send({
        username: 'テストユーザー2',
        password: 'password',
        email: 'test2@gmail.com'
      })
      .expect(302)
      .expect('Location', '/users')
      .then()
    const user = await User.findByEmail('test2@gmail.com')
    assert.equal(user.name, 'テストユーザー2')
    assert.ok(bcrypt.compareSync('password', user.password_hash))
    await user.destroy()
  })

  it('パスワードのチェック', async () => {
    const user = await User.findByEmail('test@gmail.com')
    assert.ok(await user.verifyPassword('password'))
  })

  it('メールアドレスで検索', async () => {
    const user = await User.findByEmail('test@gmail.com')
    assert.equal(user.name, 'テストユーザー')
  })
})
