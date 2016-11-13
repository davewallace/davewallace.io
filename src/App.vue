<template>
  <!-- Don't drop "quasar-app" class -->
  <div id="quasar-app">

    <div slot="header" class="toolbar">
        Witch
    </div>

    <quasar-tabs slot="navigation" class="bg-green-5" :padding="1">
      <quasar-tab route="/">
          Home
      </quasar-tab>
      <quasar-tab route="/styleguide">
          Style Guide
      </quasar-tab>
      <quasar-tab route="/createcharacter">
          Create character
      </quasar-tab>
    </quasar-tabs>

    <router-view class="layout-view"></router-view>

    <quasar-toolbar-title :padding="1">
      Built on Quasar v{{quasarVersion}}, the multi-platform Vue.js framework wrap.
    </quasar-toolbar-title>

  </div>
</template>

<script>
/*
 * Root component
 */

// === DEFAULT / CUSTOM STYLE ===
// WARNING! always comment out ONE of the two require() calls below.
// 1. use next line to activate CUSTOM STYLE (./src/themes)
require('./themes/app.' + __THEME + '.styl')
// 2. or, use next line to activate DEFAULT QUASAR STYLE
// require('quasar/dist/quasar.' + __THEME + '.css')
// ==============================

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
<style lang="scss">
</style>
