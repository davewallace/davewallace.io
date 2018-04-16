<template>
  <div class="view">
    <DefaultGreeting />
    <SortableGrid />
  </div>
</template>

<script>

import DefaultGreeting from '@/components/DefaultGreeting'
import SortableGrid from '@/components/containers/SortableGrid'

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
  },
  mounted: function () {
  }
}
</script>
