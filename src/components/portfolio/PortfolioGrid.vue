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
        :body="portfolioItem.body"
        :date="portfolioItem.date"
        :tags="portfolioItem.tags" />
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
    }
  },
  created: function () {
    // `this` points to the component instance
  },
  mounted: function () {
  }
}
</script>
