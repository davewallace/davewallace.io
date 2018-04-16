<template>
  <ul class="sortable-grid__menu" ref="sortable-grid__menu">

    <li v-for="(sortOption,i) of allSortOptions"
        v-bind:key="sortOption.name"
        :class="'sortable-grid__menu-item sortable-grid__menu-item--' + sortOption.tag">

          <!-- Button component handles its own toggling and assumes a BEM-style
              className base has been supplied as a prop for it to append a modifier to
          <Button
            modifierClassNameBase="sortable-grid__menu-item-link"
            selectable="true"
            @click="handle_sortOptionClick( sortOption.tag )"
            class="sortable-grid__menu-item-link"
          -->

          <Button
            :icon="sortOption.icon"
            :class="[sortOption.selected ? 'sortable-grid__menu-item-link--selected' : 'sortable-grid__menu-item-link',
                    sortOption.current ? 'sortable-grid__menu-item-link--current' : '']"
            @click="handle_sortOptionClick(allSortOptions[i], allSortOptions)"
          >

              {{ sortOption.name }}
          </Button>

    </li>
  </ul>
</template>

<style lang="scss">
/**
 * All imports and contextual SCSS must be contained within this single style tag
 */
@import "../../style/reset.scss";
@import "../../style/utility.scss";
@import "../../style/variables.scss";

.sortable-grid__menu {

  @include reset-list()
  @include clearfix()

  // adjust main sort menu alignment as the viewport decreases in width
  margin: 0 40px 40px auto;

  // reverse the child element right-floated DOM reversal, child elements reverse this again
  transform: scaleY(-1);

  &-item {

    // DOM order reversed for the right inline-block alignment effect
    float: right;
    // So we need to reverse it again
    transform: scaleY(-1);

    &--user-interface-design,
    &--accessibility,
    &--team-leadership {
      clear: right;
    }
  }
  &-item-link {

    &:link,
    &:hover,
    &:visited,
    &--selected,
    &--current {
      display: inline-block;
      margin: 0 5px 10px 0;
      padding: 3px 5px;
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

    &:hover,
    &--selected:hover {
      background: $color__base--red;
    }
  }

} // /.sortable-grid__menu
</style>

<script>
import Button from '@/components/ui/Button'

export default {
  name: 'SortableGridMenu',
  components: {
    Button
  },
  data () {
    return {
      allSortOptions: [
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
      ],
      selectedSortOptions: []
    }
  },
  methods: {

    /**
     *
     * @param currentTarget (Object) currently selected sort option's Object representation
     **/
    handle_sortOptionClick: function (currentTarget, allTargets) {

      allTargets.forEach(function (target) {
        target.current = false
      })

      currentTarget.selected = !currentTarget.selected
      currentTarget.current = true

      // Harvest an Array of currently selected sort options (1 or many)
      let selectedSortOptions = this.allSortOptions.filter(function (currentValue, idx) {
        if (currentValue.selected) {
          return currentValue.tag
        }
      })

      // Force the selected option to the start of the Array, we will assume this is the currently
      // most desired option. this may incorrectly assume that users aren't trying to narrow
      // down sorting by adding more tags, where this solution widens sorting by accumulating more
      // results, while also placing the most recently selected option first.
      if (currentTarget.selected) {
        selectedSortOptions.unshift(currentTarget)
      }
      let uniqueSelectedSortOptions = [...(new Set(selectedSortOptions))]
      this.selectedSortOptions = uniqueSelectedSortOptions

      // Emit the event for parent component to observe, ensuring a unique Array of selected options
      // is supplied
      this.$emit('handle_sortOptionClick', uniqueSelectedSortOptions)
    }
  },
  created: function () {
    // `this` points to the component instance
  },
  mounted: function () {
  }
}
</script>
