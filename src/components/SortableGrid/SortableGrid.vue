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

  &__grid {
    @include list-reset();
  }
    &__grid-item {
      @include list-reset();
      border: 1px dashed yellow;
    }
}
</style>

<template>
  <div class="sortable-grid__root">

    <!-- grid sorting -->
    <SortableGridMenu v-on:test="updateSortPrefs" />

    <!-- grid contents -->
    <ul class="sortable-grid__grid">
      <li class="sortable-grid__grid-item" v-for="sortableGridItem in allSortableGridItems" v-bind:key="sortableGridItem.name">
        <SortableGridItem
          :title="sortableGridItem.title"
          :body="sortableGridItem.body"
          :date="sortableGridItem.date"
          :tags="sortableGridItem.tags" />
      </li>
    </ul>

  </div> <!-- /.sortable-grid__root -->
</template>

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
      defaultTags: ['front-end-development']
    }
  },

  /**
   * Watched props generally for expensive or async operations
   **/
  watch: {
    /*
    sortPrefs: function (newPrefs, oldPrefs) {

    }
    */
  },

  /**
   * Computed props used for any props requiring processing or non-trivial logic,
   * that may be cached for improved performance
   **/
  computed: {

    /**
     * Takes an Array of tags, defaulting to tags that make me look the best
     */
    sortPrefs: function (customTags = this.defaultTags) {

      console.log('allSortableGridItems: ' + this.allSortableGridItems)

      return customTags
    },

    /**
     *
     **/
    allSortableGridItems: function () {

      let sortedList = [
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
          tags: ['user-experience', 'front-end-development'],
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
          tags: ['user-experience', 'front-end-development'],
          date: 2015
        }
      ]

      return sortedList
    }
  },

  /**
   * Props requiring processing or non-trivial logic that we don't want cached
   */
  methods: {
    updateSortPrefs: function (sortOption) {
      console.log('updated sort prefs: ' + sortOption)
    }
  },
  created: function () {
    // `this` points to the component instance

    this.$on('handle_optionClick', function (msg) {
      console.log('child event received by parent.')
    })
  },
  mounted: function () {
  }
}
</script>
