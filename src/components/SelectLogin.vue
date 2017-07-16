<template lang="pug">
div.select-login
  div.toolbar
    span.title 选择登录方式
  img(src="../assets/QQ.jpg")
  div.methods
    button(@touchend="login") QQ登录
  spinner.spinner(:size="50")
</template>

<script>
import Spinner from 'vue-simple-spinner'

export default {
  name: 'select-login',
  components: {
    Spinner
  },
  mounted () {
    console.log(2333)
  },
  methods: {
    login () {
      console.log('select-login')
      document.querySelector('.spinner').setAttribute('style', 'text-align: right; display: block;')
      window.LoginNative.login()
    }
  }
}
</script>

<style lang="sass">
.select-login
  height: 100%
  position: relative
  .toolbar
    height: .6rem
    background: rgb(35, 36, 40)
    display: flex
    align-items: center
    padding: 0 .2rem
    .title
      color: white
      font-size: .2rem
      flex-grow: 1
      text-align: center
  img
    width: 1.5rem
    height: 1.5rem
    display: block
    margin: .5rem auto
  .methods
    padding: .2rem
    button
      width: 100%
      margin-top: 1rem
      background: rgb(255, 175, 2)
      font-size: .15rem
      border: none
      border-radius: .3rem
      padding: .1rem
      color: white
      outline: none
      z-index: 999
  .spinner
    position: absolute
    bottom: .3rem
    width: 100%
    display: none
</style>
