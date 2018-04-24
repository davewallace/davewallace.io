<template>
  <div class="layout">
    <!-- XSS attack vector. I can roll with that right now because
         I control the data, and the data will be piped into here via
         showdown (https://github.com/showdownjs/showdown) -->
    <div class="layout-item" v-html="data"/>
  </div>
</template>

<style scoped lang="scss">

@import "../../style/variables.scss";
@import "../../style/reset.scss";
@import "../../style/utility.scss";

.layout-item {
  border: 3px dashed pink;
}
</style>

<script>
export default {
  name: 'Layout',
  components: {
  },
  props: {
    'data': null
  }
}
</script>
