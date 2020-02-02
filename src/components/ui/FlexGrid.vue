<!-- No <template /> element, we will use this component's `render()` method to
     assemble FlexGridItem contents, as we need to use some logic -->

<script>
export default {
  name: 'FlexGrid',
  props: {
    /**
     * `horizontal` and `vertical` are the two expected values, the FlexGrid works
     * in both situations. Vertical grids will need more attention paid to their
     * individual implementations because of limitations when an explicit CSS
     * `height` property is not applied.
     **/
    direction: {
      type: String,
      default: function() {
        return 'horizontal';
      }
    },
    /**
     * 
     **/
    gutterSize: {
      type: String,
      default: function () {
        return 'var(--flex-grid__gutter)';
      }
    },
    /**
     * Applies, or excludes, a visual gap between grid items along the main flex
     * axis.
     **/
    useHorizontalGap: {
      type: Boolean,
      default: function() {
        return true;
      }
    },
    /**
     * Applies, or excludes, a visual gap between grid items along the cross
     * flex axis.
     **/
    useVerticalGap: {
      type: Boolean,
      default: function() {
        return true;
      }
    },
    /**
     * This property is used to calculate FlexGridItem widths. It can be exceeded
     * both by the number of FlexGridItem children and also by the total number of
     * units that each FlexGridItem takes up. While not ideal, if the value is
     * exceeded, excess FlexGridItems will wrap.
     **/
    maxUnits: {
      type: Number,
      default: 12
    }
  },

  methods: {

    /**
     * Returns default FlexGrid classNames, combined with supplied additional
     * classNames
     *
     * @param {Array} additionalClasses
     * @return {Array}
     */
    gridClasses: function(additionalClasses) {
      let classes = ['flex-grid', 'flex-grid--' + this.direction];

      if (
        this.direction === 'horizontal' &&
        this.useHorizontalGap &&
        !this.isStacked
      ) {
        classes.push('flex-grid--horizontal-gap');
      }

      if (
        this.direction === 'vertical' &&
        this.useVerticalGap &&
        !this.isStacked
      ) {
        classes.push('flex-grid--vertical-gap');
      }

      if (additionalClasses && additionalClasses.length) {
        classes = classes.concat(additionalClasses);
      }

      return classes;
    },
  },

  render(h) {
    let totalSuppliedUnits = 0;

    // generate a clean set of intentionally coupled FlexGridItem children, keeping
    // track of the number of supplied units as we go, it may not equal `maxUnits`
    let gridItems = this.$scopedSlots.default().filter(vnode => {
      if (
        vnode.componentOptions &&
        vnode.componentOptions.Ctor.options.name === 'FlexGridItem'
      ) {
        if (typeof vnode.componentOptions.propsData.units !== 'undefined') {
          totalSuppliedUnits += vnode.componentOptions.propsData.units;
        } else {
          totalSuppliedUnits += 1; // default 'units' per FlexGrid item
        }

        return vnode;
      }
    });

    // determine the gutter size for FlexGridItem nodes which could be zero if props
    // have been supplied to disable visual gaps
    let gutterSize = this.gutterSize;
    if (
      (this.direction === 'horizontal' && !this.useHorizontalGap) ||
      (this.direction === 'vertical' && !this.useVerticalGap)
    ) {
      gutterSize = '0px';
    }

    // iterate our cleaned set of child nodes. we're about to mutate properties
    // on vnodes as we iterate, and though vnodes are supposed to be immutable,
    // Vue doesn't currently enforce this. for safer forwards compat we'll clone
    // vnodes and mutate those instead.
    let firstGridItem,
      currentUnwrappedUnits = 0,
      itemHasWrapped = false;

    gridItems = gridItems.map((vnode, index) => {
      
      // TODO: clone and modify props data sent in, as the original vnode should be
      // considered immutable
      //vnode = cloneVNode(vnode);

      // wrap potentially non-existent or wrongly typed `.class` value so we
      // can safely push more classNames onto it
      vnode.data.class = [vnode.data.class];

      // pass props to child GridItems so they can calculate their size
      vnode.componentOptions.propsData.sizeData = {
        gutterSize: gutterSize,
        maxGridUnits: this.maxUnits,
        numberOfSuppliedGridItems: gridItems.length,
      };

      // save a reference to the first vnode, this is so we can apply className
      // that should be the first node regardless of source flex `order` which
      // may differ. default to index-based first vnode
      if (!firstGridItem && index === 0) {
        firstGridItem = vnode;
      }

      // update to be first if flex re-ordered as first
      if (vnode.componentOptions.propsData.order === 1) {
        firstGridItem = vnode;
      }

      // handle wrapping of too-large grid items
      if (totalSuppliedUnits > this.maxUnits) {
        let addUnits = 0;
        if (typeof vnode.componentOptions.propsData.units !== 'undefined') {
          addUnits += vnode.componentOptions.propsData.units;
        } else {
          addUnits += 1; // default, if not specified
        }

        // we're going to wrap, at least once, on this item
        if (currentUnwrappedUnits + addUnits > this.maxUnits) {
          vnode.data.class.push('flex-grid-item--first');
          currentUnwrappedUnits = addUnits; // restart the count
          itemHasWrapped = true;
        } else {
          currentUnwrappedUnits += addUnits; // continue the count
        }

        if (itemHasWrapped) {
          vnode.data.class.push('flex-grid-item--wrapped');
        }
      }

      return vnode;
    });

    // give the first (visual, not DOM order) FlexGridItem a first modifier
    firstGridItem.data.class.push('flex-grid-item--first');

    // apply default classNames to Grid node, plus any conditionally required
    // ones
    let additionalClasses = [];
    if (totalSuppliedUnits > this.maxUnits) {
      if (this.useVerticalGap) {
        additionalClasses.push('flex-grid--wrapped', 'flex-grid--wrapped-gap');
      } else {
        additionalClasses.push('flex-grid--wrapped');
      }
    }

    return h(
      'ul',
      {
        class: this.gridClasses(additionalClasses),
      },
      [gridItems]
    );
  },
};
</script>

<style lang="scss">
@mixin flex-grid-item-generate-gutters(
  $_borderType: left,
  $_gutterSize: var(--flex-grid__gutter)
) {
  > .flex-grid-item {
    // because we use transparent borders for gutters but don't want that
    // counting as visible item width
    box-sizing: content-box;
    background-clip: padding-box;
    // reset all possibly existing border widths, it is assumed that grid gaps
    // are unidirectional
    border-width: 0;
    border-#{$_borderType}: #{$_gutterSize} solid transparent;
  }

  // the "first" item should never have a gutter, but `:first-child` may not be
  // accurate if flex re-ordering has been applied, so use generated "first"
  // className instead. this works in most cases with the exception of:
  //  - when the browser ignores the order property due to siblings not having
  //    an order property also
  > .flex-grid-item--first {
    border-width: 0;
  }
}

// Grid styles
.flex-grid {
  display: flex;
  flex-grow: 1; // in case nested inside a parent grid cell
  margin: 0;
  padding: 0;

  // main Grid modifiers applied based on supplied prop values
  &--wrapped {
    flex-wrap: wrap;
  }

  // content-containing elements
  &-item {
    flex-grow: 0; // by default we want item size to respect unit-based calculations
    flex-shrink: 1; // by default we want to auto-adjust for gutters
    min-width: 0; // allows flex items to shrink below their minimum content size
    margin: 0;
    padding: 0;
    hyphens: auto; // default prevents text from causing FlexGrid mis-alignments
    list-style-type: none;

    // FlexGrid item modifiers based on supplied prop values
    &--grow {
      flex-grow: 1;
    }
    &--no-shrink {
      flex-shrink: 0;
    }
    &--no-hyphens {
      hyphens: none;
    }
    &--overflow {
      overflow: auto;
    }
  }

  // horizontal FlexGrid
  &--horizontal {
    flex-direction: row;

    &-gap {
      @include flex-grid-item-generate-gutters(left, var(--flex-grid__gutter));
    }
  }

  // vertical FlexGrid
  &--vertical {
    flex-direction: column;

    &-gap {
      @include flex-grid-item-generate-gutters(top, var(--flex-grid__gutter));
    }
  }

  &--wrapped-gap .flex-grid-item--wrapped {
    // margin better to use here instead of borders, as natural FlexGrid gap is
    // assumed to be unidirectional, whereas this additional type of FlexGrid gap
    // only applies when FlexGridItems wrap, and if the gap is confgured as
    // desirable for a given FlexGrid
    margin-top: var(--flex-grid__gutter);
  }
}

.flex-grid {
  background-color: rgba(255, 0, 0, 0.2);
  * {
    background-color: rgba(0, 255, 0, 0.2);
  }
  * * {
    background-color: rgba(0, 0, 255, 0.2);
  }
  * * * {
    background-color: rgba(255, 0, 255, 0.2);
  }
  * * * * {
    background-color: rgba(0, 255, 255, 0.2);
  }
  * * * * * {
    background-color: rgba(255, 255, 0, 0.2);
  }

  .flex-grid-item--first {
    background: cyan;
  }
}
</style>