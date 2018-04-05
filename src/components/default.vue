<template>
  <div class="view">
    <DefaultGreeting />
    <SortableGrid />
  </div>
</template>

<script>

import DefaultGreeting from '@/components/default/DefaultGreeting'
import SortableGrid from '@/components/SortableGrid/SortableGrid'

export default {
  name: 'Default',
  components: {
    DefaultGreeting,
    SortableGrid
  },
  data () {
    return {
    }
  },
  created: function () {
    // `this` points to the component instance
  },
  mounted: function () {
  }
}
</script>
