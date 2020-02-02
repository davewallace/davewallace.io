<template>
  <div class="sortable-grid">

    <!-- Grid sorting - listens to the specified event and responds to it with
      the associated method -->
    <SortableGridMenu
      :grid-all-sort-options="gridAllSortOptions"
      :grid-selected-sort-options="gridSelectedSortOptions"
      @sort-option-click="handle__sortOptionClick" />

    <!-- Grid contents sorted by user prefs & date. Conditionally rendered. -->
    <div v-if="gridSortedDataPrimary.length">

      <h3 class="sortable-grid__selection-notice">My work, sorted by your selections and by date...</h3>
      <ul class="sortable-grid__grid sortable-grid__grid--primary">
        <!-- TODO: abstract this element into <SortableGridItem /> so it renders
            an <li> or other element as its root node -->
        <li v-for="gridSortedDataPrimaryItem in gridSortedDataPrimary"
            :key="gridSortedDataPrimaryItem.value"
            class="sortable-grid__grid-item"
            :class="gridSortedDataPrimaryItem.selected ? 'sortable-grid__grid-item--selected' : ''">

          <SortableGridItem
            :grid-current-menu-item="gridCurrentMenuItem"
            :title="gridSortedDataPrimaryItem.title"
            :blurb="gridSortedDataPrimaryItem.blurb"
            :tags="gridSortedDataPrimaryItem.tags"
            :date="gridSortedDataPrimaryItem.date"
            :is-open="gridSortedDataPrimaryItem.selected ? true : false"
            @grid-item-selected="handle__gridItemSelected($event, gridSortedDataPrimaryItem, gridSortedDataPrimary)" />
        </li>
      </ul>
    </div>

    <!-- grid contents, remaining less-preferred data, sorted by date -->
    <h3 class="sortable-grid__selection-notice">All of my work, sorted by date...</h3>
    <ul class="sortable-grid__grid sortable-grid__grid--secondary">
      <li v-for="gridSortedDataSecondaryItem in gridSortedDataSecondary"
          :key="gridSortedDataSecondaryItem.value"
          class="sortable-grid__grid-item"
          :class="gridSortedDataSecondaryItem.selected ? 'sortable-grid__grid-item--selected' : ''">

        <SortableGridItem
          :grid-current-menu-item="gridCurrentMenuItem"
          :title="gridSortedDataSecondaryItem.title"
          :tags="gridSortedDataSecondaryItem.tags"
          :date="gridSortedDataSecondaryItem.date"
          :is-open="gridSortedDataSecondaryItem.selected ? true : false"
          @grid-item-selected="handle__gridItemSelected($event, gridSortedDataSecondaryItem, gridSortedDataSecondary)" />
      </li>
    </ul>

  </div> <!-- /.sortable-grid__root -->
</template>

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
   *
   **/
  props: {
    gridAllSortOptions: {
      type: Array,
      default: function () {
        return []
      }
    },
    gridSelectedSortOptions: {
      type: Array,
      default: function () {
        return []
      }
    },
    gridSelectedItem: {
      type: Object,
      default: function () {
        return null
      }
    },
    gridData: {
      type: Array,
      default: function () {
        return []
      }
    },
    gridSortedDataPrimary: {
      type: Array,
      default: function () {
        return []
      }
    },
    gridSortedDataSecondary: {
      type: Array,
      default: function () {
        return []
      }
    }
  },

  /**
   *
   **/
  data () {
    return {
      defaultTags: ['front-end-development'],
      zeroSortedItemsMessage: true,
      gridCurrentMenuItem: null
    }
  },

  /**
   * Watched props generally for expensive or async operations
   **/
  watch: {
    gridSelectedItem: function (newValue, oldValue) {

      this.updateGridSelectedState()
    }
  },

  /**
   * Lifecycle methods
   **/
  created: function () {

    console.log('SortableGrid.vue created.')

    // Start with a date-sorted list of data
    this.sortGridData()
  },

  /**
   * Props requiring processing or non-trivial logic that we don't want cached
   */
  methods: {

    /**
     * Event handlers
     **/
    handle__gridItemSelected: function (event, gridSelectedItem, gridDataSource) {

      this.$emit('grid-item-selected', {
        event,
        gridSelectedItem,
        gridDataSource
      })
    },

    /**
     * data: {
     *   uniqueSelectedSortOptions,
     *   currentTarget
     * }
     **/
    handle__sortOptionClick: function (data) {

      // Remove or add selected sort option from Array of all selected sort options
      if (data.currentTarget.selected) {
        this.gridSelectedSortOptions.push(data.currentTarget)
      } else {
        let index = this.gridSelectedSortOptions.indexOf(data.currentTarget)
        if (index > -1) {
          this.gridSelectedSortOptions.splice(data.currentTarget, index)
        }
      }

      // Sort our grid data based on the received user selections
      this.sortGridData(data.uniqueSelectedSortOptions)

      // Update the most recently selected menu item
      this.gridCurrentMenuItem = data.currentTarget

      console.log('Grid handled sortOptionClick()')

      // Propagate event up to parent
      this.$emit('sort-option-click', {
        gridSelectedSortOptions: this.gridSelectedSortOptions
      })
    },

    /**
     * Public methods
     **/

    /**
     * Sorts grid data into two data sets: data sorted by user preference, and
     * everything. Both sets of data are then independently sorted by date.
     *
     * TODO: Didn't use a simpler sort function here because we're sorting by an
     * object's key whose value is an Array that needs iterating to find
     * matches, and we also want to work on subsets of data. Still room for
     * improvement though, like taking functions as args to use supplied sort
     * functions rather than assumed ones.
     *
     * @param selectedSortOptions (Array) Array of Objects containing tag(s) for
     *                                    sort matching.
     * @return this (SortableGrid)
     **/
    sortGridData: function (selectedSortOptions = []) {

      const self = this

      // Iterate supplied sort options to apply tag-based matching to our data.
      // We will split out preferred data into subsets by tag so those subsets
      // can then again be individually sorted by date. Once all subsets are
      // sorted by date we will concatenate them back into one, fully sorted
      // structure. This way, the most recently selected sort option items are
      // most prominent - even if they are older than previously selected
      // options.
      let primarySortData = []
      let primarySortStructures = []
      selectedSortOptions.forEach(function (option, sortOptionsIndex) {

        self.gridData.forEach(function (dataItem, dataItemIndex) {

          dataItem.tags.forEach(function (tagObj) {

            // If a given item has tags which match a selected tag, add it to
            // the new Array.
            if (option.id === tagObj.id) {

              // Create a new data structure for the current user-selected tag,
              // if one does not already exist.
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
      // TODO: Array spread will not work in IE11
      let secondarySortData = [...(new Set(this.gridData))].sort(function (b, a) {
        return parseFloat(a.date) - parseFloat(b.date)
      })

      console.log('emitting:gridDataSorted')

      // emit data back to parent which will mutate this components' state props
      this.$emit('grid-data-sorted', {
        // TODO: Array spread will not work in IE11
        gridSortedDataPrimary: [...(new Set(primarySortData))],
        gridSortedDataSecondary: secondarySortData
      })

      return this
    },

    /**
     *
     **/
    updateGridSelectedState: function () {

      // Switch all previous dataItem to unselected state
      this.gridData.forEach(function (dataItem) {
        dataItem.selected = false
      })

      // Set the current dataItem to selected state (note: because we have two
      // subsets of gridData that gets sorted, we will potentially have two
      // dataItems. This isn't technically incorrect though it may exhibit
      // side-effects - so leaving this as the case for now).
      this.gridSelectedItem.selected = true
    }
  }
}
</script>

<style lang="scss">
.sortable-grid {

  // We'll implement grid here because its cool. but we'll start with defaults
  // for IE11 and older evergreen browsers
  &__grid {
    @include reset-list();

    // default flex, IE11 & older evergreen browsers
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    // yaay, we got grid
    display: grid;
    grid-gap: $pad__grid-gap--desktop;

    // lets optimise for older, narrow width devices when content starts looking
    // unreadable
    @media (max-width: 320px) {
      display: block;
      max-width: initial;
      margin-bottom: $pad__grid-gap--device;
      padding: 0 1%;
    }

    /**
     * States & modifiers
     **/
    // Our top grid will contain larger, more prominent children
    &--primary {
      grid-template-columns: 1fr 1fr 1fr;
      margin-bottom: 40px;

      @media (max-width: 760px) {
        grid-template-columns: 1fr 1fr;
      }
    }

    // Our bottom grid will contain smaller, less prominent children
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

    // Again with child grid items, we'll default to older layouts and use
    // @supports to then wipe out those defaults in grid-supporting browsers
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
