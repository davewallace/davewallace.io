<template>
  <ul class="sortable-grid__menu" ref="sortable-grid__menu">

    <li class="sortable-grid__menu-item"
        v-for="(sortOption,i) of allSortOptions"
        v-bind:key="sortOption.name">

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
            :class="sortOption.selected ? 'sortable-grid__menu-item-link--selected' : 'sortable-grid__menu-item-link'"
            @click="handle_sortOptionClick(allSortOptions[i])"
          >

              {{ sortOption.name }}
          </Button>

    </li>
  </ul>
</template>

<style lang="scss">
.sortable-grid__menu-item-link {

  color: white;

  &--selected {
    font-weight: bold;
  }
}
</style>

<script>
import Button from '@/components/Button'

export default {
  name: 'SortableGridMenu',
  components: {
    Button
  },
  data () {
    return {
      allSortOptions: [
        {
          name: 'Front-end Development',
          icon: '',
          tag: 'front-end-development',
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
          name: 'Technical Consultation',
          icon: '',
          tag: 'technical-consultation',
          selected: false
        }
      ]
    }
  },
  methods: {

    /**
     *
     * @param currentTarget (Object) currently selected sort option's Object representation
     **/
    handle_sortOptionClick: function (currentTarget) {

      currentTarget.selected = !currentTarget.selected

      // harvest an Array of currently selected sort options (1 or many)
      let selectedSortOptions = this.allSortOptions.filter(function (currentValue, idx) {
        if (currentValue.selected) {
          return currentValue.tag
        }
      })

      // force the selected option to the start of the Array, we will assume this is the currently
      // most desired option. this may incorrectly assume that users aren't trying to narrow
      // down sorting by adding more tags, where this solution widens sorting by accumulating more
      // results, while also placing the most recently selected option first.
      if (currentTarget.selected) {
        selectedSortOptions.unshift(currentTarget)
      }

      this.$emit('handle_sortOptionClick', selectedSortOptions)
    }
  },
  created: function () {
    // `this` points to the component instance
  },
  mounted: function () {
  }
}
</script>
