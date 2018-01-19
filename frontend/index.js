'use strict'

import Vue from 'vue'

const username = new Vue({
  el: '#username',
  data: {
    username: '',
    message: ''
  },
  watch: {
    username: function(val) {
      if(val.trim() === '') {
        this.message = '名前を入力してください'
      } else if(val.trim().length > 10) {
        this.message = '10文字以内で入力してください'
      } else {
        this.message = '✔'
      }
    }
  }
})

