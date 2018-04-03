<template>
  <div class="portfolio__grid-item-content">
    <slot>
      <h4>{{ title }}</h4>
      <p>{{ body }}</p>
    </slot>
  </div>
</template>

<script>

export default {
  name: 'PortfolioItem',
  props: [
    'title',
    'body'
  ],
  created: function () {
    // `this` points to the component instance
  },
  mounted: function () {
  }
}
</script>
