<template lang="pug">
div.waiting
  div.xiaohua {{ xiaohua }}
  spinner.spinner(:size="50")
  span {{ word }}
  div#success-log
  img(src="../assets/star-on.png", v-for="i in 7")
</template>

<script>
import Spinner from 'vue-simple-spinner'
import axios from 'axios'

export default {
  name: 'waiting',
  components: {
    Spinner
  },
  data () {
    let expression = Number.parseInt(this.$route.query.expression || 0)
    let xiaohua = expression < 30 ? '和尚不能吃肉，好多都偏胖；道士可以吃肉，好多都是瘦子，我陷入了沉思。。。'
      : expression < 60 ? '职场就是这样，把自己累成狗的永远干不过那些把自己伪装成狗的。'
      : '“为什么大冷天人很难出被窝？”“因为冰系魔法通常带有禁锢效果。”'
    let word = '匹配中'
    return { xiaohua, word }
  },
  methods: {
    chat (openid, nickname) {
      let style = 'transform: scale(1.2); opacity: 1;'
      document.getElementById('success-log').setAttribute('style', style)
      document.querySelector('.spinner').setAttribute('style', 'display: none;')
      this.word = ''
      setTimeout(() => {
        document.getElementById('success-log').setAttribute('style', 'transform: scale(0.8); opacity: 1;')
        let stars = document.querySelectorAll('img')
        for (let i = 0; i < stars.length; ++i) {
          let top = -30 + (i % 2 === 0 ? -5 : 5)
          let left = 16 * i
          stars[i].setAttribute('style', 'top: ' + top + '%; opacity: 1; left: ' + left + '%')
        }
        setTimeout(() => {
          window.TalkNative.talkWith(openid, nickname)
        }, 1000)
      }, 500)
    },
    getMatch () {
      let data = new window.FormData()
      data.append('openid', this.$route.query.openid)
      axios.post('/index.php/mood/getmatch', data).then(res => {
        if (res.data.status === 200) {
          this.chat(res.data.data.idb, res.data.data.nickname)
        } else {
          setTimeout(() => { this.getMatch() }, 1000)
        }
      }).catch(e => {
        setTimeout(() => { this.getMatch() }, 1000)
      })
    }
  },
  mounted () {
    console.log(this.$route.query.tags)
    let data = new window.FormData()
    let tags = this.$route.query.tags.split(',')
    data.append('tag1', tags[0])
    data.append('likemood', tags[1])
    data.append('openid', this.$route.query.openid)
    axios.post('/index.php/mood/match', data).then(res => {
      console.log(res.data.data)
      this.getMatch()
    }).catch(e => {
      console.log(e)
      alert('匹配失败')
    })
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
  .xiaohua
    font-size: .2rem
    padding: .2rem
    margin-bottom: .2rem
    text-align: center
  span
    font-size: .2rem
    color: #888
    margin-top: .2rem
  #success-log
    width: 60%
    height: 30%
    background: url(../assets/congrats0.gif)
    background-size: 100% 100%
    position: absolute
    left: 20%
    top: 35%
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
