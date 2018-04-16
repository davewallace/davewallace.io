<template>
  <div class="modal-root">
<!--
  <a  @click.prevent
      @click="handle__click()"
      href="">

        <span></span>
        <slot>Close</slot>
  </a>
-->
<!--
        <a href=""
         class="sortable-grid__grid-item__button-close"
         :class="isOpen ? '' : 'display-none' ">

         <span class="visually-hidden-text">(close)</span>
      </a>
-->

  <Button>Close me!</Button>

  <slot name="header">
      <h4>Header.</h4>
    </slot>
    <slot name="body">
      <p>Body.</p>
    </slot>
    <slot name="footer">
      <p>Footer.</p>
    </slot>
  </div>
</template>

<style scoped lang="scss">
a {
  // Vue's @click.prevent removes the default pointer
  cursor: pointer;
  &[disabled=true] {
    cursor: not-allowed;
  }
}
.modal-root {
  border: 4px dashed red;
}
</style>

<script>

import Button from '@/components/ui/Button'

export default {
  name: 'Modal',
  data () {
    return {
    }
  },
  components: {
    Button
  },
  props: {
  },
  methods: {
  },
  created: function () {

    this.$on('Button::created', function (button) {
      console.log('new Button created: ')
      console.log(button)
    })

  },
  mounted: function () {
  }
}
</script>
