<style scoped>

</style>

<template>
  <DefaultGreeting />
</template>

<script>

import DefaultGreeting from '@/components/default/DefaultGreeting'

export default {
  name: 'Default',
  components: {
    DefaultGreeting
  },
  data () {
    return {
    }
  },
  created: function () {
    // `this` points to the vm instance
    console.log('created')
  },
  mounted: function () {
    console.log('mounted')
  }
}
</script>
