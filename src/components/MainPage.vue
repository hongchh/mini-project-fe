<template lang="pug">
div.main-page
  img(src="../assets/QQ.jpg")
  button(@click="takePhoto") {{ action }}
</template>

<script>
export default {
  name: 'main-page',
  data () {
    return {
      action: this.$route.query.error ? '照片无效请重拍' : '拍照并上传'
    }
  },
  methods: {
    takePhoto () {
      console.log('take photo')
      // TODO: 调用Native接口拍照并上传
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
  padding: .3rem
  img
    flex-grow: 1
    border: .01rem solid #888
    max-height: 80%
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
