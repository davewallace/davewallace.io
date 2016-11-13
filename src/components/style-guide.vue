<template>
  <div>
    <h1>Style Guide</h1>
  </div>
</template>

<script>
import ChildComponent from './form/ChildComponent'

export default {

  name: 'style-guide',

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

<!-- import style here, i guess -->
<style lang="scss">
</style>
