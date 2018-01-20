'use strict'

import Vue from 'vue'
import validator from 'validator'
import _ from 'lodash'
import axios from 'axios'
import zxcvbn from 'zxcvbn'
import anime from 'animejs'

const username = new Vue({
  el: '#username',
  data: {
    username: '',
    message: '',
    valid: null
  },
  watch: {
    username: function (val) {
      if (val.trim() === '') {
        this.message = '名前を入力してください'
      } else if (val.trim().length > 10) {
        this.message = '10文字以内で入力してください'
      } else {
        this.message = ''
      }
      this.valid = this.message === ''
    }
  }
})

const password = new Vue({
  el: '#password',
  data: {
    password: '',
    message: '',
    valid: null,
    score: 0,
    passwordStrength: {width: 0}
  },
  watch: {
    password(val) {
      this.score = zxcvbn(val).score
      if (val.trim() === '') {
        this.message = 'パスワードを入力してください'
      } else if (val.trim().length < 6) {
        this.message = 'パスワードは6文字以上にしてください'
      } else if (zxcvbn(val.trim()).score < 2) {
        this.message = 'もっと複雑なパスワードを入力してください'
      } else {
        this.message = ''
      }
      this.valid = this.message === ''
    },
    score(val) {
      this.passwordStrength = {width: `${val * 50 / 4}px`}
    }
  }
})

const email = new Vue({
  el: '#email',
  data: {
    email: '',
    message: '',
    valid: null,
    loading: false
  },
  watch: {
    email: _.debounce(async function (val) {
      if (val.trim() === '') {
        this.message = 'メールアドレスを入力してください'
      } else if (!validator.isEmail(val.trim())) {
        this.message = '有効なメールアドレスを入力してください'
      } else {
        this.valid = null
        this.loading = true
        const res = await axios.get('/api/email/exists', {
          params: {
            email: val
          }
        })
        this.loading = false
        if (res.data.status === 'ok' && res.data.result === true) {
          this.message = 'メールアドレスは既に使われています'
        } else {
          this.message = ''
        }
      }
      this.valid = this.message === ''
    }, 1000)
  }
})

document.getElementById('signup-form').addEventListener('submit', event => {
  if (!username.valid || !password.valid || !email.valid) {
    anime({
      targets: '#btn-submit',
      translateX: [
        { value: -10, duration: 50, elasticity: 0 },
        { value: 10, duration: 50, elasticity: 0 },
        { value: -10, duration: 50, elasticity: 0 },
        { value: 10, duration: 50, elasticity: 0 },
        { value: 0, duration: 50, elasticity: 0 }
      ]
    })
    event.preventDefault()
  }
})

