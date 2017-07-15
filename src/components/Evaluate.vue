<template lang="pug">
  .container
    div.rate
      img(src="../assets/star-on.png", v-for="i in rating", :id="i", @click="setRating($event)")
      img(src="../assets/star-off.png", v-for="i in (5 - rating)", :id="i + rating", @click="setRating($event)")
    button#evaluateBtn(@click="EvaluateSub") 提交评价

</template>
<script>
export default {
  name: 'evaluate',
  data () {
    return {
      rating: 1
    }
  },
  methods: {
    setRating (event) {
      this.rating = Number.parseInt(event.target.id)
    },
    EvaluateSub () {
      console.log(this.$route.query.openidA, this.$route.query.openidB)
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
    display: flex
    justify-content: space-around
    margin-top: .1rem
    padding: .1rem
    img
      width: .4rem
      height: .4rem
  #evaluateBtn
    margin: 0 auto
    background: rgb(255, 175, 2)
    font-size: .15rem
    border: none
    border-radius: .3rem
    padding: .1rem
    color: white
    outline: none
    width: 40%
</style>
