<template>
  <div class="container">
    <div class="banner-wraper" id="banner-wraper" 
      ref="bannerWraper" 
      :style="{width: bannerWraperWidth}"
      @touchstart="touchStartHandler"
      @touchmove="touchmoveHandler"
      @touchend="touchEndHandler">
      <div class="banner-1 banner"></div>
      <div class="banner-2 banner"></div>
      <div class="banner-3 banner">
        <a href="#" id="go">进入应用</a>
      </div>
    </div>
    <ul id="dot-box">
      <li class="dot-not-curr" :class="{dotCurr: isCurrent[0]}"></li>
      <li class="dot-not-curr" :class="{dotCurr: isCurrent[1]}"></li>
      <li class="dot-not-curr" :class="{dotCurr: isCurrent[2]}"></li>
    </ul>
  </div>
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
    }
  }
}
</script>

<style>
#app {
  height: 100%;
}
html, body, ul, li {
  margin: 0;
  padding: 0;
}
html, body {
  width: 100%;
  height: 100%;
}
ul, li {
  list-style: none;
}
a {
  text-decoration: none;
}
.container {
  position: relative;
  overflow: hidden;
  height: 100%;
  bottom: 0;
  top: 0;
}

.banner-wraper {
  position: absolute;
  left:0;
  top:0;
  padding:0;
  margin:0;
  height: 100%;
  transition: all .2s ease-in-out;
}
.banner {
  float:left; 
  height: 100%;
  width: 33.33333333%;
}

.banner-1 {
  background: red;
}
.banner-2 {
  background: yellow;
}
.banner-3 {
  position: relative;
  background: green;
}

#dot-box {
  position: absolute;
  left: 50%;
  bottom: 5%;
  transform: translate(-50%, 0);
}
#dot-box li {
  display: inline-block;
  width: 20px;
  height: 20px;
  margin: 5px;
  border-radius: 50%;
}
.dot-not-curr {
  background: #eee;
}
.dotCurr {
  background: orange;
}
#go {
  position: absolute;
  bottom: 15%;
  left: 50%;
  padding: 10px 18px;
  transform: translate(-50%, 0);
  background: orange;
  color: #fff;
  border-radius: 5px;
  font-size: 36px;
}
</style>
