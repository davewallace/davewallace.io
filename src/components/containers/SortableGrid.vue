<template>
  <div class="sortable-grid">

    <!-- grid sorting - listens to the specified event and responds to it with the associated method
     -->
    <SortableGridMenu v-on:handle_sortOptionClick="sortGridData" />

    <!-- grid contents, sorted by user preference and date. conditionally rendered. -->
    <div v-if="sortedGridDataPrimary.length">

      <h3 class="sortable-grid__selection-notice">My work, sorted by your selections and by date...</h3>
      <ul class="sortable-grid__grid sortable-grid__grid--primary">
        <li class="sortable-grid__grid-item"
            v-for="sortedGridDataPrimaryItem in sortedGridDataPrimary"
            v-bind:key="sortedGridDataPrimaryItem.name">

          <SortableGridItem
            :title="sortedGridDataPrimaryItem.title"
            :blurb="sortedGridDataPrimaryItem.blurb"
            :tags="sortedGridDataPrimaryItem.tags"
            :date="sortedGridDataPrimaryItem.date"
            :isOpen="sortedGridDataPrimaryItem.selected ? true : false"
            :class="sortedGridDataPrimaryItem.selected ? 'sortable-grid__grid-item--selected' : ''"
            v-on:handle__gridItemSelected="handle__gridItemSelected($event, sortedGridDataPrimaryItem, sortedGridDataPrimary)" />
        </li>
      </ul>
    </div>

    <!-- grid contents, remaining less-preferred data, sorted by date -->
    <h3 class="sortable-grid__selection-notice">All of my work, sorted by date...</h3>
    <ul class="sortable-grid__grid sortable-grid__grid--secondary">
      <li class="sortable-grid__grid-item"
          v-for="sortedGridDataSecondaryItem in sortedGridDataSecondary"
          v-bind:key="sortedGridDataSecondaryItem.name">

        <SortableGridItem
          :title="sortedGridDataSecondaryItem.title"
          :tags="sortedGridDataSecondaryItem.tags"
          :date="sortedGridDataSecondaryItem.date"
          :isOpen="sortedGridDataSecondaryItem.selected ? true : false"
          :class="sortedGridDataSecondaryItem.selected ? 'sortable-grid__grid-item--selected' : ''"
          v-on:handle__gridItemSelected="handle__gridItemSelected($event, sortedGridDataSecondaryItem, sortedGridDataSecondary)" />
      </li>
    </ul>

  </div> <!-- /.sortable-grid__root -->
</template>

<style lang="scss">
/**
 * All imports and contextual SCSS must be contained within this single style tag
 */
@import "../../style/reset.scss";
@import "../../style/variables.scss";

.sortable-grid {

  // We'll implement grid here because its cool. but we'll start with defaults for IE11 and
  // older evergreen browsers
  &__grid {
    @include reset-list();

    // default flex, IE11 & older evergreen browsers
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    // lets optimise for older, narrow width devices when content starts looking unreadable
    @media (max-width: 320px) {
      display: block;
      padding: 0 1%;
      max-width: initial;
    }

    // yaay, we got grid
    display: grid;

    &--primary {
      grid-template-columns: 1fr 1fr 1fr;
      grid-gap: 30px;
      margin-bottom: 40px;

      @media (max-width: 640px) {
        grid-template-columns: 1fr 1fr;
      }
      @media (max-width: 320px) {
        display: block;
      }
    }
    &--secondary {
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
      grid-gap: 30px;

      @media (max-width: 640px) {
        grid-template-columns: 1fr 1fr 1fr;
      }
      @media (max-width: 320px) {
        display: block;
      }
    }
  } // &__grid

    // Again with child grid items, we'll default to older layouts and use @supports to then
    // wipe out those defaults in grid-supporting browsers
    &__grid-item {
      @include reset-list();

      position: relative;
      @media (max-width: 320px) {
        margin-bottom: 30px;
      }

      // yaay, we got grid, clear out non-grid defaults
      @supports (display: grid) {
      }
    } // /&__grid-item

    .sortable-grid__selection-notice {
      font-size: 0.8em;
      margin-bottom: 10px;
      color: #b1afaf;
    }

} // /.sortable-grid
</style>

<script>
import SortableGridMenu from './SortableGridMenu'
import SortableGridItem from './SortableGridItem'

export default {
  name: 'SortableGrid',
  components: {
    SortableGridMenu,
    SortableGridItem
  },

  /**
   * Simple props only
   **/
  data () {
    return {
      defaultTags: ['front-end-development'],
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
          body: 'Donec vel ipsum sed urna eleifend iaculis. Sed et tincidunt justo. Vivamus tempor viverra rutrum.',
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
          body: 'Curabitur at sodales lectus, sit amet sodales ex. Praesent elit mauris, mattis commodo faucibus non, pretium non purus.',
          tags: [
            {tag: 'front-end-development', name: 'Front End Development'}
          ],
          date: 2015,
          selected: false
        },
        {
          title: 'Sit amet libero Suspendisse vitae dolor',
          blurb: 'Quisque orci nisi, bibendum et ex eget...',
          body: 'Curabitur at sodales lectus, sit amet sodales ex. , mattis commodo faucibus non, pretium non purus.',
          tags: [
            {tag: 'production-management', name: 'Production Management'}
          ],
          date: 2014,
          selected: false
        },
        {
          title: 'Praesent elit mauris libero vitae dolor',
          blurb: 'Quisque orci nisi, bibendum et ex eget...',
          body: 'Urna eleifend iaculis. Sed et tincidunt Praesent elit mauris, mattis commodo faucibus non, pretium non purus.',
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
          body: 'Praesent elit mauris, mattis commodo faucibus non, pretium non purus. Curabitur at sodales lectus, sit amet sodales ex. ',
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
          body: 'Lectus, sit amet sodales ex. Nunc auctor condimentum ex, sed laoreet tortor.',
          tags: [
            {tag: 'team-leadership', name: 'Team Leadership'},
            {tag: 'production-management', name: 'Production Management'}
          ],
          date: 2015,
          selected: false
        }
      ],
      selectedGridItem: null,
      sortedGridDataPrimary: [],
      sortedGridDataSecondary: [],
      zeroSortedItemsMessage: true
    }
  },

  /**
   * Watched props generally for expensive or async operations
   **/
  watch: {
    selectedGridItem: function (oldValue, newValue) {
      console.log(oldValue)
      console.log(newValue)
    }
  },

  /**
   * Computed props used for any props requiring processing or non-trivial logic, that may be cached for
   * improved performance
   **/
  computed: {
  },

  /**
   * Props requiring processing or non-trivial logic that we don't want cached
   */
  methods: {

    /**
     * Sorts grid data into two data sets: data sorted by user preference, and everything.
     * Both sets of data are then independently sorted by date.
     *
     * TODO: Didn't use a simpler sort function here because we're sorting by an object's
     * key whose value is an Array that needs iterating to find matches, and we also want
     * to work on subsets of data. Still room for improvement though, like taking functions
     * as args to use supplied sort functions rather than assumed ones.
     *
     * @param selectedSortOptions (Array) Array of Objects containing tag(s) for sort matching
     * @return this (SortableGrid)
     **/
    sortGridData: function (selectedSortOptions = []) {

      const self = this

      // Iterate supplied sort options to apply tag-based matching to our data. We will
      // split out preferred data into subsets by tag so those subsets can then again
      // be individually sorted by date. Once all subsets are sorted by date we will
      // concatenate them back into one, fully sorted structure. This way, the most
      // recently selected sort option items are most prominent - even if they are older
      // than previously selected options.
      let primarySortData = []
      let primarySortStructures = []
      selectedSortOptions.forEach(function (option, sortOptionsIndex) {

        self.gridData.forEach(function (dataItem, dataItemIndex) {

          dataItem.tags.forEach(function (tagObj) {

            // If a given item has tags which match a selected tag, add it to the new Array.
            if (option.tag === tagObj.tag) {

              // Create a new data structure for the current user-selected tag, if one does
              // not already exist.
              if (typeof primarySortStructures[sortOptionsIndex] === 'undefined') {
                primarySortStructures[sortOptionsIndex] = []
              }
              primarySortStructures[sortOptionsIndex].push(dataItem)
            }

          })
        })
      })

      // Date sort and concatenate all structures back together, then set
      primarySortStructures.forEach(function (structure) {

        let sortedByDate = structure.sort(function (b, a) {
          return parseFloat(a.date) - parseFloat(b.date)
        })
        primarySortData = primarySortData.concat(sortedByDate)
      })
      this.sortedGridDataPrimary = [...(new Set(primarySortData))]

      // Sort remaining data by date, then set
      let secondarySortData = [...(new Set(this.gridData))].sort(function (b, a) {
        return parseFloat(a.date) - parseFloat(b.date)
      })
      this.sortedGridDataSecondary = secondarySortData

      return this
    },

    /**
     *
     **/
    handle__gridItemSelected: function (event, selectedGridItem, currentGrid) {

      // Switch all previous dataItem to unselected state
      this.gridData.forEach(function (dataItem) {
        dataItem.selected = false
      })

      // Set the current dataItem to selected state (note: because we have two subsets
      // of gridData that gets sorted, we will potentially have two dataItems. This
      // isn't technically incorrect though it may exhibit side-effects - so leaving
      // this as the case for now).
      selectedGridItem.selected = true
      this.selectedGridItem = selectedGridItem

      this.$emit('gridItemSelected', {
        event,
        selectedGridItem,
        currentGrid
      })
    }
  },
  created: function () {
  },
  mounted: function () {

    // Start with a date-sorted list of data
    this.sortGridData()
  }
}
</script>
