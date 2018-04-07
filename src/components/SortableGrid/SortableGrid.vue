<template>
  <div class="sortable-grid__root">

    <!-- grid sorting - listens to the specified event and responds to it with the associated method
     -->
    <SortableGridMenu v-on:handle_sortOptionClick="sortGridData" />

    <!-- grid contents, sorted by user preference and date -->
    <h3 class="sortable-grid__selection-notice" v-if="sortedGridDataPrimary.length">My work, sorted by your selections and by date</h3>
    <ul class="sortable-grid__grid sortable-grid__grid--primary">
      <li class="sortable-grid__grid-item"
          v-for="sortedGridDataPrimaryItem in sortedGridDataPrimary"
          v-bind:key="sortedGridDataPrimaryItem.name">
        <SortableGridItem
          :title="sortedGridDataPrimaryItem.title"
          :body="sortedGridDataPrimaryItem.body"
          :date="sortedGridDataPrimaryItem.date"
          :tags="sortedGridDataPrimaryItem.tags" />
      </li>
    </ul>

    <!-- grid contents, remaining less-preferred data, sorted by date -->
    <h3 class="sortable-grid__selection-notice">All of my work, sorted by date</h3>
    <ul class="sortable-grid__grid sortable-grid__grid--secondary">
      <li class="sortable-grid__grid-item"
          v-for="sortedGridDataSecondaryItem in sortedGridDataSecondary"
          v-bind:key="sortedGridDataSecondaryItem.name">
        <SortableGridItem
          :title="sortedGridDataSecondaryItem.title"
          :body="sortedGridDataSecondaryItem.body"
          :date="sortedGridDataSecondaryItem.date"
          :tags="sortedGridDataSecondaryItem.tags" />
      </li>
    </ul>

  </div> <!-- /.sortable-grid__root -->
</template>

<style lang="scss">

@mixin list-reset() {
  margin: 0;
  padding: 0;
  list-style-type: none;
}

.sortable-grid {

  &__root {
  }

    &__menu {
      border: 1px dashed cyan;
    }

    // We'll implement grid here because its cool. but we'll start with defaults for IE11 and
    // older evergreen browsers
    &__grid {
      @include list-reset();

      padding: 20px;

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
      grid-template-columns: 1fr 1fr 1fr;
      grid-gap: 30px;

      &--primary {
        border: 1px dashed green;
      }
      &--secondary {
        border: 1px dashed orange;
      }
    }

      // Again with child grid items, we'll default to older layouts and use @supports to then
      // wipe out those defaults in grid-supporting browsers
      &__grid-item {
        @include list-reset();
        border: 1px dashed yellow;

        // default flex, IE11 & older evergreen browsers
        flex: 1 0 30%;
        padding: 0 3%;
        max-width: calc(30% + 3%);

        // lets optimise for older, narrow width devices when content starts looking unreadable
        @media (max-width: 640px) {
          flex-basis: 47%;
          padding: 0 3%;
          max-width: calc(48% + 3%);
        }
        @media (max-width: 320px) {
          padding: 0 1%;
          max-width: initial;
        }

        // yaay, we got grid
        @supports (display: grid) {
          padding: 0;
          max-width: initial;
        }
      } // /&__grid-item

} // /.sortable-grid
</style>

<script>
import SortableGridMenu from '@/components/SortableGrid/SortableGridMenu'
import SortableGridItem from '@/components/SortableGrid/SortableGridItem'

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
          body: 'Quisque orci nisi, bibendum et ex eget, sodales tincidunt leo. Vivamus vitae congue tellus.',
          tags: [
            {tag: 'user-experience', name: 'User Experience'}
          ],
          date: 2018
        },
        {
          title: 'Convallis dictum faucibus sed',
          body: 'Quisque orci nisi, bibendum et ex eget, sodales tincidunt leo. Vivamus vitae congue tellus.',
          tags: [
            {tag: 'accessibility', name: 'Accessibility'}
          ],
          date: 2017
        },
        {
          title: 'Duis libero mi, tempor nec tempor',
          body: 'Quisque augue nulla, convallis dictum faucibus sed, pulvinar sed purus. Donec sed risus in augue fermentum eleifend.',
          tags: [
            {tag: 'user-experience', name: 'User Experience'}
          ],
          date: 2017
        },
        {
          title: 'Fusce lectus curriculum vitae urna',
          body: 'Aliquam luctus posuere facilisis. Nunc auctor condimentum ex, sed laoreet tortor facilisis eu.',
          tags: [
            {tag: 'user-experience', name: 'User Experience'},
            {tag: 'user-interface-design', name: 'User Interface Design'},
            {tag: 'front-end-development', name: 'Front End Development'}
          ],
          date: 2017
        },
        {
          title: 'Sed rutrum purus eros, eu pretium',
          body: 'Donec vel ipsum sed urna eleifend iaculis. Sed et tincidunt justo. Vivamus tempor viverra rutrum.',
          tags: [
            {tag: 'user-interface-design', name: 'User Interface Design'},
            {tag: 'front-end-development', name: 'Front End Development'}
          ],
          date: 2016
        },
        {
          title: 'Suspendisse sit amet libero vitae dolor',
          body: 'Curabitur at sodales lectus, sit amet sodales ex. Praesent elit mauris, mattis commodo faucibus non, pretium non purus.',
          tags: [
            {tag: 'front-end-development', name: 'Front End Development'}
          ],
          date: 2015
        },
        {
          title: 'Sit amet libero Suspendisse vitae dolor',
          body: 'Curabitur at sodales lectus, sit amet sodales ex. , mattis commodo faucibus non, pretium non purus.',
          tags: [
            {tag: 'production-management', name: 'Production Management'}
          ],
          date: 2014
        },
        {
          title: 'Praesent elit mauris libero vitae dolor',
          body: 'Urna eleifend iaculis. Sed et tincidunt Praesent elit mauris, mattis commodo faucibus non, pretium non purus.',
          tags: [
            {tag: 'technical-consultation', name: 'Technical Consultation'},
            {tag: 'user-interface-design', name: 'User Interface Design'},
            {tag: 'production-management', name: 'Production Management'}
          ],
          date: 2013
        },
        {
          title: 'Bibendum et ex eget, sodales tincidunt leo',
          body: 'Praesent elit mauris, mattis commodo faucibus non, pretium non purus. Curabitur at sodales lectus, sit amet sodales ex. ',
          tags: [
            {tag: 'user-experience', name: 'User Experience'},
            {tag: 'front-end-development', name: 'Front End Development'}
          ],
          date: 2018
        },
        {
          title: 'Suspendisse sit amet libero vitae dolor',
          body: 'Lectus, sit amet sodales ex. Nunc auctor condimentum ex, sed laoreet tortor.',
          tags: [
            {tag: 'team-leadership', name: 'Team Leadership'},
            {tag: 'production-management', name: 'Production Management'}
          ],
          date: 2015
        }
      ],
      sortedGridDataPrimary: [],
      sortedGridDataSecondary: [],
      zeroSortedItemsMessage: true
    }
  },

  /**
   * Watched props generally for expensive or async operations
   **/
  watch: {
    sortedGridData: function (newlySortedGridData, oldSortedGridData) {
      /*
      // When there is no selected data, display an appropriate message.
      this.zeroSortedItemsMessage = (newlySortedGridData.length === 0) ? true : false // eslint-disable-line no-unneeded-ternary
      */
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
      this.sortedGridDataPrimary = primarySortData

      // Sort remaining data by date, then set
      let secondarySortData = [...(new Set(this.gridData))].sort(function (b, a) {
        return parseFloat(a.date) - parseFloat(b.date)
      })
      this.sortedGridDataSecondary = secondarySortData

      return this
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
