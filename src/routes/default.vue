<!--
  We're going to dislpay a data structure defaulting to a grid format, with a sorting
  menu to filter the data by user-preferred order and/or recency also by default. This
  provides for our major user personas 1 and 2.
-->

<template>
  <div class="view">
    <DefaultGreeting />
    <Modal  :visible="this.modal_visible"
            v-on:modalClose="modal_visible = false">
      <template slot="title">{{ this.modal_title }}</template>
      <template slot="body">{{ this.modal_body }}</template>
    </Modal>
    <SortableGrid v-on:gridItemSelected="handle__gridItemSelected" />
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
      modal_title: 'Empty title',
      modal_body: 'Empty body',
      modal_visible: false
    }
  },
  methods: {

    /**
     * {
     *  event,
     *  selectedGridItem,
     *  currentGrid
     * }
     **/
    handle__gridItemSelected: function (args) {

      let item = args.selectedGridItem

      // Update the modal content
      this.modal_title = item.title
      this.modal_body = item.body

      // Show the modal
      this.modal_visible = true
    }
  },
  created: function () {
  },
  mounted: function () {
    console.log('default route view has mounted.')
  }
}
</script>
