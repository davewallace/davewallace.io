<!--
  We're going to dislpay a data structure defaulting to a grid format, with a sorting
  menu to filter the data by user-preferred order and/or recency also by default. This
  provides for our major user personas 1 and 2.
-->

<template>
  <div class="view">
    <DefaultGreeting />
    <SortableGrid />
    <Modal />
  </div>
</template>

<script>

import DefaultGreeting from '@/components/DefaultGreeting'
import SortableGrid from '@/components/containers/SortableGrid'
import Modal from '@/components/ui/Modal'

export default {
  name: 'Default',
  components: {
    DefaultGreeting,
    SortableGrid,
    Modal
  },
  data () {
    return {
    }
  },
  created: function () {
  },
  mounted: function () {
    console.log('default route view has mounted.')
  }
}
</script>
