<style scoped lang="scss">

@import "../style/variables.scss";
@import "../style/reset.scss";
@import "../style/utility.scss";

h1 {
  display: inline-block;
  padding-top: 2em;
  @media (max-width: 320px) {
    padding-top: 1em;
  }

  font-size: 4.8em;
  line-height: 1.2rem;
  font-family: $font_title--main;
}
p {
  display: inline-block;
  position: relative;
  left: 0.1em;
  margin-bottom: 10px;
  font-family: $font_title--main;
  font-size: 1.8rem;
  line-height: 1.1em;
}

h2 {
  margin-bottom: 40px;
  font-size: 1.1rem;
  line-height: 1.2rem;
  font-weight: normal;
}
</style>

<template>
  <div>
    <h1>{{ greeting_primary }}</h1>
    <p>{{ greeting_secondary }}</p>
    <h2>{{ greeting_tertiary }}</h2>
  </div>
</template>

<script>
export default {
  name: 'DefaultGreeting',
  data () {
    return {
      greeting_primary: 'Hello,',
      greeting_secondary: 'and welcome.',
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
