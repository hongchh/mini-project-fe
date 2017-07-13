<template lang="pug">
  div(:class="isShowMenu ? 'user-menu showMenu' : 'user-menu'")
    div(:class="isPrefer || isCount ? 'tab-wraper prefer' : 'tab-wraper'" @click.stop="")
      div.tab-1.tab
        p(@click.stop="hideMenu") < 返回
        ul
          li(@click.stop="isPrefer = true") 偏好设置
          li(@click.stop="isCount = true") 账户
          li 分享给朋友
      div(:class="isPrefer ? 'tab' : 'tab prefer-hide'")
        p(@click.stop="lastMenu") < 返回
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
      div(:class="isCount ? ' tab-3 tab tab3-show' : 'tab-3 tab'")
        p(@click.stop="lastMenu") < 返回
        div.count-money
          span 账户
          span.money {{countMoney}}
        div
          span 累计收入
          span.money {{totalIncome}}
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
      ageRange: [0, 100],
      sex: -1,
      countMoney: '￥' + 12.98,
      totalIncome: '￥' + 52.88
    }
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
    updateUserInfo () {
      if (this.sex === -1) {
        alert('请选择性别')
      }
      // 提交表单
      axios.post('/login', {
        matchminage: this.ageRange[0],
        matchmaxage: this.ageRange[1],
        matchsex: this.sex
      }).then(res => {
        if (res.status === 200) {
          this.hideMenu()
          // this.$router.push('/main-page')
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
  left: -100%
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
    width: 200%
    height: 100%
    overflow: hidden
    transition: all .8s ease-out
    .tab
      float: left
      padding: 5%
      width: 40%
    .tab-1
      li
        padding: .1rem
      span 
        display: inline-block
        width: .03rem
        height: .03rem
        background: #ffffff
    .tab-3
      position: absolute
      right: 0
      display: none
      .count-money
        margin-top: .2rem
      div
        padding: .2rem
        .money
          float: right
    .tab3-show
        display: block  
  .prefer
    transform: translate(-50%, 0)
  .prefer-hide
    display: none
.showMenu
  left: 0

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
      margin-top: .1rem
      background: #12b7f5
      font-size: .15rem
      border: none
      border-radius: .3rem
      padding: .08rem
      color: white
      outline: none
</style>
