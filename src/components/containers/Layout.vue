<template>
  <div class="layout">
    <!-- XSS attack vector? I can roll with that right now because
         I control the data, and the data will be piped into here via
         showdown (https://github.com/showdownjs/showdown)

         TODO: fix?     
    -->
    <div class="layout-item" v-html="data" />
  </div>
</template>

<style scoped lang="scss">
.layout-item {
}
</style>

<script>
export default {
  name: 'Layout',
  props: {
    data: {
      type: Object,
      default: function () {
        return {}
      }
    }
  }
}
</script>
