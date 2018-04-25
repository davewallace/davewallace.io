<style scoped lang="scss">
h1 {
  margin-bottom: 0;
  padding-top: 2em;
  font-size: 2.4em;

  span {
    font-size: 1.4rem;
  }
}
h2 {
  margin-bottom: 40px;
  font-size: 1.1rem;
  line-height: 1.2rem;
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

  /**
   * Lifecycle methods
   **/
  created: function () {
  }
}
</script>
