<template>
  <ul ref="sortable-grid__menu" class="sortable-grid__menu">

    <li v-for="(sortOption,i) of gridAllSortOptions"
        :key="sortOption.value"
        :class="'sortable-grid__menu-item sortable-grid__menu-item--' + sortOption.id">

      <Button
        :icon="sortOption.icon"
        :class="[sortOption.selected ? 'sortable-grid__menu-item-link--selected' : 'sortable-grid__menu-item-link']"
        @click="handle__sortOptionClick(gridAllSortOptions[i], gridAllSortOptions)">

        <template slot="button_label">{{ sortOption.value }}</template>
      </Button>
    </li>
  </ul>
</template>

<script>
import Button from '@/components/ui/Button'

export default {
  name: 'SortableGridMenu',
  components: {
    Button
  },
  props: {
    gridAllSortOptions: {
      type: Array,
      default: function () {
        return []
      }
    }
    // ,currentMenuItem: {
    //   type: Object,
    //   default: function () {
    //     return {}
    //   }
    // }
  },
  data () {
    return {
      selectedSortOptions: []
    }
  },
  methods: {

    /**
     * Event handlers
     **/

    /**
     *
     * @param currentTarget (Object) currently selected sort option's Object representation
     **/
    handle__sortOptionClick: function (currentTarget, allTargets) {

      // The selection status on the current target is a toggle, allowing deselection of
      // previously selected options
      currentTarget.selected = !currentTarget.selected

      // Harvest an Array of currently selected sort option Objects (0 or many)
      let selectedSortOptions = this.gridAllSortOptions.filter(function (currentValue, idx) {
        if (currentValue.selected) {
          return currentValue.id
        }
      })

      // Force the selected option to the start of the Array, we will assume this is the currently
      // most desired option. this may incorrectly assume that users aren't trying to narrow
      // down sorting by adding more tags, where this solution widens sorting by accumulating more
      // results, while also placing the most recently selected option first.
      if (currentTarget.selected) {
        //selectedSortOptions.unshift(currentTarget)
      }
      // TODO: Array spread will not work in IE11
      let uniqueSelectedSortOptions = [...(new Set(selectedSortOptions))]
      this.selectedSortOptions = uniqueSelectedSortOptions

      // Emit the event for parent component to observe, ensuring a unique Array of selected options
      // is supplied
      this.$emit('handle__sortOptionClick', {
        uniqueSelectedSortOptions: uniqueSelectedSortOptions,
        currentTarget: currentTarget
      })
    }
  }
}
</script>

<style lang="scss">
// State mixins
@mixin state-transition--hover($transform) {
  transform: $transform;
  transition: transform 250ms cubic-bezier(0.175, 0.885, 0.12, 1.275);
}
@mixin state-transition--unhover($transform) {
  transform: $transform;
  transition: transform 300ms cubic-bezier(0.175, 0.730, 0.22, 1.875);
}
@mixin state-transition--selected() {
}

// Component
.sortable-grid__menu {

  @include reset-list();
  @include clearfix();

  margin-bottom: 40px;

  &-item {

    // A float - iknowright!
    float: left;

    &--user-interface-design,
    &--accessibility,
    &--team-leadership {
      clear: left;
    }
  }
  &-item-link {

    /**
     * States & modifiers
     **/
    &:link,
    &:hover,
    &:visited,
    &--selected,
    &--current {
      display: inline-block;
      margin: 0 5px 10px 0;
      text-decoration: none;
      color: $color__text-base--reverse;
      background: $color__base--reverse;
    }

    &--selected {
      background: $color__base--yellow;
    }

    &--current {
      background: $color__base--green;
    }

    &:link {
      @include state-transition--unhover(scale(1) rotate(0deg));
    }
    &:hover,
    &--selected:hover {
      background: $color__base--red;

      // Enlarge and rotate forwards a bit
      @include state-transition--hover(scale(1.04) rotate(0.5deg));
    }
  }

} // /.sortable-grid__menu
</style>
