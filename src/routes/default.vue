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

      <template slot="modal_title">
        {{ this.modal_title }}
      </template>

      <template slot="modal_content">
        <Layout :data="this.modal_content" />
      </template>

    </Modal>
    <SortableGrid v-on:gridItemSelected="handle__gridItemSelected"
                  v-bind:gridData="this.gridData"/>
  </div>
</template>

<script>

import DefaultGreeting from '@/components/DefaultGreeting'
import SortableGrid from '@/components/containers/SortableGrid'
import Modal from '@/components/ui/Modal'
import Layout from '@/components/ui/Layout'

// markdown to HTML converter, for handling predictable but onerous user-facing content
import Showdown from 'Showdown'

export default {
  name: 'Default',
  components: {
    DefaultGreeting,
    SortableGrid,
    Modal,
    Layout
  },
  data () {
    return {
      // Modal state
      modal_title: null,
      modal_content: null,
      modal_visible: false,

      // Feeds our main display of default content, to note the 'content' property of a
      // gridData item is written in markdown, for conversion into HTML. My assumption
      // here is that the content is pretty simple markup.
      gridData: [
        {
          title: 'Lorem ipsum dolor sit amet, consectetur',
          blurb: 'Quisque orci nisi, bibendum et ex eget...',
          body: 'Quisque orci nisi, bibendum et ex eget, sodales tincidunt leo. Vivamus vitae congue tellus.',
          tags: [
            {tag: 'user-experience', name: 'User Experience'}
          ],
          date: 2018,
          selected: false
        },
        {
          title: 'Convallis dictum faucibus sed',
          blurb: 'Quisque orci nisi, bibendum et ex eget...',
          body: 'Quisque orci nisi, bibendum et ex eget, sodales tincidunt leo. Vivamus vitae congue tellus.',
          tags: [
            {tag: 'accessibility', name: 'Accessibility'}
          ],
          date: 2017,
          selected: false
        },
        {
          title: 'Duis libero mi, tempor nec tempor',
          blurb: 'Quisque orci nisi, bibendum et ex eget...',
          body: 'Quisque augue nulla, convallis dictum faucibus sed, pulvinar sed purus. Donec sed risus in augue fermentum eleifend.',
          tags: [
            {tag: 'user-experience', name: 'User Experience'}
          ],
          date: 2017,
          selected: false
        },
        {
          title: 'Ministry of Foreign Affairs & Trade',
          blurb: 'Quisque orci nisi, bibendum et ex eget...',
          body: 'Aliquam luctus posuere facilisis. Nunc auctor condimentum ex, sed laoreet tortor facilisis eu.',
          tags: [
            {tag: 'user-experience', name: 'User Experience'},
            {tag: 'user-interface-design', name: 'User Interface Design'},
            {tag: 'front-end-development', name: 'Front End Development'},
            {tag: 'production-management', name: 'Production Management'},
            {tag: 'technical-consultation', name: 'Technical Consultation'}
          ],
          date: 2017,
          selected: false
        },
        {
          title: 'Sed rutrum purus eros, eu pretium',
          blurb: 'Quisque orci nisi, bibendum et ex eget...',
          body: `
Curabitur at sodales lectus, sit amet sodales ex. Praesent elit mauris, mattis commodo faucibus non, pretium non purus.
          `,
          tags: [
            {tag: 'user-interface-design', name: 'User Interface Design'},
            {tag: 'front-end-development', name: 'Front End Development'}
          ],
          date: 2016,
          selected: false
        },
        {
          title: 'Suspendisse sit amet libero vitae dolor',
          blurb: 'Quisque orci nisi, bibendum et ex eget...',
          body: `
Curabitur at sodales lectus, sit amet sodales ex. Praesent elit mauris, mattis commodo faucibus non, pretium non purus.
          `,
          tags: [
            {tag: 'front-end-development', name: 'Front End Development'}
          ],
          date: 2015,
          selected: false
        },
        {
          title: 'Sit amet libero Suspendisse vitae dolor',
          blurb: 'Quisque orci nisi, bibendum et ex eget...',
          body: `
Curabitur at sodales lectus, sit amet sodales ex. Praesent elit mauris, mattis commodo faucibus non, pretium non purus.
          `,
          tags: [
            {tag: 'production-management', name: 'Production Management'}
          ],
          date: 2014,
          selected: false
        },
        {
          title: 'Praesent elit mauris libero vitae dolor',
          blurb: 'Quisque orci nisi, bibendum et ex eget...',
          body: `
Curabitur at sodales lectus, sit amet sodales ex. Praesent elit mauris, mattis commodo faucibus non, pretium non purus.
          `,
          tags: [
            {tag: 'technical-consultation', name: 'Technical Consultation'},
            {tag: 'user-interface-design', name: 'User Interface Design'},
            {tag: 'production-management', name: 'Production Management'}
          ],
          date: 2013,
          selected: false
        },
        {
          title: 'Bibendum et ex eget, sodales tincidunt leo',
          blurb: 'Quisque orci nisi, bibendum et ex eget...',
          body: `
Curabitur at sodales lectus, sit amet sodales ex. Praesent elit mauris, mattis commodo faucibus non, pretium non purus.
          `,
          tags: [
            {tag: 'user-experience', name: 'User Experience'},
            {tag: 'front-end-development', name: 'Front End Development'}
          ],
          date: 2018,
          selected: false
        },
        {
          title: 'Suspendisse sit amet libero vitae dolor',
          blurb: 'Quisque orci nisi, bibendum et ex eget...',
          body: `
Curabitur at sodales lectus, sit amet sodales ex. Praesent elit mauris, mattis commodo faucibus non, pretium non purus.
          `,
          tags: [
            {tag: 'team-leadership', name: 'Team Leadership'},
            {tag: 'production-management', name: 'Production Management'}
          ],
          date: 2015,
          selected: false
        }
      ]
    }
  },
  methods: {

    /**
     * {
     *  event,
     *  currentGrid,
     *  selectedGridItem: {
     *    content: {}
     *    title: {}
     *  }
     * }
     **/
    handle__gridItemSelected: function (args) {

      // Update the modal with HTML-ready content
      this.modal_title = args.selectedGridItem.title

      let converter = new Showdown.Converter({
        noHeaderId: true
      })
      let html = converter.makeHtml(args.selectedGridItem.body)
      this.modal_content = html

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
