<template lang="pug">
  div(:style="{height: tabWraperHeight  + 'px'}" :class="isShowMenu ? 'user-menu showMenu' : 'user-menu'")
    div(:style="{height: tabWraperHeight  + 'px'}" :class="isPrefer || isCount ? 'tab-wraper tab-1-hide' : 'tab-wraper tab-1'" @click.stop="")
      div.tab-1.tab
        p(@click.stop="hideMenu") < 返回
        ul
          li(@click.stop="isPrefer = true") 偏好设置
          li(@click.stop="isCount = true") 账户
          li(@click.stop="moodMap") 心情图谱
          li 分享给朋友
      div(:class="isPrefer ? 'tab tab-2-show' : 'tab tab-2'" ref="tab2")
        p(@click.stop="isPrefer = false") < 返回
        .info
          div.title
            span 为我匹配
          div.age
            span 年龄
            div
              vue-slider(v-model="ageRange", :min="15", :max="50")
          div.sex
            span 性别
            div
              span.boy(:class="sex === 0 ? 'blue-text' : ''", @click.stop="sex = 0") 男 ♂
              span.girl(:class="sex === 1 ? 'red-text' : ''", @click.stop="sex = 1") 女 ♀
          button.next(@click="updateUserInfo")  确定
      div(:class="isCount ? 'tab tab-3 tab-3-show' : 'tab-3 tab tab-3-hide'")
        p(@click.stop="isCount = false") < 返回
        div.count-money
          span 账户
          span.money {{countMoney}}
        div
          span 累计收入
          span.money {{totalIncome}}
      div(:class="isMood ? 'tab tab-4 tab-4-show' : 'tab tab-4'")
        p(@click.stop="moodBack") < 返回
        div.content
          p 心情图谱
          p 你这个月的心情图谱是
          p.mood {{ currentData.mood }}
          p {{ currentData.content }}
          div.img-container
            a(:href="currentData.url || ''")
              img(:src="currentData.imgs[0].src || ''", :alt="currentData.imgs[0].alt")
            a(:href="currentData.url[1]")
              img(:src="currentData.imgs[1].src", :alt="currentData.imgs[1].alt")
</template>

<script>
import VueSlider from 'vue-slider-component'
import axios from 'axios'
import Con from '../config.js'
export default {
  name: 'user-menu',
  components: {
    VueSlider
  },
  props: {
    isShowMenu: false
  },
  mounted () {
    this.tabWraperHeight = this.$refs.tab2.offsetHeight
    var dots = document.querySelectorAll('.vue-slider-dot')
    dots[0].setAttribute('style', 'width: 30px; height: 30px; top: -12px; transition-duration: 0s; transform: translateX(-8px);')
    dots[1].setAttribute('style', 'width: 30px; height: 30px; top: -12px; transition-duration: 0s; transform: translateX(-8px);')
  },
  data () {
    return {
      isPrefer: false,
      isCount: false,
      isMood: false,
      ageRange: [15, 50],
      sex: -1,
      countMoney: '',
      totalIncome: '',
      tabWraperHeight: 0,
      currentData: Con.monthMood['default']
    }
  },
  created () {
    this.getCount()
    this.getMood()
  },
  methods: {
    hideMenu () {
      this.$emit('parentHideMenu', false)
      this.isShowMenu = false
    },
    lastMenu () {
      this.isCount = false
      this.isPrefer = false
    },
    moodMap () {
      this.isMood = true
      this.tabWraperHeight = this.tabWraperHeight * 2
    },
    moodBack () {
      this.isMood = false
      this.tabWraperHeight = this.tabWraperHeight / 2
    },
    getMood () {
      let monthMoodUrl = '/index.php/mood/getRecentMood/' + this.$route.query.openid
      let self = this
      axios.get(monthMoodUrl).then(res => {
        if (res.status === 200) {
          let ret = res.data.data[0]
          console.log(ret)
          if (ret < 24) {
            self.currentData = Con.monthMood['sad']
          } else if (ret < 49) {
            self.currentData = Con.monthMood['normal']
          } else if (ret < 64) {
            self.currentData = Con.monthMood['happy']
          } else if (res <= 100) {
            self.currentData = Con.monthMood['exciting']
          } else {
            self.currentData = Con.monthMood['default']
          }
        }
      }).catch(e => {
        console.log(e)
      })
    },
    getCount () {
      let self = this
      axios.get('/index.php/value/getcount/' + self.$route.query.openid).then(res => {
        if (res.status === 200) {
          console.log(res.data.data)
          this.countMoney = '￥' + res.data.data.count
          this.totalIncome = '￥' + res.data.data.income
        }
      })
    },
    updateUserInfo () {
      if (this.sex === -1) {
        alert('请选择性别')
      }
      // 提交表单
      let data = new window.FormData()
      data.append('openid', this.$route.query.openid)
      data.append('matchminage', this.ageRange[0])
      data.append('matchmaxage', this.ageRange[1])
      data.append('matchsex', this.sex)
      axios.post('/index.php/PersonCenter/modify', data).then(res => {
        if (res.status === 200) {
          this.hideMenu()
        }
      }).catch(e => {
        console.log(e)
        alert('提交匹配要求失败，请重新尝试')
      })
    }
  }
}
</script>

<style lang="sass">
ul 
  list-style-type: square
p
  padding: 0
  margin: 0

.user-menu
  position: absolute
  top: 0
  top: -100%
  left: 0
  z-index: 999
  overflow: hidden
  width: 80%
  font-size: .15rem
  background: #000000
  color: #ffffff
  border-radius: 4px
  box-shadow: 0 0 6px #d3d3d3
  transition: all .8s ease-out
  .tab-wraper
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    transition: all .8s ease-out
    .tab
      position: absolute
      top: 0
      left: 0
      width: 100%
      background: #000
      p
        padding: .1rem
    .tab-1
      position: absolute
      z-index: 1
      height: 100%
      li
        padding: .1rem
      span 
        display: inline-block
        width: .03rem
        height: .03rem
        background: #ffffff
    .tab-1-hide
      z-index: -1
    .tab-2
      z-index: -1
    .tab-2-show
      z-index: 1
    .tab-3
      position: absolute
      height: 100%
      .count-money
        margin-top: .2rem
      div
        padding: .2rem
        .money
          float: right
    .tab-3-hide
      z-index: -2
    .tab-3-show
      z-index: 1 
    .tab-4
      position: absolute
      height: 100%
    .tab-4-show
      z-index: 1
    .tab-4-hide
      z-index: -1
    .content
      text-align: center
      padding: 0 .2rem
      height: 100%
      .img-container
        position: absolute
        bottom: .1rem
      .mood
        border-bottom: 1px solid #fff
      a
        padding: 5%
      img
        width: 40%
  .prefer
    transform: translate(-50%, 0)
  .prefer-hide
.showMenu
  top: 0

.info
  flex-grow: 1
  padding: 0 .2rem
  display: flex
  flex-direction: column
  justify-content: center
  .age, .sex, .title
    padding: .1rem 0
    border-bottom: .01rem solid #888
    display: flex
    > span
      margin-right: .2rem
    > div
      flex-grow: 1
  .title span
    font-size: .15rem
  .sex, .age
    margin-top: .35rem
  .sex
    > div
      display: flex
      justify-content: space-around
    .boy, .girl
      color: #888
    .boy.blue-text
      color: #25a4d4
    .girl.red-text
      color: #faa523
  .next
      width: 100%
      margin: .1rem 0
      background: rgb(255, 175, 2)
      font-size: .15rem
      border: none
      border-radius: .3rem
      padding: .08rem
      color: white
      outline: none
</style>
