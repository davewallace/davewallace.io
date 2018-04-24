<template>
  <a  @click.prevent
      @click="handle__click()"
      href=""
      class="button button--generic">

    <slot name="button_icon" />

    <span :class="this.visuallyHiddenText ? 'visually-hidden' : ''">
      <slot name="button_label">Button</slot>
    </span>
  </a>
</template>

<style scoped lang="scss">

@import "../../style/variables.scss";
@import "../../style/reset.scss";
@import "../../style/utility.scss";

.button {
  display: inline-block;
  padding: 3px 8px;
  text-decoration: none;
  color: $color__base;
}
.button--primary {
  background-color: $color__base--green;

  &:hover {
    background-color: darken($color__base--green, 20);
  }
}
.button--secondary {
  background-color: $color__base--yellow;

  &:hover {
    background-color: darken($color__base--yellow, 20);
  }
}
.button--tertiary {
  background-color: $color__base--blue;

  &:hover {
    background-color: darken($color__base--blue, 20);
  }
}
.button--warning {
  background-color: $color__base--red;

  &:hover {
    background-color: darken($color__base--red, 20);
  }
}
</style>

<script>

export default {
  name: 'Button',
  data () {
    return {
    }
  },
  props: [
    'visuallyHiddenText'
  ],
  methods: {
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
