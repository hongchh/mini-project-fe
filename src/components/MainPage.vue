<template lang="pug">
div.main-page
  img(src="../assets/QQ.jpg")
  button(@click="takePhoto") 拍照并上传
</template>

<script>
export default {
  name: 'main-page',
  methods: {
    takePhoto () {
      console.log('take photo')
      // window.PhotoNative.takePhoto()
    }
  }
}
</script>

<style lang="sass">
.main-page
  height: 100%
  display: flex
  flex-direction: column
  box-sizing: border-box
  padding: .2rem .3rem
  img
    flex-grow: 1
    border: .01rem solid #888
  button
    width: 100%
    background: #12b7f5
    margin-top: .3rem
    font-size: .15rem
    border: none
    border-radius: .3rem
    padding: .1rem
    color: white
    outline: none
</style>
