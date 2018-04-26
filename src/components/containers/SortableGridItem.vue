<template>
  <div class="sortable-grid__grid-item__content">
    <slot>

      <!-- TODO: abstract layout into <Layout /> or similar component -->
      <div class="sortable-grid__grid-item__header">

        <h4 class="sortable-grid__grid-item__title">{{ title }}</h4>

      </div>
      <div class="sortable-grid__grid-item__body">

        <p class="sortable-grid__grid-item__blurb-text">{{ blurb }}</p>
        <div class="sortable-grid__grid-item__body-text">
          {{ body }}
        </div>
        <p class="sortable-grid__grid-item__date">{{ date }}</p>

      </div>
      <div class="sortable-grid__grid-item__footer">

        <ul class="sortable-grid__grid-item__tags">
          <li class="sortable-grid__grid-item__tag"
              :class="(grid_currentMenuItem && grid_currentMenuItem.tag === tag.tag) ? 'sortable-grid__grid-item__tag--current' : ''"
              v-bind:key="tag.name"
              v-for="tag in tags">
            {{ tag.name }}
          </li>
        </ul>
        <a  href=""
            class="sortable-grid__grid-item__link"
            @click.prevent
            @click="handle__click">
          More...
        </a>

      </div>
    </slot>
  </div>
</template>

<style lang="scss">

@import "../../style/reset.scss";
@import "../../style/variables.scss";
@import "../../style/utility.scss";

// Base className for BEM prefixing - do not add styles at the base level,
// they belong in <SortableGrid />
.sortable-grid {

  /**
   * Main contents
   **/
  &__grid-item__content {
    position: relative;

    display: flex;
    flex-direction: column;

    height: 100%;
    min-height: 150px;
    padding: 5px 7px 10px 5px;

    // perspective based for transformed children
    perspective: 1000px;

    // generic transition setting
    transition: 120ms ease-out;

    /**
     * States & modifiers
     **/
    .sortable-grid__grid--primary & {
      min-height: 200px;
      color: $color__text-base--reverse;
      background: $color__base--green;
    }
    .sortable-grid__grid--secondary & {
      color: $color__text-base--reverse;
      background: $color__base--blue;
    }
    .sortable-grid__grid-item--selected & {
      box-shadow: 0px 1px 20px 2px rgba($color__base--blue, 0.9);
    }
    &:hover {
      transform: scale(1.03, 1.03);
      box-shadow: 0px 1px 5px 2px rgba($color__base--blue, 0.4);
    }
  }

    /**
     * Child containers
     **/
    &__grid-item__header {
      flex: 0 0 auto;
    }
    &__grid-item__body {
      flex: 1 1 auto;
    }
    &__grid-item__footer {
      flex: 0 0 auto;
    }

    /**
     * Header
     **/
    &__grid-item__header {
      transform: rotate(-1deg); // transform on this parent for best results, rather than its children
    }
      &__grid-item__title {
        position: relative;
        top: 1px;
        left: -8px;
        display: inline;
        padding: 2px 12px;
        font-size: 1.0em;
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

    /**
     * Body contents
     **/
    &__grid-item__body {
    }
      &__grid-item__blurb-text {
        margin-top: 15px;
      }
      &__grid-item__body-text {
      }
      &__grid-item__tags {
        @include reset-list()
        line-height: 1.1em;
      }
        &__grid-item__tag {
          @include reset-list()
          display: inline-block;
          vertical-align: top;
          line-height: 1.3em;
          margin: 0 2px 2px 0;
          padding: 1px 4px;
          font-size: $font__size--smallest;
          font-style: italic;

          /**
           * States & modifiers
           **/
          // TODO: refactor this ancestor selector and following --current modifier mess
          .sortable-grid__grid--primary & {
            color: darken($color__base--green, 50);
            background: darken($color__base--green, 10)
          }
          .sortable-grid__grid--secondary & {
            color: darken($color__base--blue, 50);
            background: darken($color__base--blue, 10)
          }

          &--current[class] {
            // slightly higher specificity than the ancestor selectors above
            color: $color__base;

            .sortable-grid__grid--primary & {
              background: darken($color__base--green, 20)
            }
            .sortable-grid__grid--secondary & {
              background: darken($color__base--blue, 15)
            }
          }
        }

      &__grid-item__date {
        transform: rotate(2deg);
        position: absolute;
        bottom: -3px;
        right: -3px;
        display: inline-block;
        margin: 0;
        padding: 3px 5px;
        font-size: $font__size--smallest;
        font-weight: bold;
        color: $color__text-base;
        background: $color__base;

        /**
         * States & modifiers
         **/
        .sortable-grid__grid--primary & {
          border: 1px solid rgba($color__base--green, 0.8);
        }
        .sortable-grid__grid--secondary & {
          border: 1px solid rgba($color__base--blue, 0.8);
        }
      }
      &__grid-item__link {
        position: absolute;
        z-index: 2;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;

        @include visually-hidden-text()
      }

    /**
     * Footer contents
     **/
    &__grid-item__footer {
      padding-right: 25px;
    }
}
</style>
<script>

export default {
  name: 'SortableGridItem',
  // TODO: obviously abstract this to simply content
  props: {
    title: {
      type: String,
      default: function () {
        return ''
      }
    },
    blurb: {
      type: String,
      default: function () {
        return ''
      }
    },
    body: {
      type: String,
      default: function () {
        return ''
      }
    },
    date: {
      type: Number,
      default: function () {
        return 2018
      }
    },
    tags: {
      type: Array,
      default: function () {
        return []
      }
    },
    isOpen: {
      type: Boolean,
      default: function () {
        return false
      }
    },
    grid_currentMenuItem: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  methods: {

    /**
     * Event handlers
     **/

    handle__click: function (event) {
      this.$emit('handle__gridItemSelected', event)
    }
  },

  /**
   * Lifecycle methods
   **/
  created: function () {
  }
}
</script>
