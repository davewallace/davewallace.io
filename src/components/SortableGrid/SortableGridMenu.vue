<template>
  <ul class="sortable-grid__menu">
    <li class="sortable-grid__menu-item"
        v-for="sortOption in allSortOptions"
        v-bind:key="sortOption.name">

          <!-- Button component handles its own toggling and assumes a BEM-style
              className base has been supplied as a prop for it to append a modifier to -->
          <Button
            class="sortable-grid__menu-item-link"
            modifierClassNameBase="sortable-grid__menu-item-link"
            selectable="true"
            @click="handle_menuItemClick( sortOption.tag )">
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
          tag: 'front-end-development'
        },
        {
          name: 'User Experience',
          tag: 'user-experience'
        },
        {
          name: 'User Interface Design',
          tag: 'user-interface-design'
        },
        {
          name: 'Team Leadership',
          tag: 'team-leadership'
        },
        {
          name: 'Production Management',
          tag: 'production-management'
        },
        {
          name: 'Client Relations',
          tag: 'client-relations'
        },
        {
          name: 'Technical Consultation',
          tag: 'technical-consultation'
        }
      ]
    }
  },
  methods: {
    handle_menuItemClick: function (sortOption) {
      console.log('menu item clicked')
      this.$emit('test', sortOption)
    }
  },
  created: function () {
    // `this` points to the component instance
  },
  mounted: function () {
  }
}
</script>
