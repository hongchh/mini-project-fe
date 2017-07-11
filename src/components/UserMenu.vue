<template lang="pug">
div(:class="isShowMenu ? 'user-menu showMenu' : 'user-menu'")
	div(:class="isPrefer || isCount ? 'tab-wraper prefer' : 'tab-wraper'")
		div.tab-1.tab
			p(@click="hideMenu") 返回
			ul
				li(@click="setPrefer") 偏好设置
				li(@click="userCount") 账户
				li 分享给朋友
			div(:class="isCount ? 'tab-2 tab prefer-hide' : 'tab-2 tab'")
				p(@click="lastMenu") 返回
				.info
					div#title
						span 为我匹配
					div#age
						span 年龄
						div
							vue-slider(v-model="ageRange")
					div#sex
						span 性别
						div
							span#boy(:class="sex === 0 ? 'blue-text' : ''", @click="sex = 0") 男 ♂
							span#girl(:class="sex === 1 ? 'red-text' : ''", @click="sex = 1") 女 ♀
			div(:class="isCount ? ' tab-3 tab tab3-show' : 'tab-3 tab'")
				p(@click="lastMenu") 返回
				p 账户
				p 累计收入

</template>

<script>
import VueSlider from 'vue-slider-component'
import UserMenu from './UserMenu'

export default {
  name: 'user-menu',
  components: {
    VueSlider,
    UserMenu
  },
  props: {
    isShowMenu: false
  },
  data () {
    return {
      isPrefer: false,
      isCount: false,
      ageRange: [0, 100],
      sex: -1
    }
  },
  methods: {
    showMenu () {
      this.isShowMenu = !this.isShowMenu
    },
    hideMenu () {
      this.isShowMenu = false
    },
    setPrefer () {
      this.isPrefer = true
    },
    userCount () {
      this.isCount = true
    },
    lastMenu () {
      this.isPrefer = false
      this.isCount = false
    }
  }
}

</script>
<style lang="sass">
	.user-menu
		position: absolute
		top: 0
		left: -5rem
		overflow: hidden
		width: 80%
		font-size: .15rem
		background: rgba(0, 0, 0, .6)
		color: #ffffff
		transition: all 1s ease-out
		.tab-wraper
			width: 200%
			overflow: hidden
			transition: all 1s ease-out
			.tab
				float: left
				padding: 5%
				width: 40%
			.tab-3
				position: absolute
				right: 0
				opacity: 0
		 	.tab3-show
				opacity: 1
		.prefer
			transform: translate(-50%, 0)
		.showMenu
			left: 0
		.user-mini-photo
			display: flex
			justify-content: flex-start
			overflow: hidden
			width: 100%
			height: .5rem
			transition: all 1s ease-out
			img
			width: .5rem
			border: 1px solid #eee
			border-radius: 50%
		.move-right
			justify-content: flex-end
	.info
		flex-grow: 1
		padding: 0 .2rem
		display: flex
		flex-direction: column
		justify-content: center
	#age, #sex, #title
		padding: .1rem 0
		border-bottom: .01rem solid #888
		font-size: .18rem
		display: flex
		> span
			margin-right: .2rem
		> div
	    	flex-grow: 1
	#title span
		font-size: .15rem
	#sex, #age
		margin-top: .35rem
	#sex
		> div
			display: flex
			justify-content: space-around
		#boy, #girl
			color: #888
		#boy.blue-text
			color: #25a4d4
		#girl.red-text
			color: #faa523
</style>
