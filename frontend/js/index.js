'use strict'

import Vue from 'vue'
import bootstrap from 'bootstrap'
import validator from 'validator'
import _ from 'lodash'
import axios from 'axios'

const username = new Vue({
  el: '#username',
  data: {
    username: '',
    message: '',
    valid: null
  },
  watch: {
    username: function(val) {
      if(val.trim() === '') {
        this.message = '名前を入力してください'
        this.valid = false
      } else if(val.trim().length > 10) {
        this.message = '10文字以内で入力してください'
        this.valid = false
      } else {
        this.message = ''
        this.valid = true
      }
    }
  }
})

const password = new Vue({
  el: '#password',
  data: {
    password: '',
    message: '',
    valid: null
  },
  watch: {
    password: function(val) {
      if(val.trim() === '') {
        this.message = 'パスワードを入力してください'
        this.valid = false
      } else if(val.trim().length < 8) {
        this.message = '8文字以上で入力してください'
        this.valid = false
      } else {
        this.message = ''
        this.valid = true
      }
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
    email: _.debounce(async function(val) {
      if(val.trim() === '') {
        this.message = 'メールアドレスを入力してください'
        this.valid = false
      } else if(!validator.isEmail(val.trim())) {
        this.message = '有効なメールアドレスを入力してください'
        this.valid = false
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
          this.valid = false
        } else {
          this.message = ''
          this.valid = true
        }
      }
    }, 1000)
  }
})

