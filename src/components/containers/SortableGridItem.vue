<template>
  <div class="sortable-grid__grid-item__content">
    <slot>
      <div class="sortable-grid__grid-item__title-wrap">
        <h4 class="sortable-grid__grid-item__title">{{ title }}</h4>
      </div>
      <p class="sortable-grid__grid-item__blurb-text">{{ blurb }}</p>
      <a  href=""
          class="sortable-grid__grid-item__link"
          @click.prevent
          @click="handle__click">
        More...
      </a>
      <div class="sortable-grid__grid-item__body-text">{{ body }}</div>
      <ul class="sortable-grid__grid-item__tags">
        <li class="sortable-grid__grid-item__tag"
            v-bind:key="tag.name"
            v-for="tag in tags">
          {{ tag.name }}
        </li>
      </ul>
      <div class="sortable-grid__grid-item__date">{{ date }}</div>
    </slot>
  </div>
</template>

<style lang="scss">
/**
 * All imports and contextual SCSS must be contained within this single style tag
 */
@import "../../style/reset.scss";
@import "../../style/variables.scss";
@import "../../style/utility.scss";

.sortable-grid__grid-item__content {
  position: relative;
  height: 100%;
  padding: 5px 7px 20px 5px;

  // perspective based for transformed children
  perspective: 1000px;

  // default flex, IE11 and older evergreen browsers
  .sortable-grid__grid--primary & {
    color: $color__text-base--reverse;
    background: $color__base--green;
  }
  .sortable-grid__grid--secondary & {
    color: $color__text-base--reverse;
    background: $color__base--blue;
  }

  // tweaks to display in 3d space
  transition: 100ms linear;
  &:hover {
    transform: scale(1.05, 1.05);
  }
}
  .sortable-grid__grid-item__title-wrap {
    transform: rotate(-1deg);
  }
    .sortable-grid__grid-item__title {
      position: relative;
      top: 1px;
      left: -8px;
      display: inline;
      padding: 2px 12px;
      line-height: 21px;
      background: $color__base;
      color: $color__text-base;

      // titles have some false extra padding to the left & right so we can have
      // some edge overlap + borders
      &:before,
      &:after {
        position: absolute;
        top: -1px;
        left: -5px;
        content: '<';
        display: inline-block;
        width: 10px;
        background: $color__base;
        color: $color__base;
      }
      &:before {
        border-width: 0;
        border-left-width: 1px;
        border-top-width: 1px;
        border-style: solid;
        .sortable-grid__grid--primary & {
          border-color: $color__base--green;
        }
        .sortable-grid__grid--secondary & {
          border-color: $color__base--blue;
        }
      }
      &:after {
        content: '>';
        left: auto;
        top: auto;
        right: 0px;
        bottom: 0px;
      }
    } // /.sortable-grid__grid-item__title

  .sortable-grid__grid-item__blurb-text {
    margin-top: 15px;
  }
    .sortable-grid__grid-item__link {
      position: absolute;
      z-index: 2;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;

      @include visually-hidden-text()
    }
  .sortable-grid__grid-item__body-text {
  }
  .sortable-grid__grid-item__tags {
    @include reset-list()
    line-height: 1.1em;
  }
  .sortable-grid__grid-item__tag {
    @include reset-list()
    display: inline-block;
    vertical-align: top;
    line-height: 1.3em;
    margin: 0 2px 2px 0;
    padding: 1px 4px;
    font-size: $font__size--smallest;
    font-style: italic;

    .sortable-grid__grid--primary & {
      color: darken($color__base--green, 50);
      background: darken($color__base--green, 10)
    }
    .sortable-grid__grid--secondary & {
      color: darken($color__base--blue, 50);
      background: darken($color__base--blue, 10)
    }
  }
  .sortable-grid__grid-item__date {
    transform: rotate(2deg);
    position: absolute;
    bottom: -3px;
    right: -3px;
    display: inline-block;
    padding: 3px 5px;
    font-size: $font__size--smallest;
    font-weight: bold;
    color: $color__text-base;
    background: $color__base;

    .sortable-grid__grid--primary & {
      border: 1px solid rgba($color__base--green, 0.8);
    }
    .sortable-grid__grid--secondary & {
      border: 1px solid rgba($color__base--blue, 0.8);
    }
  }

.sortable-grid__grid-item--selected {
  border: 2px dashed $color__base--yellow;
}
</style>
<script>

export default {
  name: 'SortableGridItem',
  props: [
    'title',
    'blurb',
    'body',
    'date',
    'tags',
    'isOpen'
  ],
  methods: {
    handle__click: function (event) {
      //this.$emit('handle__gridItemSelected', event, this)
      this.$emit('handle__gridItemSelected', event)
    }
  },
  created: function () {
  },
  mounted: function () {
  }
}
</script>