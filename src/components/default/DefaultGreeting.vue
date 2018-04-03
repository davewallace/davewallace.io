<style scoped>
h1 span {
  font-size: 1.2rem;
}
</style>

<template>
  <div>
    <h1>{{ greeting_primary }}<span>{{ greeting_secondary }}</span></h1>
    <h2>{{ greeting_tertiary }}</h2>
  </div>
</template>

<script>
export default {
  name: 'DefaultGreeting',
  data () {
    return {
      greeting_primary: 'Hello',
      greeting_secondary: ', and welcome.',
      greeting_tertiary: 'You\'ve opened my portfolio, thanks, help yourself to a look around.'
    }
  },
  created: function () {
    // `this` points to the vm instance
  },
  mounted: function () {
  }
}
</script>
