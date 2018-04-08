<style scoped lang="scss">
h1 {
  font-size: 2.4rem;

  span {
    font-size: 1.4rem;
  }
}
h2 {
  font-size: 1.3rem;
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
      greeting_tertiary: 'You\'ve opened my portfolio, thanks. Select the work you\'d like to see...'
    }
  },
  created: function () {
    // `this` points to the vm instance
  },
  mounted: function () {
  }
}
</script>
