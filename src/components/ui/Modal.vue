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

    <div class="modal_navigation">
      <Button class="modal_button-next button--primary"
              @click="handle__click_navigate('next')"
              visuallyHiddenText="true">
        <Icon type="next" />
      </Button>
      <Button class="modal_button-previous button--tertiary"
              @click="handle__click_navigate('previous')"
              visuallyHiddenText="true">
        <Icon type="previous" />
      </Button>

      <Notification v-if="this.notification_visible">
        <p>You've reached the end of this selection, you can continue or would you like to...</p>
        <Button class="button--primary">
          X
        </Button>
        <Button class="button--secondary">
          Y
        </Button>
      </Notification>

    </div>

  </div>
</template>

<style lang="scss">

@import "../../style/reset.scss";
@import "../../style/variables.scss";
@import "../../style/utility.scss";

.modal {
  display: flex;
  flex-direction: column;
  padding: 40px 60px;

  &_title,
  &_content,
  &_navigation {
    flex: 1 1 auto;
    border: 2px dashed purple;
  }

  // navigation controls for collections of modal content
  &_navigation {
  }
    &_button-next,
    &_button-previous {
      position: absolute;
    }
    &_button-previous {
      top: 50%;
      left: 10px;
    }
    &_button-next {
      top: 50%;
      right: 10px;
    }

  // modal content
  &_content {
    flex-basis: 80%;
  }

  // modal close control
  &_button-close {
    position: absolute;
    top: 10px;
    right: 10px;
  }

  // states
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
}
</style>

<script>

import Button from '@/components/ui/Button'
import Icon from '@/components/ui/Icon'
import Notification from '@/components/ui/Notification'

export default {
  name: 'Modal',
  components: {
    Button,
    Icon,
    Notification
  },
  props: [
    'visible',
    'modal_content',
    'modal_title',
    'notification_visible'
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

    // Notify any subscribers about button actions, the parent will then manipulate the state
    handle__click_close: function (button) {
      this.$emit('modalClose')
    },
    handle__click_navigate: function (direction) {
      this.$emit('modalNavigate', direction)
    },

    // Simple API, should we need it
    open: function () {
      this.visible = true
    },
    close: function () {
      this.visible = false
    }
  }
}
</script>
