<template>
  <div class="sortable-grid__grid-item-content">
    <slot>
      <h4>{{ title }}</h4>
      <p>{{ body }}</p>
      <p>{{ date }}</p>
      <p>{{ tags }}</p>
    </slot>
  </div>
</template>

<script>

export default {
  name: 'SortableGridItem',
  props: [
    'title',
    'body',
    'date',
    'tags'
  ],
  created: function () {
    // `this` points to the component instance
  },
  mounted: function () {
  }
}
</script>
