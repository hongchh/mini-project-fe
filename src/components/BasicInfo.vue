<template lang="pug">
div.basic-info
  div.toolbar
    span.back(@click="relogin") 返回
    span.title 填写资料
    span.place-holder 占位
  div.age-and-sex
    div#age
      span 年龄
      div
        vue-slider(v-model="age")
    div#sex
      span 性别
      div
        span#boy(:class="sex === 0 ? 'blue-text' : ''", @click="sex = 0") 男 ♂
        span#girl(:class="sex === 1 ? 'red-text' : ''", @click="sex = 1") 女 ♀
    button#next(@click="setBasicInfo") 下一步
</template>

<script>
import VueSlider from 'vue-slider-component'

export default {
  name: 'basic-info',
  components: {
    VueSlider
  },
  data () {
    return {
      age: 0,
      sex: -1,
      showDialog: false,
      dialogContent: ''
    }
  },
  methods: {
    setBasicInfo () {
      if (this.sex === -1) {
        alert('请选择性别')
        return
      }
      sessionStorage.openid = this.$route.query.openid
      sessionStorage.avatarurl = this.$route.query.avatarurl
      sessionStorage.username = this.$route.query.username
      sessionStorage.userprovince = this.$route.query.userprovince
      sessionStorage.usercity = this.$route.query.usercity
      sessionStorage.userage = this.age
      sessionStorage.usersex = this.sex
      this.$router.replace('/match-requirement')
    },
    relogin () {
      window.LoginNative.login()
    }
  }
}
</script>

<style lang="sass">
.basic-info
  height: 100%
  .toolbar
    height: .6rem
    background: #12b7f5
    display: flex
    align-items: center
    padding: 0 .2rem
    span
      font-size: .15rem
      color: white
    .title
      font-size: .2rem
      flex-grow: 1
      text-align: center
    .place-holder
      opacity: 0
  .age-and-sex
    padding: 0 .2rem
    margin-top: 1rem
    #age, #sex
      padding: .2rem 0
      border-bottom: .01rem solid #888
      font-size: .2rem
      display: flex
      > span
        margin-right: .2rem
      > div
        flex-grow: 1
    #sex
      margin-top: .3rem
      > div
        display: flex
        justify-content: space-around
      #boy, #girl
        color: #888
      #boy.blue-text
        color: #25a4d4
      #girl.red-text
        color: #faa523
    #next
      width: 100%
      margin-top: 1rem
      background: #12b7f5
      font-size: .15rem
      border: none
      border-radius: .3rem
      padding: .1rem
      color: white
      outline: none
</style>
