<template>
  <ul>
    <li v-for="portfolioSortOption in allPortfolioSortOptions" v-bind:key="portfolioSortOption.name">
      <a href="javascript:;">{{ portfolioSortOption.name }}</a>
    </li>
  </ul>
</template>

<script>

export default {
  name: 'MenuPortfolioItems',
  data () {
    return {
      allPortfolioSortOptions: [
        {
          name: 'Front-end Development'
        },
        {
          name: 'User Experience'
        },
        {
          name: 'User Interface Design'
        },
        {
          name: 'Team Leadership'
        },
        {
          name: 'Production Management'
        }
      ]
    }
  },
  created: function () {
    // `this` points to the component instance
  },
  mounted: function () {
  }
}
</script>
