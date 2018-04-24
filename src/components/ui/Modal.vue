<template>
  <div class="modal"
       :class="visible ? 'modal--visible' : 'modal--invisible' ">

    <Button class="modal_button-close"
            @click="handle__click_close"
            visuallyHiddenText="true">
      <template slot="button_label">Close</template>
      <template slot="button_icon">
        <Icon type="close" />
      </template>
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
      <Button class="modal_button-forward button--primary"
              @click="handle__click_navigate('forward')"
              visuallyHiddenText="true">

        <template slot="button_label">Forward</template>
        <template slot="button_icon">
          <Icon type="forward" />
        </template>
      </Button>
      <Button class="modal_button-backward button--tertiary"
              @click="handle__click_navigate('backward')"
              visuallyHiddenText="true">

        <template slot="button_label">Backward</template>
        <template slot="button_icon">
          <Icon type="backward" />
        </template>
      </Button>

      <slot name="modal_notification" />

    </div>

  </div>
</template>

<style lang="scss">

@import "../../style/variables.scss";
@import "../../style/reset.scss";
@import "../../style/utility.scss";

// applied to body element in response to modal component's visible state
.modal_body-scroll-prevent {
  height: 100vh;
  max-height: 100vh;
  overflow: hidden;
}

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

  // title content
  &_title {
    flex-basis: 15%;
    line-height: $font__line-height--h3;
  }

  // navigation controls for collections of modal content
  &_navigation {
  }
    &_button-forward,
    &_button-backward {
      position: absolute;
    }
    &_button-backward {
      top: 50%;
      left: 10px;
    }
    &_button-forward {
      top: 50%;
      right: 10px;
    }

  // main content
  &_content {
    flex-basis: 70%;
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
    visible: function (newValue, oldValue) {
      // Notify any parent components wanting to update this component's state
      this.$emit('changeVisible', {
        oldValue: oldValue,
        newValue: newValue
      })

      // Toggle body element state to provide viewport scroll helpers.
      // Exception to rules: manipulate the DOM's body element since there are
      // currently caveats around mounting the body element with a Vue instance.
      let method = (newValue === true) ? 'add' : 'remove'
      window.document.getElementsByTagName('body')[0].classList[method]('modal_body-scroll-prevent')
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
