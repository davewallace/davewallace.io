<template>
  <div class="view">
    <DefaultGreeting />
    <PortfolioGrid />
  </div>
</template>

<script>

import DefaultGreeting from '@/components/default/DefaultGreeting'
import PortfolioGrid from '@/components/portfolio/PortfolioGrid'

export default {
  name: 'Default',
  components: {
    DefaultGreeting,
    PortfolioGrid
  },
  data () {
    return {
    }
  },
  created: function () {
    // `this` points to the component instance
    console.log('created')
  },
  mounted: function () {
    console.log('mounted')
  }
}
</script>
