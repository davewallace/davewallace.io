<template>
  <i>{{ this.types[this.type || this.types.default] }}</i>
</template>

<style scoped lang="scss">

// @import "../../style/variables.scss";
// @import "../../style/reset.scss";

i {
  display: inline-block;
  width: 16px;
  height: 16px;
  color: white;
  font-weight: bold;
}
</style>

<script>

export default {
  name: 'Icon',
  data () {
    return {
      types: {
        'default': '?',
        'close': 'X',
        'backward': '<',
        'forward': '>'
      }
    }
  },
  props: [
    'type'
  ]
}
</script>
