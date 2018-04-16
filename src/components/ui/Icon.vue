<template>
  <i>{{ this.types[this.type || this.types.default] }}</i>
</template>

<style scoped lang="scss">

@import "../../style/reset.scss";
@import "../../style/variables.scss";

i {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 1px dashed red;
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
        'close': 'X'
      }
    }
  },
  props: [
    'type'
  ]
}
</script>
