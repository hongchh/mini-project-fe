<template lang="pug">
  p.start-box
    input(type="radio", name="a", value="0", checked="checked")
    input(v-for="(score, i) in scores", value={score}, :key="i", name="a", type="radio")
</template>
<script>
export default {
  name: 'evaluate',
  data () {
    return {
      scores: [1, 2, 3, 4, 5],
      lastScore: 0
    }
  },
  methoods: {
    starHandler () {
      console.log(this.lastScore)
      // this.lastScore = score
      // console.log(score)
    }
  }
}
</script>

<style lang="sass">
.start-box
  text-align: center
  >input
    position: relative
    margin-right: .1rem
    border: 0
    background: transparent
    color: gold
    outline: none
    -webkit-transition: color .3s
    transition:color .3s
  >input:nth-of-type(1)
    display: none
  >input:before
    position: absolute
    content: "★"
    left: 0
    top: 0
    font-size: 32px
    height: 100%
    width: 100%
    background: #FFF
    cursor: pointer
  >input:checked~input
    color: #666

</style>
