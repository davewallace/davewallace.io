<template>
  <ul class="list"
      :class="className">
    <li v-for="dataObject in data"
        :key="dataObject.id"
        :class="[
          className ? className + '__item' : 'list__item',
          dataObject.selected ? (className ? className + '__item--selected' : 'list__item--selected') : ''
        ]">
      {{ dataObject.value }} ({{ dataObject.selected }})
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
  },
  watch: {
    data: function (newValue, oldValue) {
      console.log('List data updated...')
      console.log(newValue)
    }
  }
}
</script>

<style lang="scss">
.list {
  @include reset-list();
  &__item {
    @include reset-list();
  }
}
</style>
