<template>
  <ul class="list"
      :class="className">
    <li :class="[
          className ? className + '-item' : 'list__item',
          dataObject.selected ? (className ? className + '-item--selected' : 'list__item--selected') : ''
        ]"
        v-bind:key="dataObject.id"
        v-for="dataObject in data">

        {{ dataObject.value }}

    </li>
  </ul>
</template>

<style lang="scss">

// @import "../../style/variables.scss";
// @import "../../style/reset.scss";

.list {

  &__item {
  }
} // /.list

</style>

<script>

export default {
  name: 'List',

  /**
   *
   **/
  data () {
    return {
    }
  },

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
      type: String
    }
  },

  /**
   * Props requiring processing or non-trivial logic that we don't want cached
   */
  methods: {

    /**
     * Event handlers
     **/
    /*
    handle__x: function (event, args) {

      this.$emit('eventName', {
        event,
        args
      })
    },
    */

    /**
     * Public methods
     **/
  },

  /**
   * Lifecycle methods
   **/
  mounted: function () {
  }
}
</script>
