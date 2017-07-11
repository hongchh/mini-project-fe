<template lang="pug">
div.main-page
  UserMenu(:isShowMenu="isShowMenu" @parentHideMenu="hideMenu")
  div.user-mini-photo
    img(:class="isShowMenu ? 'move-right' : ''" src="../assets/QQ.jpg" @click="showMenu")
  img.user-photo(src="../assets/QQ.jpg")
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
      isShowMenu: false
    }
  },
  methods: {
    takePhoto () {
      console.log('take photo')
      // TODO: 调用Native接口拍照并上传
      window.PhotoNative.takePhoto()
    },
    showMenu () {
      this.isShowMenu = !this.isShowMenu
    },
    hideMenu (data) {
      this.isShowMenu = data
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
      transition: all .5s ease-out
    .move-right
      left: 85%
  .user-photo
    //flex-grow: 1
    border: .01rem solid #888
    max-height: 80%
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
