<template>
  <li
    class="flex-grid-item"
    :class="[
      grows ? 'flex-grid-item--grow' : '',
      shrinks ? '' : 'flex-grid-item--no-shrink',
      overflows ? 'flex-grid-item--overflow' : '',
      hyphens ? '' : 'flex-grid-item--no-hyphens',
    ]"
    :style="{ flexBasis: getSize, order: order }"
  >
    <slot />
  </li>
</template>

<script>
export default {
  name: 'FlexGridItem',
  props: {
    /**
     * The number of units a GridItem should use in the Grid
     **/
    units: {
      type: Number,
      default: 1,
      validator: function(value) {
        return value > 0;
      }
    },
    /**
     * The flex order of the GridItem within the Grid
     **/
    order: {
      type: Number,
      default: undefined
    },
    /**
     * Whether the GridItem should use flexbox growth behaviours. If it should,
     * the `flex-grow` behaviour is restricted to a value of `1` via an applied
     * CSS className.
     **/
    grows: {
      type: Boolean,
      default: function() {
        return false;
      }
    },
    /**
     * Whether the GridItem should use flexbox shrink behaviours. If it should,
     * the `flex-shrink` behaviour is restricted to a value of `1` via an applied
     * CSS className.
     **/
    shrinks: {
      type: Boolean,
      default: function() {
        return true;
      }
    },
    /**
     * Whether the contents of a GridItem should trigger the default browser
     * scroll control if they exceed the GridItems dimensions.
     **/
    overflows: {
      type: Boolean,
      default: function() {
        return false;
      }
    },
    /**
     * Whether the contents of a GridItem should use hyphens (for example to
     * avoid disrespecting GridItem size proportions).
     **/
    hyphens: {
      type: Boolean,
      default: function() {
        return true;
      }
    },
    /**
     * Props data received from the intentionally coupled Grid component. This
     * data is used to calculate the dimensions of each GridItem.
     **/
    sizeData: {
      type: Object,
      default: function() {
        return {
          gutterSize: undefined,
          maxGridUnits: undefined,
          numberOfSuppliedGridItems: undefined
        };
      }
    }
  },
  computed: {
    // simplify the output of CSS selectors for sizing drastically, and allow
    // props-based setting of a grid size, by using a single inline style for
    // flex-basis (and only this property!)
    getSize() {
      // one item taking up one unit is calculated by:
      //   - 100% of container minus all required gutters
      //   - divide by max number of units 'allowed' in the Grid
      let defaultItemSize = `(100% - (${this.sizeData.gutterSize} * ${this
        .sizeData.maxGridUnits - 1})) / ${this.sizeData.maxGridUnits}`;

      if (this.units === 1) {
        return `calc( ${defaultItemSize} )`;
      }

      // one item taking up multiple units is calculated by:
      //   - the size of one item taking up one unit (defaultItemSize)
      //   - multiply by the number of units the item is taking up
      //   - add back the gutter widths between combined units
      let multiUnitItemSize = `(${defaultItemSize} * ${this.units}) + (${
        this.sizeData.gutterSize
      } * ${this.units - 1})`;

      return `calc( ${multiUnitItemSize} )`;
    }
  }
};
</script>
