<template>
  <div>

    <!--
      Replace following "div" with
      "<router-view class="layout-view">" component
      if using subRoutes
    -->

     <div class="layout-view">
     INDEX CONTENT
     </div>

  </div>
</template>

<script>
import Quasar from 'quasar'

export default {
  name: 'index',
  data () {
    return {
      quasarVersion: Quasar.version
    }
  },
  computed: {
  },
  methods: {
    foo (event) {
      // this.moveX = (left - halfW) / halfW * -moveForce
    }
  },
  mounted () {
    this.$nextTick(() => {
      // document.addEventListener('mousemove', this.move)
    })
  },
  beforeDestroy () {
    // document.removeEventListener('mousemove', this.move)
  }
}
</script>

<style lang="scss">
</style>
