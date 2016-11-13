<template>
  <!-- Don't drop "quasar-app" class -->
  <div id="quasar-app">

    <div slot="header" class="toolbar">
        codefinger.io
    </div>

    <quasar-tabs slot="navigation">
      <quasar-tab route="/">
          Home
      </quasar-tab>
      <quasar-tab route="/contact">
          Contact
      </quasar-tab>
      <quasar-tab route="/styleguide">
          Style Guide
      </quasar-tab>
    </quasar-tabs>

    <router-view class="layout-view"></router-view>

    <p>
      Built on Quasar v{{quasarVersion}}, the multi-platform Vue.js framework wrap.
    </p>

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
