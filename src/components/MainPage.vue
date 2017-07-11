<template lang="pug">
div.main-page
  div(:class="isShowMenu ? 'user-menu showMenu' : 'user-menu'")
    div(:class="isPrefer || isCount ? 'tab-wraper prefer' : 'tab-wraper'")
      div.tab-1.tab
        p(@click="hideMenu") < 返回
        ul
          li(@click="setPrefer") 偏好设置
          li(@click="userCount") 账户
          li 分享给朋友
      div(:class="isPrefer ? 'tab-2 tab' : 'tab-2 tab prefer-hide'")
        p(@click="lastMenu") < 返回
        .info
          div#title
            span 为我匹配
          div#age
            span 年龄
            div
              vue-slider(v-model="ageRange")
          div#sex
            span 性别
            div
              span#boy(:class="sex === 0 ? 'blue-text' : ''", @click="sex = 0") 男 ♂
              span#girl(:class="sex === 1 ? 'red-text' : ''", @click="sex = 1") 女 ♀
      div(:class="isCount ? ' tab-3 tab tab3-show' : 'tab-3 tab'")
        p(@click="lastMenu") < 返回
        div
          span 账户
          span.money {{countMoney}}
        div
          span 累计收入
          span.money {{totalIncome}}

  div.user-mini-photo
    img(:class="isShowMenu ? 'move-right' : ''" src="../assets/QQ.jpg" @click="showMenu")
  img.user-photo(src="../assets/QQ.jpg")
  button(@click="takePhoto") 拍照并上传
</template>

<script>
import VueSlider from 'vue-slider-component'
export default {
  name: 'main-page',
  components: {
    VueSlider
  },
  data () {
    return {
      isShowMenu: false,
      isPrefer: false,
      isCount: false,
      ageRange: [0, 100],
      sex: -1,

      countMoney: '￥' + 12.98,
      totalIncome: '￥' + 52.88
    }
  },
  methods: {
    takePhoto () {
      console.log('take photo')
      // window.PhotoNative.takePhoto()
    },
    showMenu () {
      this.isShowMenu = !this.isShowMenu
    },
    hideMenu () {
      this.isShowMenu = false
    },
    setPrefer () {
      this.isPrefer = true
    },
    userCount () {
      this.isCount = true
    },
    lastMenu () {
      this.isCount = false
      this.isPrefer = false
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
.main-page
  height: 100%
  display: flex
  flex-direction: column
  justify-content: space-between
  box-sizing: border-box
  padding: .1rem .2rem
  .user-menu
    position: absolute
    top: 0
    left: -800px
    z-index: 999
    overflow: hidden
    width: 80%
    font-size: .15rem
    background: #000000
    color: #ffffff
    transition: all 1s ease-out
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
  .user-mini-photo
    position: relative
    height: .5rem
    z-index: 998
    img
      position: absolute
      left: 0
      width: .5rem
      height: .5rem
      border: 1px solid #eee
      border-radius: 50%
      transition: all .5s ease-out
    .move-right
      left: 85%
  .user-photo
    //flex-grow: 1
    border: .01rem solid #888
  button
    width: 100%
    background: #12b7f5
    //margin-top: .3rem
    font-size: .15rem
    border: none
    border-radius: .3rem
    padding: .1rem
    color: white
    outline: none

.info
  flex-grow: 1
  padding: 0 .2rem
  display: flex
  flex-direction: column
  justify-content: center
  #age, #sex, #title
    padding: .1rem 0
    border-bottom: .01rem solid #888
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
</style>
