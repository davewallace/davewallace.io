<!--
  We're going to dislpay a data structure defaulting to a grid format, with a
  sorting menu to filter the data by user-preferred order and/or recency also by
  default. This provides for our major user personas 1 and 2.
-->

<template>
  <div class="view">

    <DefaultGreeting />

    <Modal  v-on:modalClose="modal_visible = false"
            v-on:modalNavigate="handle__modalNavigate"
            :visible="this.modal_visible"
            :grid_mostRecentlyInteractedGridData="this.grid_mostRecentlyInteractedGridData">

      <template slot="modal_title">
        {{ this.modal_title }}
      </template>

      <template slot="modal_blurb">
        {{ this.modal_blurb }}
      </template>

      <template slot="modal_body">
        <Layout v-bind:data="this.modal_body" />

        <ImageViewer  v-if="this.grid_selectedItem && this.grid_selectedItem.gallery"
                      v-bind:data="this.grid_selectedItem.gallery" />
      </template>

      <template slot="modal_notification">
        <Notification type="info" v-if="modal_notification_visible">

          <template slot="notification_body">
            <p>You've reached the end of your selection. Would you like to...</p>
          </template>

          <template slot="notification_controls">
            <Button class="button--primary">
              <template slot="button_label">Start again</template>
            </Button>
            <span class="notification_control-seperator">or...</span>
            <Button class="button--secondary">
              <template slot="button_label">Close this box</template>
            </Button>
          </template>

        </Notification>
      </template>

    </Modal>

    <SortableGrid v-on:gridItemSelected="handle__gridItemSelected"
                  v-on:gridDataSorted="handle__gridDataSorted"
                  v-on:sortOptionClick="handle__sortOptionClick"
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
import Layout from '@/components/containers/Layout'
import Notification from '@/components/ui/Notification'
import Button from '@/components/ui/Button'
import StaticGridDataImport from '../data/grid-data'

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
      modal_blurb: null,
      modal_body: null,
      modal_visible: false,
      modal_notification_visible: false,

      // Sortable grid state
      grid_selectedItem: null,
      grid_sortedDataPrimary: [],
      grid_sortedDataSecondary: [],
      grid_selectedSortOptions: [],
      grid_mostRecentlyInteractedGridData: null,
      // Feeds our main display of default content, to note the 'content'
      // property of a grid_data item is written in markdown, for conversion
      // into HTML. My assumption here is that the content is pretty simple
      // markup.
      grid_data: StaticGridDataImport,

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
  watch: {

    grid_selectedSortOptions: function (newValue, oldValue) {
      console.log('I should win the race! I should have ' + newValue.length + ' sort options selected.')
    },

    /**
     *
     **/
    grid_selectedItem: function (newValue, oldValue) {

      // Toggle the modal notification to provide user feedback if we've hiy
      // the end of a content queue
      let gridData = this.grid_mostRecentlyInteractedGridData
      if (gridData.indexOf(this.grid_selectedItem) === gridData.length - 1) {
        this.modal_notification_visible = true
      } else {
        this.modal_notification_visible = false
      }
    },

    /**
     *
     **/
    grid_sortedDataPrimary: function (newValue, oldValue) {

      console.log('grid_sortedDataPrimary changed, performing UI updates based on selectedSortOptions (' + this.grid_selectedSortOptions.length + ').')

      /*
      let gridItems = this.grid_sortedDataPrimary
      let self = this

      if (gridItems.length) {

        const selectedSortOptions = self.grid_selectedSortOptions
        console.log('checking ' + gridItems.length + ' grid items')

        gridItems.forEach(item => {

          const tags = item.tags

          // iterate all currently selected sort options
          console.log('\t >> checking ' + tags.length + ' gridItem tags to see if they are in the selected menu tags state...\ntags:', item.tags)
          for (let x = 0; x < tags.length; x++) {

            tags[x].selected = false
            console.log('\t \t >>> there are ' + selectedSortOptions.length + ' selectedSortOptions...', selectedSortOptions)

            for (let y = 0; y < selectedSortOptions.length; y++) {

              console.log('success comparison: tag=' + tags[x].tag + ' and selectedSortOptions=' + selectedSortOptions[y].tag)

              if (tags[x].tag === selectedSortOptions[y].tag) {
                console.log('match found')
                tags[x].selected = true
              }

            }
          }
        })

      } // eoc
      */
    }

  },
  methods: {

    /**
     * Event handlers
     **/

    /**
     *
     **/
    handle__sortOptionClick: function (data) {

      console.log('default handled sortOptionClick()')
      this.grid_selectedSortOptions = data.grid_selectedSortOptions

      // Update grid item tag highlighting
      //this.updateGridItemTags()

    },

    /**
     * Using the currently selected grid item, traverse the most recently
     * interacted data Array for the next appropriate data item. Traversal is
     * bidirectional within the most recently interacted data Array, and doubly
     * linked.
     *
     * direction: 'forward', 'backward'
     **/
    handle__modalNavigate: function (direction) {

      let gridData = this.grid_mostRecentlyInteractedGridData
      let currentIndex = gridData.indexOf(this.grid_selectedItem)
      let newIndex

      // Determine the next viable modal data index
      if (direction === 'forward') {
        // Advance by 1 or start at beginning of list again
        newIndex = (currentIndex === gridData.length - 1) ? 0 : currentIndex + 1
      } else {
        // Go back by 1 or move to end of list
        newIndex = (currentIndex === 0) ? gridData.length - 1 : currentIndex - 1
      }

      console.log(newIndex + '/' + (gridData.length - 1))

      // Update our selected grid_data state
      this.grid_selectedItem = gridData[newIndex]

      // Update our modal with new grid_data props
      this.updateModal({
        title: this.grid_selectedItem.title,
        content: this.formatHTML(this.grid_selectedItem.body),
        blurb: this.grid_selectedItem.blurb
      })
    },

    /**
     * args: {
     *  event,
     *  grid_dataSource,
     *  grid_selectedItem: {
     *    content: {}
     *    title: {},
     *    blurb: {}
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
        content: modalContent,
        blurb: this.grid_selectedItem.blurb
      })

      // Show the modal
      this.modal_visible = true
    },

    handle__gridDataSorted: function (data) {
      this.grid_sortedDataPrimary = data.grid_sortedDataPrimary
      this.grid_sortedDataSecondary = data.grid_sortedDataSecondary
    },

    /**
     * Public methods
     **/

    /**
     *
     * TODO: Could improve this and make content insertion more abstract, but
     * how to do so without getting too deep into String manipulation?
     *
     * data: {
     *   title: String,
     *   content: String,
     *   blurb: String
     * }
     **/
    updateModal: function (data) {
      this.modal_title = data.title
      this.modal_body = data.content
      this.modal_blurb = data.blurb
    },

    /**
     *
     **/
    formatHTML: function (markdownString) {

      let converter = new Showdown.Converter({
        noHeaderId: true
      })

      // Set flavour of markdown to Github's because the intended workflow is
      // editing case studies via Github & importing the wiki data into this app
      converter.setFlavor('github')

      // TODO: Potential XSS attack vector using Showdown, but there's no user
      // input going on at least. Have a read of:
      // https://github.com/showdownjs/showdown/wiki/Markdown's-XSS-Vulnerability-(and-how-to-mitigate-it)
      return converter.makeHtml(markdownString)
    }
  },

  /**
   * Lifecycle methods
   **/
  mounted: function () {
    console.log('default route view has mounted.')
  }
}
</script>
