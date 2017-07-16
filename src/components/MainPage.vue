<template lang="pug">
div.wraper
  div.toolbar
    span.title 拍照上传
  div.main-page(@click.prevent="isShowMenu = false")
    UserMenu(:isShowMenu="isShowMenu" @parentHideMenu="hideMenu")
    div.user-mini-photo
      img(:class="isShowMenu ? 'move-right' : ''" src="../assets/logo.jpg" @click.stop="showMenu")
    div.ad-container(ref="adContainer")
      .banner-wraper(ref="bannerWraper" :style="{width: adwraperWidth}"
      @touchstart="touchStartHandler"
      @touchmove="touchmoveHandler"
      @touchend="touchEndHandler")
        .banner-1.banner
        .banner-2.banner
        .banner-3.banner
      #dot-box
        li.dot-not-curr(:class="{dotCurr: isCurrent[0]}")
        li.dot-not-curr(:class="{dotCurr: isCurrent[1]}")
        li.dot-not-curr(:class="{dotCurr: isCurrent[2]}")
    button(@click="takePhoto") {{ action }}
  spinner.spinner(:size="50")
</template>

<script>
import UserMenu from './UserMenu'
import Spinner from 'vue-simple-spinner'

export default {
  name: 'main-page',
  components: {
    UserMenu,
    Spinner
  },
  data () {
    return {
      action: Number.parseInt(this.$route.query.error) === 1 ? '照片无效请重拍' : '拍照并上传',
      isShowMenu: false,
      adwraperWidth: 0,
      startX: 0,
      startLeft: 0,
      endX: 0,
      moveX: 0,
      slideCurr: 0,
      isCurrent: [true, false, false],
      timer: null
    }
  },
  methods: {
    takePhoto () {
      if (this.action === '照片上传中...') return
      document.querySelector('.spinner').setAttribute('style', 'text-align: right; opacity: 1;')
      this.action = '照片上传中...'
      window.PhotoNative.takePhoto()
    },
    showMenu () {
      this.isShowMenu = !this.isShowMenu
    },
    hideMenu (data) {
      this.isShowMenu = data
    },
    touchStartHandler (e) {
      this.startX = e.changedTouches[0].pageX
      this.startLeft = this.$refs.bannerWraper.offsetLeft
    },
    touchmoveHandler (e) {
      this.endX = e.changedTouches[0].pageX
      this.moveX = this.endX - this.startX
      this.$refs.bannerWraper.style.left = this.startLeft + this.moveX + 'px'
    },
    touchEndHandler (e) {
      if (e.target.id === 'go') return
      if (this.moveX > 0) {
        this.slideCurr --
      } else if (this.moveX < 0) {
        this.slideCurr ++
      }
      this.slideCurr = this.slideCurr < 0 ? 0 : this.slideCurr
      this.slideCurr = this.slideCurr > 2 ? 2 : this.slideCurr
      this.$refs.bannerWraper.style.left = -this.slideCurr * 100 + '%'
      this.isCurrent = this.isCurrent.map(function (item) {
        return false
      })
      this.isCurrent[this.slideCurr] = true
    },
    anim () {
      this.timer = setInterval(() => {
        if (this.slideCurr < 2) {
          this.slideCurr ++
          this.$refs.bannerWraper.style.left = -this.slideCurr * 100 + '%'
        } else {
          this.$refs.bannerWraper.style.left = 0
          this.slideCurr = 0
        }
        this.isCurrent = this.isCurrent.map(function (item) {
          return false
        })
        this.isCurrent[this.slideCurr] = true
      }, 3000)
    }
  },
  mounted () {
    this.adwraperWidth = this.$refs.adContainer.offsetWidth * 3 + 'px'
    this.anim()
  },
  destroyed () {
    clearInterval(this.timer)
  }
}
</script>

<style lang="sass">
ul 
  list-style-type: square
p
  padding: 0
  margin: 0
.wraper
  height: 100%
  position: relative
  .toolbar
    position: absolute
    padding: .18rem 0
    background: rgb(35, 36, 40)
    text-align: center
    width: 100%
    font-size: .15rem
    span
      color: white
.main-page
  height: 100%
  display: flex
  flex-direction: column
  justify-content: space-between
  box-sizing: border-box
  padding: 0 .2rem .1rem
  .ad-container
    position: relative
    overflow: hidden
    margin: .2rem 0
    height: 100%
    width: 100%
    border-radius: 5px
    .banner-wraper
      position: absolute
      left: 0
      top: 0
      padding: 0
      margin: 0
      height: 100%
      transition: all .2s ease-in-out
      .banner
        float: left 
        height: 100%
        width: 33.33333333%
      .banner-1
        background: url("../assets/adver1.jpg") no-repeat
        background-size: cover
      .banner-2
        background: url("../assets/adver2.jpg") no-repeat
        background-size: cover
      .banner-3
        position: relative
        background: url("../assets/adver3.jpg") no-repeat
        background-size: cover
    .ad-wraper
      height: 100%
    img
      width: 100%
      height: 100%
  #dot-box
    position: absolute
    left: 50%
    bottom: 5%
    transform: translate(-50%, 0)
    li
      float: left
      width: .05rem
      height: .05rem
      margin: .05rem
      border-radius: 50%
      list-style: none
    .dot-not-curr
      background: #eee
    .dotCurr
      background: #12b7f5
  .user-mini-photo
    position: relative
    height: .5rem
    z-index: 998
    img
      position: absolute
      left: 0
      top: .03rem
      width: .5rem
      height: .5rem
      border: 1px solid #eee
      border-radius: 50%
      transition: all .8s ease-out
    .move-right
      left: 85%
  button
    width: 100%
    background: rgb(255, 175, 2)
    font-size: .15rem
    border: none
    border-radius: .3rem
    padding: .1rem
    color: white
    outline: none
.spinner
  position: absolute
  top: 50%
  width: 100%
  opacity: 0
</style>
