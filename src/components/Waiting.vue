<template lang="pug">
div.waiting
  spinner(:size="50")
  span 匹配中
</template>

<script>
import Spinner from 'vue-simple-spinner'

export default {
  name: 'waiting',
  components: {
    Spinner
  },
  mounted () {
    console.log(this.$route.query.tags)
    // TODO: 发送请求给服务器获取匹配对象, 调起Native聊天
    window.TalkNative.talkWith()
  }
}
</script>

<style lang="sass">
.waiting
  height: 100%
  display: flex
  justify-content: center
  flex-direction: column
  align-items: center
  span
    font-size: .2rem
    color: #888
    margin-top: .2rem
</style>
