<template>
  <div :class="customClasses">
    <input v-model="model" :disabled="disable">
    <label v-show="label">{{label}}</label>
  </div>
</template>
<script>
export default {
  name: 'child-component',

  methods: {

    /**
     *
     **/
    bar: function () {
      return
    }
  },

  props: {
    'disable': Boolean,
    'label': String,
    'customClasses': String
  },

  computed: {
    model: {
      get () {
        return this.disable
      },
      set (value) {
        this.$emit('disable', value)
      }
    }
  }
}
</script>

<style lang="scss">
</style>
