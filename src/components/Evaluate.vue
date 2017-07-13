<template>
  <p class="start-box">
    <input type="radio" name="a" value="0" checked="checked" />
    <input type="radio" name="a" value="1" v-model="score[0]"/>
    <input type="radio" name="a" value="2" />
    <input type="radio" name="a" value="3" />
    <input type="radio" name="a" value="4" />
    <input type="radio" name="a" value="5" />
  </p>
</template>
<script>
export default {
  name: 'evaluate',
  data () {
    return {
      score: [1]
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
