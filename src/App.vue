<template>
  <!-- Don't drop "quasar-app" class -->
  <div id="quasar-app">

    <div slot="header" class="toolbar">
        codefinger.io
    </div>

    <!--
      This personalised website should showcase my work, my ideas, in some way
      my personality, and it should be flexible for users, customisable. stick
      a blog in here at some point perhaps.
    -->

    <quasar-tabs slot="navigation">
      <quasar-tab route="/">
          Portfolio
      </quasar-tab>
      <quasar-tab route="/contact">
          Contact
      </quasar-tab>
      <quasar-tab route="/styleguide">
          Style Guide
      </quasar-tab>
    </quasar-tabs>

    <router-view class="layout-view"></router-view>

  </div>
</template>

<script>
/*
 * Root component
 */

require('./themes/app.' + __THEME + '.styl')

import Quasar from 'quasar'

export default {
  data () {
    return {
      quasarVersion: Quasar.version
    }
  }
}

</script>
<style src="./styles/global.scss" lang="scss"></style>
