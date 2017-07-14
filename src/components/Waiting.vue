<template lang="pug">
div.waiting
  spinner(:size="50")
  span 匹配中
  div#success-log
  img(src="../assets/star-on.png", v-for="i in 7")
</template>

<script>
import Spinner from 'vue-simple-spinner'
// import axios from 'axios'

export default {
  name: 'waiting',
  components: {
    Spinner
  },
  methods: {
    chat (data) {
      let style = 'transform: scale(1.2); opacity: 1;'
      document.getElementById('success-log').setAttribute('style', style)
      setTimeout(() => {
        document.getElementById('success-log').setAttribute('style', 'transform: scale(0.8); opacity: 1;')
        let stars = document.querySelectorAll('img')
        for (let i = 0; i < stars.length; ++i) {
          let top = -20 + (i % 2 === 0 ? -5 : 5)
          let left = 16 * i
          stars[i].setAttribute('style', 'top: ' + top + '%; opacity: 1; left: ' + left + '%')
        }
        setTimeout(() => {
          window.TalkNative.talkWith(data.openid, data.nickname)
        }, 1000)
      }, 500)
    }
  },
  mounted () {
    console.log(this.$route.query.tags)
    // TODO: 发送请求给服务器获取匹配对象, 调起Native聊天
    this.chat({
      openid: '0000',
      nickname: '开心的小猪'
    })
    // axios.get('/index.php/mood/getMatchedUser').then(res => {
    //   console.log(res.data.data)
    //   this.chat(res.data.data)
    // }).catch(e => {
    //   console.log(e)
    //   alert('匹配失败')
    // })
  }
}
</script>

<style lang="sass">
.waiting
  height: 100%
  display: flex
  justify-content: center
  flex-direction: column
  align-items: center
  span
    font-size: .2rem
    color: #888
    margin-top: .2rem
  #success-log
    width: 60%
    height: 60%
    background: url(../assets/QQ.jpg)
    background-size: 100% 100%
    position: absolute
    left: 20%
    top: 20%
    transition: all 1s
    opacity: 0
    transform: scale(0.5)
  img
    width: .3rem
    height: .3rem
    position: absolute
    top: 80%
    left: 50%
    opacity: 0
    transition: all 2s
</style>
