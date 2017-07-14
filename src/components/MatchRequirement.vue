<template lang="pug">
div.match-requirement
  div.toolbar
    span.back(@click="$router.replace('/basic-info')") 返回
    span.title 选择匹配要求
    span.place-holder 占位
  div.age-and-sex
    div#title
      span 为我匹配
    div#age
      span 年龄
      div
        vue-slider(v-model="ageRange", :min="15", :max="50")
    div#sex
      span 性别
      div
        span#boy(:class="sex === 0 ? 'blue-text' : ''", @click="sex = 0") 男 ♂
        span#girl(:class="sex === 1 ? 'red-text' : ''", @click="sex = 1") 女 ♀
    button#next(@click="uploadRequirement") 下一步
  div.tips 点击开始聊天即代表同意《绪聊用户协议》
</template>

<script>
import VueSlider from 'vue-slider-component'
import axios from 'axios'

export default {
  name: 'match-requirement',
  components: {
    VueSlider
  },
  data () {
    return {
      ageRange: [15, 50],
      sex: -1
    }
  },
  methods: {
    uploadRequirement () {
      if (this.sex === -1) {
        alert('请选择性别')
        return
      }
      // 提交表单
      let data = new window.FormData()
      data.append('openid', sessionStorage.openid)
      data.append('avatarurl', sessionStorage.avatarurl)
      data.append('username', sessionStorage.username)
      data.append('userprovince', sessionStorage.userprovince)
      data.append('usercity', sessionStorage.usercity)
      data.append('userage', Number.parseInt(sessionStorage.userage))
      data.append('usersex', Number.parseInt(sessionStorage.usersex))
      data.append('matchminage', this.ageRange[0])
      data.append('matchmaxage', this.ageRange[1])
      data.append('matchsex', this.sex)
      axios.post('/index.php/login/userlogin', data).then(res => {
        if (res.status === 200) {
          this.$router.replace('/main-page')
        }
      }).catch(e => {
        console.log(e)
        alert('提交匹配要求失败，请重新尝试')
      })
    }
  },
  mounted () {
    var dots = document.querySelectorAll('.vue-slider-dot')
    dots[0].setAttribute('style', 'width: 30px; height: 30px; top: -12px; transition-duration: 0s; transform: translateX(-8px);')
    dots[1].setAttribute('style', 'width: 30px; height: 30px; top: -12px; transition-duration: 0s; transform: translateX(-8px);')
  }
}
</script>

<style lang="sass">
.match-requirement
  height: 100%
  .toolbar
    height: .6rem
    background: rgb(35, 36, 40)
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
    margin-top: 1rem
    padding: 0 .2rem
    display: flex
    flex-direction: column
    justify-content: center
    #age, #sex, #title
      padding: .2rem 0
      border-bottom: .01rem solid #888
      font-size: .18rem
      display: flex
      > span
        margin-right: .2rem
      > div
        flex-grow: 1
    #title span
      font-size: .15rem
    #sex, #age
      margin-top: .35rem
    #sex
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
  .tips
    font-size: .12rem
    color: #888
    text-align: center
    padding: .2rem
</style>
