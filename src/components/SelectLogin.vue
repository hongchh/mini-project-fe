<template lang="pug">
div.select-login
  div.toolbar
    span.title 选择登录方式
  div.methods
    button(@click="login") QQ登录
</template>

<script>
export default {
  name: 'select-login',
  methods: {
    login () {
      window.LoginNative.login()
    }
  }
}
</script>

<style lang="sass">
.select-login
  height: 100%
  .toolbar
    height: .6rem
    background: #12b7f5
    display: flex
    align-items: center
    padding: 0 .2rem
    .title
      color: white
      font-size: .2rem
      flex-grow: 1
      text-align: center
  .methods
    padding: .2rem
    button
      width: 100%
      margin-top: 2.5rem
      background: #12b7f5
      font-size: .15rem
      border: none
      border-radius: .3rem
      padding: .1rem
      color: white
      outline: none
</style>
