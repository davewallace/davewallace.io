<template>
  <a  @click.prevent
      @click="handle__click()"
      href=""
      class="button button--generic">

    <!-- if we have an iconprop defined, render an icon and wrap text in a span -->
    <template v-if="icon">
      <slot name="button_icon" />
      <span :class="this.visuallyHiddenText ? 'visually-hidden' : ''">
        <slot name="button_label">Button</slot>
      </span>
    </template>

    <!-- otherwise just keep it simple -->
    <template v-else>
      <slot name="button_label">Button</slot>
    </template>
  </a>
</template>

<style scoped lang="scss">

// @import "../../style/variables.scss";
// @import "../../style/reset.scss";
// @import "../../style/utility.scss";

// State mixins
@mixin state-transition--hover($transform) {
  transform: $transform;
  transition: transform 250ms cubic-bezier(0.175, 0.885, 0.12, 1.275);
}
@mixin state-transition--unhover($transform) {
  transform: $transform;
  transition: transform 300ms cubic-bezier(0.175, 0.730, 0.22, 1.875);
}
@mixin state-transition--selected() {
}

// Component
.button {
  display: inline-block;
  padding: 3px 8px;
  text-decoration: none;
  color: $color__base;

  /**
   * States & modifiers
   **/
  &--primary {
    background-color: $color__base--green;
    @include state-transition--unhover(scale(1) rotate(-6deg));

    // Darken, enlarge and rotate forwards a bit
    &:hover {
      background-color: darken($color__base--green, 20);
      @include state-transition--hover(scale(1.2) rotate(6deg));
    }
  }

  &--secondary {
    background-color: $color__base--yellow;
    @include state-transition--unhover(scale(1) rotate(3deg));

    // Darken, enlarge and rotate backwards a bit
    &:hover {
      background-color: darken($color__base--yellow, 20);
      @include state-transition--hover(scale(1.2) rotate(-2deg));
    }
  }

  &--tertiary {
    background-color: $color__base--blue;
    @include state-transition--unhover(scale(1) rotate(3deg));

    // Darken, enlarge and rotate backwards a bit
    &:hover {
      background-color: darken($color__base--blue, 20);
      @include state-transition--hover(scale(1.2) rotate(-2deg));
    }
  }

  &--warning {
    background-color: $color__base--red;
    @include state-transition--unhover(scale(1) rotate(3deg));

    // Darken, enlarge and rotate backwards a bit
    &:hover {
      background-color: darken($color__base--red, 20);
      @include state-transition--hover(scale(1.2));
    }
  }

} // /.button
</style>

<script>

export default {
  name: 'Button',
  data () {
    return {
    }
  },
  props: [
    'visuallyHiddenText',
    'icon'
  ],
  methods: {

    /**
     * Event handlers
     **/

    handle__click: function () {

      if (this.selectable) {
        this.selected = !this.selected
      }

      // Allow listening by parent-defined listeners. note that adding a `v-on="$listeners"`
      // in the above templated <a> element removes the need to remember to call this, but
      // this behaviour appears to be non-standard.
      this.$emit('click')
    }
  }
}
</script>
