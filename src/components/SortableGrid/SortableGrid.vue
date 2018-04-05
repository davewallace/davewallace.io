<template>
  <div class="sortable-grid__root">

    <!-- grid sorting - listens to the specified event and responds to it with the associated method
     -->
    <SortableGridMenu v-on:handle_sortOptionClick="sortGridData" />

    <!-- grid contents - displays a collection of components based on this components' computed data supply -->
    <ul class="sortable-grid__grid">
      <li class="sortable-grid__grid-item" v-for="sortedGridDataItem in sortedGridData" v-bind:key="sortedGridDataItem.name">
        <SortableGridItem
          :title="sortedGridDataItem.title"
          :body="sortedGridDataItem.body"
          :date="sortedGridDataItem.date"
          :tags="sortedGridDataItem.tags" />
      </li>
    </ul>
    <p v-if="zeroSortedItemsMessage">Select items.</p>

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
    border: 1px dashed orange;
  }

  // We'll implement grid here because its cool. but we'll start with defaults for IE11 and
  // older evergreen browsers
  &__grid {
    @include list-reset();

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
    }
}
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
          tags: ['user-experience'],
          date: 2018
        },
        {
          title: 'Duis libero mi, tempor nec tempor',
          body: 'Quisque augue nulla, convallis dictum faucibus sed, pulvinar sed purus. Donec sed risus in augue fermentum eleifend.',
          tags: ['user-experience', 'user-interface-design'],
          date: 2017
        },
        {
          title: 'Fusce lectus curriculum vitae urna',
          body: 'Aliquam luctus posuere facilisis. Nunc auctor condimentum ex, sed laoreet tortor facilisis eu.',
          tags: ['user-experience', 'user-interface-design'],
          date: 2017
        },
        {
          title: 'Sed rutrum purus eros, eu pretium',
          body: 'Donec vel ipsum sed urna eleifend iaculis. Sed et tincidunt justo. Vivamus tempor viverra rutrum.',
          tags: ['user-experience', 'front-end-development'],
          date: 2016
        },
        {
          title: 'Suspendisse sit amet libero vitae dolor',
          body: 'Curabitur at sodales lectus, sit amet sodales ex. Praesent elit mauris, mattis commodo faucibus non, pretium non purus.',
          tags: ['user-experience', 'front-end-development'],
          date: 2015
        },
        {
          title: 'Sit amet libero Suspendisse vitae dolor',
          body: 'Curabitur at sodales lectus, sit amet sodales ex. , mattis commodo faucibus non, pretium non purus.',
          tags: ['production-management'],
          date: 2014
        },
        {
          title: 'Praesent elit mauris libero vitae dolor',
          body: 'Urna eleifend iaculis. Sed et tincidunt Praesent elit mauris, mattis commodo faucibus non, pretium non purus.',
          tags: ['user-experience', 'front-end-development'],
          date: 2013
        },
        {
          title: 'Bibendum et ex eget, sodales tincidunt leo',
          body: 'Praesent elit mauris, mattis commodo faucibus non, pretium non purus. Curabitur at sodales lectus, sit amet sodales ex. ',
          tags: ['user-experience', 'front-end-development'],
          date: 2018
        },
        {
          title: 'Suspendisse sit amet libero vitae dolor',
          body: 'Lectus, sit amet sodales ex. Nunc auctor condimentum ex, sed laoreet tortor.',
          tags: ['team-leadership', 'front-end-development'],
          date: 2015
        }
      ],
      sortedGridData: [],
      zeroSortedItemsMessage: true
    }
  },

  /**
   * Watched props generally for expensive or async operations
   **/
  watch: {
    sortedGridData: function (newlySortedGridData, oldSortedGridData) {

      // When there is no selected data, display an appropriate message.
      this.zeroSortedItemsMessage = (newlySortedGridData.length === 0) ? true : false // eslint-disable-line no-unneeded-ternary
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
     *
     * @param selectedSortOptions (Array) Array of Objects containing sort data e.g.; tags
     **/
    sortGridData: function (selectedSortOptions) {

      const self = this

      // Iterate through currently selected sort options. scan through all component gridData objects,
      // and each of those gridData objects tags. Where a grid data item's tags matches a currently
      // selected sort option, add it to a newly sorted Array. When finished iterating, set gridData
      // to the newly sorted value.
      let newlySortedData = []
      let uniqueSelectedSortOptions = [...(new Set(selectedSortOptions))]

      uniqueSelectedSortOptions.forEach(function (option) {

        self.gridData.forEach(function (gridDataItem) {

          // If a given gridData item has tags which match a selected tag, add it to the new Array
          gridDataItem.tags.forEach(function (tag) {

            if (option.tag === tag) {
              // The given gridData item's set of tags contains a selected sort option's tag, so add
              // it to our newly sorted Array
              newlySortedData.push(gridDataItem)
            }

          })
        })

      })

      this.sortedGridData = newlySortedData
    }
  },
  created: function () {
  },
  mounted: function () {
  }
}
</script>
