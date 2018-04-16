<template>
  <a  @click.prevent
      @click="handle__click()"
      href="">

        <span></span>
        <slot>Button</slot>
  </a>
</template>

<style scoped lang="scss">
a {
  // Vue's @click.prevent removes the default pointer
  cursor: pointer;
  &[disabled=true] {
    cursor: not-allowed;
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
  props: {
  },
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
  },
  created: function () {
    this.$emit('Button::created')
  },
  mounted: function () {
    this.$emit('Button::mounted')
  }
}
</script>
