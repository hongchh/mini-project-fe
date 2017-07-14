<template lang="pug">
div.main-page(@click.prevent="isShowMenu = false")
  UserMenu(:isShowMenu="isShowMenu" @parentHideMenu="hideMenu")
  div.user-mini-photo
    img(:class="isShowMenu ? 'move-right' : ''" src="../assets/QQ.jpg" @click.stop="showMenu")
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
</template>

<script>
import UserMenu from './UserMenu'
export default {
  name: 'main-page',
  components: {
    UserMenu
  },
  data () {
    return {
      action: this.$route.query.error ? '照片无效请重拍' : '拍照并上传',
      isShowMenu: false,
      adwraperWidth: 0,
      startX: 0,
      startLeft: 0,
      endX: 0,
      moveX: 0,
      slideCurr: 0,
      isCurrent: [true, false, false]
    }
  },
  methods: {
    takePhoto () {
      console.log('take photo')
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
    }
  },
  mounted () {
    this.adwraperWidth = this.$refs.adContainer.offsetWidth * 3 + 'px'
    console.log(this.adOnewidth)
    if (this.$route.query.photo) {
      document.getElementById('photo').setAttribute('src', this.$route.query.photo)
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
  .ad-container
    position: relative
    overflow: hidden
    margin: .2rem 0
    height: 100%
    width: 100%
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
        background: url("../assets/tab1.jpeg")
        background-size: 100% 100%
      .banner-2
        background: url("../assets/tab2.jpeg")
        background-size: 100% 100%
      .banner-3
        position: relative
        background: url("../assets/tab3.jpeg")
        background-size: 100% 100%
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
      width: .1rem
      height: .1rem
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
    //margin-top: .3rem
    font-size: .15rem
    border: none
    border-radius: .3rem
    padding: .1rem
    color: white
    outline: none
</style>
