<!--
  We're going to dislpay a data structure defaulting to a grid format, with a sorting
  menu to filter the data by user-preferred order and/or recency also by default. This
  provides for our major user personas 1 and 2.
-->

<template>
  <div class="view">

    <DefaultGreeting />

    <Modal  v-on:modalClose="modal_visible = false"
            v-on:modalNavigate="handle__modalNavigate"
            :visible="this.modal_visible"
            :grid_mostRecentlyInteractedGridData="this.grid_mostRecentlyInteractedGridData"
            :notification_visible="this.notification_visible">

      <template slot="modal_title">
        {{ this.modal_title }}
      </template>

      <template slot="modal_content">
        <Layout v-bind:data="this.modal_content" />
      </template>

      <template slot="modal_notification">
        <Notification type="info">
          <p>You've reached the end of this selection, you can continue or would you like to...</p>

          <Button class="button--primary">
            <template slot="button_label">X</template>
          </Button>
          <Button class="button--secondary">
            <template slot="button_label">Y</template>
          </Button>
        </Notification>
      </template>

    </Modal>

    <SortableGrid v-on:gridItemSelected="handle__gridItemSelected"
                  v-on:gridDataSorted="handle__gridDataSorted"
                  :grid_data="this.grid_data"
                  :grid_sortedDataPrimary="this.grid_sortedDataPrimary"
                  :grid_sortedDataSecondary="this.grid_sortedDataSecondary"
                  :grid_selectedItem="this.grid_selectedItem"
                  :grid_allSortOptions="this.grid_allSortOptions" />
  </div>
</template>

<script>

import DefaultGreeting from '@/components/DefaultGreeting'
import SortableGrid from '@/components/containers/SortableGrid'
import Modal from '@/components/ui/Modal'
import Layout from '@/components/ui/Layout'
import Notification from '@/components/ui/Notification'
import Button from '@/components/ui/Button'

// markdown to HTML converter, for handling predictable user-facing text content
import Showdown from 'Showdown'

export default {
  name: 'Default',
  components: {
    DefaultGreeting,
    SortableGrid,
    Modal,
    Layout,
    Notification,
    Button
  },
  data () {
    return {

      // Modal state
      modal_title: null,
      modal_content: null,
      modal_visible: false,
      notification_visible: false,

      grid_selectedItem: null,
      grid_sortedDataPrimary: [],
      grid_sortedDataSecondary: [],
      grid_mostRecentlyInteractedGridData: null,
      // Feeds our main display of default content, to note the 'content' property of a
      // grid_data item is written in markdown, for conversion into HTML. My assumption
      // here is that the content is pretty simple markup.
      grid_data: [
        {
          title: '1. Lorem ipsum dolor sit amet, consectetur',
          blurb: 'Quisque orci nisi, bibendum et ex eget...',
          body: `
Quisque orci nisi, bibendum et ex eget, sodales tincidunt leo. Vivamus vitae congue tellus.
          `,
          tags: [
            {tag: 'user-experience', name: 'User Experience'}
          ],
          date: 2018,
          selected: false
        },
        {
          title: '2. Convallis dictum faucibus sed',
          blurb: 'Quisque orci nisi, bibendum et ex eget...',
          body: `
Quisque orci nisi, bibendum et ex eget, sodales tincidunt leo. Vivamus vitae congue tellus.
          `,
          tags: [
            {tag: 'accessibility', name: 'Accessibility'}
          ],
          date: 2017,
          selected: false
        },
        {
          title: '3. Duis libero mi, tempor nec tempor',
          blurb: 'Quisque orci nisi, bibendum et ex eget...',
          body: `
Quisque augue nulla, convallis dictum faucibus sed, pulvinar sed purus. Donec sed risus in augue fermentum eleifend.
          `,
          tags: [
            {tag: 'user-experience', name: 'User Experience'}
          ],
          date: 2017,
          selected: false
        },
        {
          title: '4. Ministry of Foreign Affairs & Trade',
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
          title: '5. Sed rutrum purus eros, eu pretium',
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
          title: '6. Suspendisse sit amet libero vitae dolor',
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
          title: '7. Sit amet libero Suspendisse vitae dolor',
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
          title: '8. Praesent elit mauris libero vitae dolor',
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
          title: '9. Bibendum et ex eget, sodales tincidunt leo',
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
          title: '10. Suspendisse sit amet libero vitae dolor',
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
      ],

      // menu data
      grid_allSortOptions: [
        {
          name: 'Technical Consultation',
          icon: '',
          tag: 'technical-consultation',
          selected: false
        },
        {
          name: 'Team Leadership',
          icon: '',
          tag: 'team-leadership',
          selected: false
        },
        {
          name: 'Production Management',
          icon: '',
          tag: 'production-management',
          selected: false
        },
        {
          name: 'Accessibility',
          icon: '',
          tag: 'accessibility',
          selected: false
        },
        {
          name: 'User Experience',
          icon: '',
          tag: 'user-experience',
          selected: false
        },
        {
          name: 'User Interface Design',
          icon: '',
          tag: 'user-interface-design',
          selected: false
        },
        {
          name: 'Front-end Development',
          icon: '',
          tag: 'front-end-development',
          selected: false
        }
      ]
    }
  },
  methods: {

    /**
     * Using the currently selected grid item, traverse the most recently
     * interacted data Array for the next appropriate data item. Traversal is
     * bidirectional within the most recently interacted data Array, and
     * doubly linked.
     *
     * direction: 'next', 'previous'
     **/
    handle__modalNavigate: function (direction) {

      let gridData = this.grid_mostRecentlyInteractedGridData
      let currentIndex = gridData.indexOf(this.grid_selectedItem)
      let newIndex

      // Determine the next viable modal data index
      if (direction === 'next') {
        newIndex = (currentIndex === gridData.length - 1) ? 0 : currentIndex + 1
      } else {
        newIndex = (currentIndex === 0) ? gridData.length - 1 : currentIndex - 1
      }

      // Toggle the modal notification to provide user feedback if we've hiy
      // the end of a content queue
      this.modal_notification_visible = (newIndex === gridData.length - 1)
      console.log(newIndex + '/' + (gridData.length - 1))

      // Update our selected grid_data state
      this.grid_selectedItem = gridData[newIndex]

      // Update our modal with new grid_data props
      this.updateModal({
        title: this.grid_selectedItem.title,
        content: this.formatHTML(this.grid_selectedItem.body)
      })
    },

    /**
     * {
     *  event,
     *  grid_dataSource,
     *  grid_selectedItem: {
     *    content: {}
     *    title: {}
     *  }
     * }
     **/
    handle__gridItemSelected: function (args) {

      // Update the currently selected grid_data item
      this.grid_selectedItem = args.grid_selectedItem

      // Update the most recently interacted grid
      this.grid_mostRecentlyInteractedGridData = args.grid_dataSource

      // Update modal contents
      let modalContent = this.formatHTML(args.grid_selectedItem.body)
      this.updateModal({
        title: args.grid_selectedItem.title,
        content: modalContent
      })

      // Show the modal
      this.modal_visible = true
    },

    handle__gridDataSorted: function (data) {
      this.grid_sortedDataPrimary = data.grid_sortedDataPrimary
      this.grid_sortedDataSecondary = data.grid_sortedDataSecondary
    },

    /**
     * data: {
     *   title: String,
     *   content: String
     * }
     **/
    updateModal: function (data) {
      this.modal_title = data.title
      this.modal_content = data.content
    },

    /**
     *
     **/
    formatHTML: function (markdownString) {
      let converter = new Showdown.Converter({
        noHeaderId: true
      })
      return converter.makeHtml(markdownString)
    }
  },
  mounted: function () {
    console.log('default route view has mounted.')
  }
}
</script>
