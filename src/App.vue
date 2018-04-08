<template>
  <div id="app" class="layout-root">
    <router-view/>
  </div>
</template>

<style lang="scss">
  /**
   * All imports and contextual SCSS must be contained within this single style tag
   */
  @import "style/reset.scss";
  @import "style/variables.scss";

  body {
    background: $color__base;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: $color__text-base;
  }

  .layout-root {
    max-width: 960px;
    margin: 0 auto;
    padding: $pad__body--desktop;
  }
</style>

<script>
export default {
  name: 'App'
}
</script>
