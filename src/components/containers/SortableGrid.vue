<template>
  <div class="sortable-grid">

    <!-- grid sorting - listens to the specified event and responds to it with the associated method
     -->
    <SortableGridMenu
      v-on:handle__sortOptionClick="this.handle__sortOptionClick"
      :grid_allSortOptions="this.grid_allSortOptions" />

    <!-- grid contents, sorted by user preference and date. conditionally rendered. -->
    <div v-if="grid_sortedDataPrimary.length">

      <h3 class="sortable-grid__selection-notice">My work, sorted by your selections and by date...</h3>
      <ul class="sortable-grid__grid sortable-grid__grid--primary">
        <!-- TODO: abstract this element into <SortableGridItem /> so it renders an <li> or
            other element as its root node -->
        <li class="sortable-grid__grid-item"
            v-for="grid_sortedDataPrimaryItem in grid_sortedDataPrimary"
            v-bind:key="grid_sortedDataPrimaryItem.name">

          <SortableGridItem
            :grid_currentMenuItem="grid_currentMenuItem"
            :title="grid_sortedDataPrimaryItem.title"
            :blurb="grid_sortedDataPrimaryItem.blurb"
            :tags="grid_sortedDataPrimaryItem.tags"
            :date="grid_sortedDataPrimaryItem.date"
            :isOpen="grid_sortedDataPrimaryItem.selected ? true : false"
            :class="grid_sortedDataPrimaryItem.selected ? 'sortable-grid__grid-item--selected' : ''"
            v-on:handle__gridItemSelected="handle__gridItemSelected($event, grid_sortedDataPrimaryItem, grid_sortedDataPrimary)" />
        </li>
      </ul>
    </div>

    <!-- grid contents, remaining less-preferred data, sorted by date -->
    <h3 class="sortable-grid__selection-notice">All of my work, sorted by date...</h3>
    <ul class="sortable-grid__grid sortable-grid__grid--secondary">
      <li class="sortable-grid__grid-item"
          v-for="grid_sortedDataSecondaryItem in grid_sortedDataSecondary"
          v-bind:key="grid_sortedDataSecondaryItem.name">

        <SortableGridItem
          :grid_currentMenuItem="grid_currentMenuItem"
          :title="grid_sortedDataSecondaryItem.title"
          :tags="grid_sortedDataSecondaryItem.tags"
          :date="grid_sortedDataSecondaryItem.date"
          :isOpen="grid_sortedDataSecondaryItem.selected ? true : false"
          :class="grid_sortedDataSecondaryItem.selected ? 'sortable-grid__grid-item--selected' : ''"
          v-on:handle__gridItemSelected="handle__gridItemSelected($event, grid_sortedDataSecondaryItem, grid_sortedDataSecondary)" />
      </li>
    </ul>

  </div> <!-- /.sortable-grid__root -->
</template>

<style lang="scss">

@import "../../style/variables.scss";
@import "../../style/reset.scss";

.sortable-grid {

  // We'll implement grid here because its cool. but we'll start with defaults for IE11 and
  // older evergreen browsers
  &__grid {
    @include reset-list();

    // default flex, IE11 & older evergreen browsers
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    // yaay, we got grid
    display: grid;
    grid-gap: 30px;

    // lets optimise for older, narrow width devices when content starts looking unreadable
    @media (max-width: 320px) {
      display: block;
      max-width: initial;
      margin-bottom: 20px;
      padding: 0 1%;
    }

    /**
     * Our top grid will contain larger, more prominent children
     **/
    &--primary {
      grid-template-columns: 1fr 1fr 1fr;
      margin-bottom: 40px;

      @media (max-width: 760px) {
        grid-template-columns: 1fr 1fr;
      }
    }

    /**
     * Our bottom grid will contain smaller, less prominent children
     **/
    &--secondary {
      grid-template-columns: 1fr 1fr 1fr 1fr;

      @media (max-width: 760px) {
        grid-template-columns: 1fr 1fr 1fr;
      }
      @media (max-width: 480px) {
        grid-template-columns: 1fr 1fr;
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
      zeroSortedItemsMessage: true,
      grid_currentMenuItem: null
    }
  },

  /**
   *
   **/
  props: {
    grid_allSortOptions: {
      type: Array,
      default: function () {
        return []
      }
    },
    grid_selectedItem: {
      type: Object,
      default: function () {
        return null
      }
    },
    grid_data: {
      type: Array,
      default: function () {
        return []
      }
    },
    grid_sortedDataPrimary: {
      type: Array,
      default: function () {
        return []
      }
    },
    grid_sortedDataSecondary: {
      type: Array,
      default: function () {
        return []
      }
    }
  },

  /**
   * Watched props generally for expensive or async operations
   **/
  watch: {
    grid_selectedItem: function (newValue, oldValue) {
      this.updateGridSelectedState()
    }
  },

  /**
   * Props requiring processing or non-trivial logic that we don't want cached
   */
  methods: {

    /**
     * Event handlers
     **/

    /**
     *
     **/
    handle__gridItemSelected: function (event, grid_selectedItem, grid_dataSource) {

      this.$emit('gridItemSelected', {
        event,
        grid_selectedItem,
        grid_dataSource
      })
    },

    /**
     * data: {
     *   uniqueSelectedSortOptions,
     *   currentTarget
     * }
     **/
    handle__sortOptionClick: function (data) {

      // Sort our grid data based on the received user selections
      this.sortGridData(data.uniqueSelectedSortOptions)

      // Update the most recently selected menu item
      this.grid_currentMenuItem = data.currentTarget
    },

    /**
     * Public methods
     **/

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

        self.grid_data.forEach(function (dataItem, dataItemIndex) {

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

      // Sort remaining data by date, then set
      let secondarySortData = [...(new Set(this.grid_data))].sort(function (b, a) {
        return parseFloat(a.date) - parseFloat(b.date)
      })

      // emit data back to parent which will mutate this components' state props
      this.$emit('gridDataSorted', {
        grid_sortedDataPrimary: [...(new Set(primarySortData))],
        grid_sortedDataSecondary: secondarySortData
      })

      return this
    },

    /**
     *
     **/
    updateGridSelectedState: function () {

      // Switch all previous dataItem to unselected state
      this.grid_data.forEach(function (dataItem) {
        dataItem.selected = false
      })

      // Set the current dataItem to selected state (note: because we have two subsets
      // of grid_data that gets sorted, we will potentially have two dataItems. This
      // isn't technically incorrect though it may exhibit side-effects - so leaving
      // this as the case for now).
      this.grid_selectedItem.selected = true
    }
  },

  /**
   * Lifecycle methods
   **/
  mounted: function () {

    // Start with a date-sorted list of data
    this.sortGridData()
  }
}
</script>
