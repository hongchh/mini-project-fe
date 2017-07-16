<template lang="pug">
div.photo-and-tag
  div.user-and-tag
    div.user
      img(:src="$route.query.photo")
      div.nickname {{ nickname }}
    transition-group.tags(name="list-1", tag="div")
      span.tag(v-for="(tag, i) in userTags", :id="'user-' + i", :key="tag", :style="'background: #' + tagColor[tag] || '000'") {{ tag }}
    div.info 点击标签添加
    transition-group.tags(name="list-2", tag="div")
      span.tag(v-for="(tag, i) in sysTags", :id="'sys-' + i", :key="tag", :style="'background: #' + tagColor[tag] || '000'") {{ tag }}
  button(@click="match") {{ action }}
  span.take-photo(@click="takePhoto") 不满意？重新拍一张
  spinner.spinner(:size="50")
</template>

<script>
import Conf from '../config'
import Spinner from 'vue-simple-spinner'

export default {
  name: 'photo-and-tag',
  components: {
    Spinner
  },
  data () {
    let userTags = this.$route.query.tags
    let sysTags = []
    let find = false
    userTags = userTags ? userTags.substr(0, userTags.length - 1).split(',') : []
    for (let i = 0; i < Conf.systemTags.length; ++i) {
      for (let j = 0; j < userTags.length; ++j) {
        if (userTags[j] === Conf.systemTags[i]) {
          find = true
          break
        }
      }
      if (!find) sysTags.push(Conf.systemTags[i])
      find = false
    }
    return {
      nickname: this.$route.query.nickname || '',
      userTags: userTags,
      sysTags: sysTags,
      tagColor: Conf.tagColor,
      action: '开始匹配'
    }
  },
  mounted () {
    var div = document.querySelectorAll('.tags')
    div[0].onclick = (event) => { this.selectTag(event, 0) }
    div[1].onclick = (event) => { this.selectTag(event, 1) }
    div[0].style.zIndex = 0
    div[1].style.zIndex = 0
  },
  methods: {
    selectTag (event, type) {
      // 为了避免点击事件被父元素拦截导致点击失效
      // 此处只能遍历判断点击位置是否点到了tag上
      if (type === 1) {
        if (this.userTags.length > 2) {
          alert('最多只能选择3个标签')
          return
        }
        for (let i = 0; i < this.sysTags.length; ++i) {
          let tag = document.getElementById('sys-' + i)
          if (event.clientX > tag.offsetLeft && event.clientX < tag.offsetLeft + tag.clientWidth &&
            event.clientY > tag.offsetTop && event.clientY < tag.offsetTop + tag.clientHeight) {
            this.userTags.push(this.sysTags[i])
            this.sysTags.splice(i, 1)
            break
          }
        }
      } else {
        for (let i = 0; i < this.userTags.length; ++i) {
          let tag = document.getElementById('user-' + i)
          if (event.clientX > tag.offsetLeft && event.clientX < tag.offsetLeft + tag.clientWidth &&
            event.clientY > tag.offsetTop && event.clientY < tag.offsetTop + tag.clientHeight) {
            this.sysTags.push(this.userTags[i])
            this.userTags.splice(i, 1)
            break
          }
        }
      }
    },
    takePhoto () {
      if (this.action === '照片上传中...') return
      this.action = '照片上传中...'
      document.querySelector('.spinner').setAttribute('style', 'text-align: right; opacity: 1;')
      window.PhotoNative.takePhoto()
    },
    match () {
      if (this.action === '照片上传中...') return
      if (this.userTags.length === 0) {
        alert('请选择标签')
        return
      }
      this.$router.push('/waiting?tags=' + this.userTags.join(',') +
        '&expression=' + this.$route.query.expression + '&openid=' + this.$route.query.openid)
    }
  }
}
</script>

<style lang="sass">
.photo-and-tag
  min-height: 100%
  display: flex
  flex-direction: column
  box-sizing: border-box
  padding: .2rem .3rem
  position: relative
  .user-and-tag
    flex-grow: 1
    .user
      img
        width: 1.5rem
        height: 1.8rem
        border: .01rem solid #888
        display: block
        margin: 0 auto .1rem auto
      .nickname
        font-size: .15rem
        color: #888
        text-align: center
    .info
      font-size: .15rem
      margin-top: .3rem
    .tags
      text-align: center
      line-height: .2rem
      &:nth-child(2)
        min-height: .6rem
      .tag
        display: inline-block
        font-size: .12rem
        padding: .05rem .08rem
        margin: 0 .05rem
        color: white
        // border: .01rem solid #12b7f5
        border-radius: .1rem
        z-index: 99
        transition: all 1s
        white-space: nowrap
  button
    width: 100%
    background: rgb(255, 175, 2)
    margin: .3rem 0 .1rem 0
    font-size: .15rem
    border: none
    border-radius: .3rem
    padding: .1rem
    color: white
    outline: none
  .take-photo
    font-size: .15rem
    color: #888
    text-align: center
    display: block
  .list-1-enter, .list-1-leave-to
    opacity: 0
    transform: translateY(.3rem)
  .list-2-enter, .list-2-leave-to
    opacity: 0
    transform: translateY(-.3rem)
  .list-1-leave-active, .list-2-leave-active
    position: absolute
.spinner
  position: absolute
  bottom: 1rem
  left: 0
  width: 100%
  opacity: 0
</style>
