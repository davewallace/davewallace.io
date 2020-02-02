<template>
  <div id="app" class="layout-root">
    <!--
      We're going to dislpay a data structure defaulting to a grid format, with a
      sorting menu to filter the data by user-preferred order and/or recency also by
      default. This provides for our major user personas 1 and 2.
    -->
    <DefaultGreeting />

    <Modal :visible="modalVisible"
           :grid-most-recently-interacted-grid-data="gridMostRecentlyInteractedGridData"
           :modal-notification-visible="modalNotificationVisible"
           @modal-close="handle__modalClose"
           @modal-navigate="handle__modalNavigate"
           @modal-reset-loop="handle__modalResetLoop">

      <template v-if="gridSelectedItem" slot="modalBody">

        <h3>{{ gridSelectedItem.title }}</h3>
        <h4>{{ gridSelectedItem.blurb }}</h4>

        <List v-if="gridSelectedItem"
              :data="gridSelectedItem.tags"
              :class-name="'tag-list'" />

        <Layout :data="gridSelectedItem.body" />

        <ImageViewer v-if="gridSelectedItem && gridSelectedItem.gallery"
                     :data="gridSelectedItem.gallery" />

      </template>
    </Modal>

    <SortableGrid :grid-data="gridData"
                  :grid-sorted-data-primary="gridSortedDataPrimary"
                  :grid-sorted-data-secondary="gridSortedDataSecondary"
                  :grid-selected-item="gridSelectedItem"
                  :grid-all-sort-options="gridAllSortOptions"
                  @grid-item-selected="handle__gridItemSelected"
                  @grid-data-sorted="handle__gridDataSorted"
                  @sort-option-click="handle__sortOptionClick" />

  </div>
</template>

<script>

import DefaultGreeting from '@/components/DefaultGreeting'
import SortableGrid from '@/components/containers/SortableGrid'
import Modal from '@/components/ui/Modal'
import ImageViewer from '@/components/ui/ImageViewer'
import List from '@/components/ui/List'

import Layout from '@/components/containers/Layout'
//import StaticGridDataImport from '@/data/grid-data'
import StaticGridDataImport from '@/data/grid-data-dummy'

// markdown to HTML converter, for handling predictable user-facing text content
import Showdown from 'showdown'

export default {
  name: 'App',
  components: {
    DefaultGreeting,
    SortableGrid,
    Modal,
    List,
    Layout,
    ImageViewer
  },
  data () {
    return {

      // Modal state
      modalVisible: false,
      modalNotificationVisible: false,

      // Sortable grid state
      gridSelectedItem: null,
      gridSortedDataPrimary: [],
      gridSortedDataSecondary: [],
      gridSelectedSortOptions: [],
      gridMostRecentlyInteractedGridData: null,
      // Feeds our main display of default content, to note the 'content'
      // property of a gridData item is written in markdown, for conversion
      // into HTML. My assumption here is that the content is pretty simple
      // markup.
      gridData: StaticGridDataImport,

      // menu data
      gridAllSortOptions: [
        {
          value: 'Technical Consultation',
          id: 'technical-consultation',
          selected: false,
          icon: 'helloworld'
        },
        {
          value: 'Team Leadership',
          id: 'team-leadership',
          selected: false
        },
        {
          value: 'Production Management',
          id: 'production-management',
          selected: false
        },
        {
          value: 'Accessibility',
          id: 'accessibility',
          selected: false
        },
        {
          value: 'User Experience',
          id: 'user-experience',
          selected: false
        },
        {
          value: 'User Interface Design',
          id: 'user-interface-design',
          selected: false
        },
        {
          value: 'Front-end Development',
          id: 'front-end-development',
          selected: false
        }
      ]
    }
  },
  watch: {

    gridSelectedSortOptions: function (newValue, oldValue) {
      console.log('I should win the race! I should have ' + newValue.length + ' sort options selected.')
    },

    /**
     *
     **/
    gridSelectedItem: function (newValue, oldValue) {

      // Toggle the modal notification to provide user feedback if we've hiy
      // the end of a content queue
      let gridData = this.gridMostRecentlyInteractedGridData
      if (gridData.indexOf(this.gridSelectedItem) === gridData.length - 1) {
        this.modalNotificationVisible = true
      } else {
        this.modalNotificationVisible = false
      }

      console.log(`this.modalNotificationVisible: ${this.modalNotificationVisible}`)
    },

    /**
     *
     **/
    gridSortedDataPrimary: function (newValue, oldValue) {

      console.log('gridSortedDataPrimary changed, performing UI updates based on selectedSortOptions (' + this.gridSelectedSortOptions.length + ').')

      /*
      let gridItems = this.gridSortedDataPrimary
      let self = this

      if (gridItems.length) {

        const selectedSortOptions = self.gridSelectedSortOptions
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
      this.gridSelectedSortOptions = data.gridSelectedSortOptions

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

      let gridData = this.gridMostRecentlyInteractedGridData
      let currentIndex = gridData.indexOf(this.gridSelectedItem)
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

      // Update our selected gridData state
      this.gridSelectedItem = gridData[newIndex]
    },

    handle__modalClose: function () {
      this.modalVisible = false;
    },

    handle__modalResetLoop: function () {
      // Reset modal data to first grid item
      this.gridSelectedItem = this.gridData[0]
    },

    /**
     * args: {
     *  event,
     *  gridDataSource,
     *  gridSelectedItem: {
     *    content: {}
     *    title: {},
     *    blurb: {}
     *  }
     * }
     **/
    handle__gridItemSelected: function (args) {

      // Update the currently selected gridData item
      this.gridSelectedItem = args.gridSelectedItem

      // Update the most recently interacted grid
      this.gridMostRecentlyInteractedGridData = args.gridDataSource

      // Update modal contents
      let modalContent = this.formatHTML(args.gridSelectedItem.body)

      // Show the modal
      this.modalVisible = true
    },

    handle__gridDataSorted: function (data) {
      this.gridSortedDataPrimary = data.gridSortedDataPrimary
      this.gridSortedDataSecondary = data.gridSortedDataSecondary
    },

    /**
     * Public methods
     **/

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
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $color__text-base;
}
  /**
   * Main layout region
   **/
  .layout-root {
    max-width: $page__max-width;
    margin: 0 auto;
    padding: $pad__body--desktop;
  }

  /**
    * Custom tags inside Modal
    **/
  .tag-list {
    line-height: 1.1em;

    &__item {
      display: inline-block;
      vertical-align: top;
      line-height: 1.3em;
      margin: 0 2px 2px 0;
      padding: 1px 4px;
      font-size: $font__size--small;
      font-style: italic;
      color: $color__base;
      background: $color__base--yellow;
    }
  }
</style>
