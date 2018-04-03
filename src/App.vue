<style lang="scss">

  /**
   * All imports and contextual SCSS must be contained within this single style tag
   */

  @import "style/reset.scss";
  @import "style/variables.scss";

  body {
    background: $test--inherited-value;
    background: $color__base;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: $color__text-base;
  }
</style>

<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
