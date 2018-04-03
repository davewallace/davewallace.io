<template>
  <div>
    <h1>{{ greeting_primary }}<span>{{ greeting_secondary }}</span></h1>
    <h2>{{ greeting_tertiary }}<span>{{ greeting_signature }}</span></h2>
  </div>
</template>

<script>
export default {
  name: 'DefaultGreeting',
  data () {
    return {
      greeting_primary: 'Hello',
      greeting_secondary: ', and welcome.',
      greeting_tertiary: 'You\'ve opened my portfolio, thanks - it\'s nice of you to have a look around.',
      greeting_signature: 'Dave Wallace'
    }
  },
  created: function () {
    // `this` points to the vm instance
  },
  mounted: function () {
  }
}
</script>
