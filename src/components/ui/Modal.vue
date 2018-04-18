<template>
  <div class="modal"
       :class="visible ? 'modal--visible' : 'modal--invisible' ">

    <Button class="modal_button-close"
            @click="handle__click_close"
            visuallyHiddenText="true">
      <Icon type="close" />
    </Button>

    <h3 class="modal_title">
      <slot name="modal_title">
        Slot header
      </slot>
    </h3>

    <div class="modal_content">
      <slot name="modal_content">
        <p>Slot content.</p>
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

  padding: 40px;

  &--visible {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: $z-index--modal;

    background: rgba(0, 0, 0, 0.92);
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
    'modal_content',
    'modal_title'
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
