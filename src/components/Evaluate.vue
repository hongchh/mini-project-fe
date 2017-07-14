<template lang="pug">
  .container
    div.rate
      Rate(v-model="lastScore")
    button#evaluateBtn(@click="EvaluateSub") 提交评价

</template>
<script>
import Vue from 'vue'
import { Rate } from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
Vue.use(Rate)
export default {
  name: 'evaluate',
  components: {
    Rate
  },
  data () {
    return {
      lastScore: 0
    }
  },
  methods: {
    EvaluateSub () {
      // ...
    }
  }
}
</script>

<style lang="sass">
.container
  display: flex
  justify-content: space-around
  flex-direction: column
  height: 100%
  text-align: center
  .rate
    text-align: center
  #evaluateBtn
    margin: 0 auto
    font-size: .2rem
    border: 0
    padding: .1rem
    border-radius: 4px
    width: 40%
</style>
