<template>
  <i>{{ types[type || types.default] }}</i>
</template>

<style scoped lang="scss">
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
  props: {
    type: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      types: {
        'default': '?',
        'close': 'X',
        'backward': '<',
        'forward': '>'
      }
    }
  }
}
</script>
