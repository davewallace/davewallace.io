<template>
  <div class="sortable-grid__grid-item-content">
    <slot>
      <h4>{{ title }}</h4>
      <p>{{ body }}</p>
      <p>{{ date }}</p>
      <p>{{ formatTags(tags, false) }}</p>
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
  methods: {

    /**
     *
     */
    formatTags: function (tags, usePunctuation = true) {

      let formatted = ''

      tags.forEach(function (option, idx, list) {

        // Nicely formatted output, because I care.
        formatted += option.name

        if (usePunctuation) {
          if (idx < list.length - 2) {
            formatted += ', '
          }
          if (list.length > 1 && idx === list.length - 2) {
            formatted += ' and '
          }
        } else {
          if (idx < list.length - 1) {
            formatted += ', '
          }
        }
      })
      return formatted
    }
  },
  created: function () {
  },
  mounted: function () {
  }
}
</script>
