<template lang="pug">
.container
  .banner-wraper#banner-wraper(ref="bannerWraper" :style="{width: bannerWraperWidth}"
  @touchstart="touchStartHandler"
  @touchmove="touchmoveHandler"
  @touchend="touchEndHandler")
    .banner-1.banner
    .banner-2.banner
    .banner-3.banner
      span#go(@touchend="enterApp") 进入应用
  #dot-box
    li.dot-not-curr(:class="{dotCurr: isCurrent[0]}")
    li.dot-not-curr(:class="{dotCurr: isCurrent[1]}")
    li.dot-not-curr(:class="{dotCurr: isCurrent[2]}")
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      startX: 0,
      startLeft: 0,
      endX: 0,
      moveX: 0,
      slideCurr: 0,
      isCurrent: [true, false, false],
      bannerWraperWidth: document.body.scrollWidth * 3 + 'px'
    }
  },
  methods: {
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
    enterApp () {
      window.LoginNative.login()
    }
  }
}
</script>

<style lang="sass">
#app
  height: 100%;
html, body, ul, li
  margin: 0;
  padding: 0;
html, body 
  width: 100%;
  height: 100%;

.container
  position: relative;
  overflow: hidden;
  height: 100%;
  bottom: 0;
  top: 0;
  .banner-wraper
    position: absolute;
    left: 0;
    top: 0;
    padding: 0;
    margin: 0;
    height: 100%;
    transition: all .2s ease-in-out;
    .banner
      float: left; 
      height: 100%;
      width: 33.33333333%;
    .banner-1
      background: url("../assets/tab1.jpeg");
      background-size: 100% 100%;
    .banner-2
      background: url("../assets/tab2.jpeg");
      background-size: 100% 100%;
    .banner-3
      position: relative;
      background: url("../assets/tab3.jpeg");
      background-size: 100% 100%;
      #go
        position: absolute;
        bottom: 15%;
        left: 50%;
        padding: 10px 18px;
        transform: translate(-50%, 0);
        background: #12b7f5;
        color: #fff;
        border-radius: 5px;
        font-size: .16rem;
        box-shadow: 0 0 2px #fff;
  #dot-box
    position: absolute;
    left: 50%;
    bottom: 5%;
    transform: translate(-50%, 0);
    li
      float: left;
      width: .1rem;
      height: .1rem;
      margin: .05rem;
      border-radius: 50%;
      list-style: none;
    .dot-not-curr
      background: #eee;
    .dotCurr
      background: #12b7f5;
</style>
