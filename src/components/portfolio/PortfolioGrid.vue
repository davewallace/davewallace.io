<style>
.portfolio__grid {
  border: 1px dashed orange;
}
</style>

<template>
  <ul class="portfolio__grid">
    <li v-for="portfolioItem in allPortfolioItems" v-bind:key="portfolioItem.name">
      <PortfolioItem
        :title="portfolioItem.title"
        :body="portfolioItem.body" />
    </li>
  </ul>
</template>

<script>

import PortfolioItem from '@/components/portfolio/PortfolioItem'

export default {
  name: 'PortfolioGrid',
  components: {
    PortfolioItem
  },
  data () {
    return {
      allPortfolioItems: [
        {
          title: 'Lorem ipsum dolor sit amet, consectetur',
          body: 'Quisque orci nisi, bibendum et ex eget, sodales tincidunt leo. Vivamus vitae congue tellus.'
        },
        {
          title: 'Duis libero mi, tempor nec tempor',
          body: 'Quisque augue nulla, convallis dictum faucibus sed, pulvinar sed purus. Donec sed risus in augue fermentum eleifend.'
        },
        {
          title: 'Fusce lectus curriculum vitae urna',
          body: 'Aliquam luctus posuere facilisis. Nunc auctor condimentum ex, sed laoreet tortor facilisis eu.'
        },
        {
          title: 'Sed rutrum purus eros, eu pretium',
          body: 'Donec vel ipsum sed urna eleifend iaculis. Sed et tincidunt justo. Vivamus tempor viverra rutrum.'
        },
        {
          title: 'Suspendisse sit amet libero vitae dolor',
          body: 'Curabitur at sodales lectus, sit amet sodales ex. Praesent elit mauris, mattis commodo faucibus non, pretium non purus.'
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
