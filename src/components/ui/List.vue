<template>
  <ul class="list"
      :class="className">
    <li v-for="dataObject in data"
        :key="dataObject.id"
        :class="[
          className ? className + '-item' : 'list__item',
          dataObject.selected ? (className ? className + '-item--selected' : 'list__item--selected') : ''
        ]">
      {{ dataObject.value }}
    </li>
  </ul>
</template>

<script>
export default {
  name: 'List',

  /**
   *
   **/
  props: {
    data: {
      type: Array,
      default: function () {
        return []
      }
    },
    className: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss">
.list {

  &__item {
  }
} // /.list

</style>
