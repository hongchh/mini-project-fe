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
              vue-slider(v-model="ageRange")
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
        p(@click.stop="isMood = false") < 返回
        div.content
          p 心情图谱
          p 你这个月的心情图谱是
          p 郁郁寡欢
          p 再计较的事，多年后看来也不过是个不足挂齿的玩笑，再悲伤的事，多年后想起也不过是段可供回忆的往事，再困难的事，多年后怎么都觉得轻而易举，不快的总会过去，心脏只有那么小，总会让开心占据多一点空间，把不开心统统扫到一边，毕竟它们不过是细小的尘埃而已
          div.img-container
            a(href="https://item.jd.com/11963221.html")
              img(src="../assets/left.jpg", alt="所有失去的都会以另一种方式归来")
            a(href="https://detail.tmall.com/item.htm?spm=a230r.1.14.62.ebb2eb2n2ZMbc&id=522784907853&ns=1&abbucket=19")
              img(src="../assets/right.jpg", alt="世界如此复杂，你要内心强大")
</template>

<script>
import VueSlider from 'vue-slider-component'
import axios from 'axios'
export default {
  name: 'user-menu',
  components: {
    VueSlider
  },
  props: {
    isShowMenu: false
  },
  data () {
    return {
      isPrefer: false,
      isCount: false,
      isMood: false,
      ageRange: [0, 100],
      sex: -1,
      countMoney: '￥' + 12.98,
      totalIncome: '￥' + 52.88,
      tabWraperHeight: 0
    }
  },
  mounted () {
    this.tabWraperHeight = this.$refs.tab2.offsetHeight
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
    .tab-4-show
      z-index: 1
    .tab-4-hide
      z-index: -1
    .content
      text-align: center
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
