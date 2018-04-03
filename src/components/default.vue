<template>
  <div class="view">
    <DefaultGreeting />
    <PortfolioSortMenu />
    <PortfolioGrid />
  </div>
</template>

<script>

import DefaultGreeting from '@/components/default/DefaultGreeting'
import PortfolioSortMenu from '@/components/portfolio/PortfolioSortMenu'
import PortfolioGrid from '@/components/portfolio/PortfolioGrid'

export default {
  name: 'Default',
  components: {
    DefaultGreeting,
    PortfolioSortMenu,
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
