<template lang="pug">
div.main-page(@click.prevent="isShowMenu = false")
  UserMenu(:isShowMenu="isShowMenu" @parentHideMenu="hideMenu")
  div.user-mini-photo
    img(:class="isShowMenu ? 'move-right' : ''" src="../assets/QQ.jpg" @click.stop="showMenu")
  img.user-photo(src="../assets/QQ.jpg")
  button(@click="takePhoto") {{ action }}
</template>

<script>
import UserMenu from './UserMenu1'
export default {
  name: 'main-page',
  components: {
    UserMenu
  },
  data () {
    return {
      action: this.$route.query.error ? '照片无效请重拍' : '拍照并上传',
      isShowMenu: false
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
    }
  },
  mounted () {
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
  .ad-box
    //flex-grow: 1
    overflow: hidden
    margin: .05rem
    border: .01rem solid #888
    max-height: 80%
    .ad-wraper
      overflow: hidden
      .ad-one
        float: left
        height: 100%
        width: 100%
        img
          // height: 100%
          // width: 100%
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
</style>
