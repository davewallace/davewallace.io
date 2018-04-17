<template>
  <div class="modal_root"
       :class="visible ? 'modal--visible' : 'modal--invisible' ">

    <Button class="modal_button-close"
            @click="handle__click_close"
            visuallyHiddenText="true">
      <Icon type="close" />
    </Button>

    <h2 class="modal_title">
      <slot name="title">Slot title</slot>
    </h2>

    <div class="modal_body">
      <slot name="body">
        <p>Slot body.</p>
      </slot>
    </div>

  </div>
</template>

<style scoped lang="scss">

@import "../../style/reset.scss";
@import "../../style/variables.scss";
@import "../../style/utility.scss";

a {
  // Vue's @click.prevent removes the default pointer
  cursor: pointer;
  &[disabled=true] {
    cursor: not-allowed;
  }
}

.modal {

  &_root {
    padding: 40px;
  }
  &--visible {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: $z-index--modal;

    background: rgba(0, 0, 0, 0.8);
    border: 4px dashed red;
  }
  &--invisible {
    @include visually-hidden()
  }

  &_button-close {
    position: absolute;
    top: 10px;
    right: 10px;
  }
}
</style>

<script>

import Button from '@/components/ui/Button'
import Icon from '@/components/ui/Icon'

export default {
  name: 'Modal',
  components: {
    Button,
    Icon
  },
  props: [
    'visible',
    'modal_title',
    'modal_body'
  ],
  watch: {
    visible: function (oldValue, newValue) {
      // Notify any parent components wanting to update this component's state
      this.$emit('changeVisible', {
        oldValue: oldValue,
        newValue: newValue
      })
    }
  },
  data () {
    return {
    }
  },
  methods: {
    handle__click_close: function (button) {
      // Notify any subscribers about the close action, the parent will then manipulate the visible state
      this.$emit('modalClose')
    },
    open: function () {
      this.visible = true
    },
    close: function () {
      this.visible = false
    }
  }
}
</script>
