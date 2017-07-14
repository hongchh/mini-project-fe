<template lang="pug">
div.main-page(@click.prevent="isShowMenu = false")
  UserMenu(:isShowMenu="isShowMenu" @parentHideMenu="hideMenu")
  div.user-mini-photo
    img(:class="isShowMenu ? 'move-right' : ''" src="../assets/QQ.jpg" @click.stop="showMenu")
  //- img.user-photo(src="../assets/QQ.jpg")
  div.ad-container
    swiper(:options="swiperOption")
      swiper-slide(v-for="slide in swiperSlides") 
        img(src="../assets/tab1.jpeg")
      div.swiper-pagination(slot="pagination")
  button(@click="takePhoto") {{ action }}
</template>

<script>
import UserMenu from './UserMenu1'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  name: 'main-page',
  components: {
    UserMenu,
    swiper,
    swiperSlide
  },
  data () {
    return {
      action: this.$route.query.error ? '照片无效请重拍' : '拍照并上传',
      isShowMenu: false,
      swiperOption: {
        autoplay: 3500,
        setWrapperSize: true,
        pagination: '.swiper-pagination',
        paginationClickable: true,
        mousewheelControl: true,
        observeParents: true
      },
      swiperSlides: [1, 2, 3]
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
  .ad-container
    overflow: hidden
    height: 80%
    width: 100%
    img
      width: 100%
      height: 100%
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
    background: #12b7f5
    //margin-top: .3rem
    font-size: .15rem
    border: none
    border-radius: .3rem
    padding: .1rem
    color: white
    outline: none
</style>
