<template>
  <ul>
    <li v-for="sortOption in allSortOptions" v-bind:key="sortOption.name">
      <a href="javascript:;" @click="handle_optionClick( sortOption.tag )">{{ sortOption.name }}</a>
    </li>
  </ul>
</template>

<script>

export default {
  name: 'SortableGridMenu',
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
    handle_optionClick: function (sortOption) {
      console.log('sort option clicked')
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
