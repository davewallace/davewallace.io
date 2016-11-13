<template>
  <div>
    <h1>Contact</h1>
  </div>
</template>

<script>
import ChildComponent from './form/ChildComponent'

export default {

  name: 'contact',

  components: {
    'child-component': ChildComponent
  },

  methods: {
    foo: function () {
      return
    }
  },

  data () {
    return {
      bar: 'baz'
    }
  }
}
</script>

<style lang="scss">
</style>
