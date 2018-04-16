<template>
  <div>
    <h1 id="test">{{ msg }}</h1>
  </div>
</template>

<script>

import {TweenMax} from 'gsap'

console.warn('test__GSAP_dependencies.vue loaded. Why? Because its registered in `src/router/index.js`?')

function initGSAPTest () {
  let test = document.getElementById('test')

  TweenMax.to(test, 10, {
    opacity: 0.25
  })
}

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'This title will fade out successfully if Greensock Animation dependencies have successfully been imported.'
    }
  },
  created: function () {
    // `this` points to the vm instance
    console.log('created')
  },
  mounted: function () {
    console.log('mounted')
    initGSAPTest()
  }
}
</script>
