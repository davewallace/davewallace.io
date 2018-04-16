<template>
  <div class="modal-root"
       :class="visible ? 'modal-root--visible' : 'modal-root--invisible' ">

    <Button @click="handle__click_close"
            visuallyHiddenText="true">
      <Icon type="close" />
    </Button>

    <slot>
        <p>Content.</p>
      </slot>
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
.modal-root {

  &--visible {
    border: 4px dashed red;
  }
  &--invisible {
    @include visually-hidden()
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
    'visible'
  ],
  watch: {
    visible: function (oldValue, newValue) {
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
      console.log('Modal close button clicked: ')
      console.log(this.visible)

      this.$emit('modalClose')
    },
    open: function () {
      this.visible = true
    },
    close: function () {
      this.visible = false
    }
  }
  // mounted: function () {
  //   this.
  // }
}
</script>
