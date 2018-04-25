<template>
  <div class="modal"
       :class="visible ? 'modal--visible' : 'modal--invisible' ">

    <Button class="modal_button-close button--warning"
            @click="handle__click_close"
            visuallyHiddenText="true">
      <template slot="button_label">Close</template>
      <template slot="button_icon">
        <Icon type="close" />
      </template>
    </Button>

    <div class="modal_content">
      <h3 class="modal_title">
        <slot name="modal_title">
          Slot header
        </slot>
      </h3>

      <div class="modal_body">
        <slot name="modal_body">
          <p>Slot content.</p>
        </slot>
      </div>

      <div class="modal_navigation">
        <Button class="modal_button-backward button--tertiary"
                @click="handle__click_navigate('backward')"
                visuallyHiddenText="true">

          <template slot="button_label">Backward</template>
          <template slot="button_icon">
            <Icon type="backward" />
          </template>
        </Button>
        <Button class="modal_button-forward button--primary"
                @click="handle__click_navigate('forward')"
                visuallyHiddenText="true">

          <template slot="button_label">Forward</template>
          <template slot="button_icon">
            <Icon type="forward" />
          </template>
        </Button>

        <slot name="modal_notification" />

      </div>
    </div><!-- /.modal_content -->

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

  &_content {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 60px 60px 0px 60px;

    @media (min-width: 600px) {
      margin: 0 auto;
      max-width: 80vw;
    }
    @media (min-width: 1200px) {
      margin: 0 auto;
      max-width: 60vw;
    }
  }

  &_title,
  &_body,
  &_navigation {
    flex: 0 0 auto;

    border: 1px dotted red;
  }

  // title content
  &_title {
    flex-basis: $font__line-height--h3 * 2.5;
  }

  // navigation controls for collections of modal content
  &_navigation {
    flex-basis: 10%;
    margin-top: $pad__grid-gap--desktop;
    text-align: center;
  }
    &_button-forward,
    &_button-backward {
      position: absolute;
      font-size: $font__size--largest;

      @media (max-width: 480px) {
        position: static;
        margin: -$pad__grid-gap--device*2 10px $pad__grid-gap--device 10px;
      }
    }
    &_button-backward {
      top: 45vh;
      left: 10px;

      @media (min-width: 600px) {
        left: 10vw;
      }
    }
    &_button-forward {
      top: 45vh;
      right: 10px;

      @media (min-width: 600px) {
        right: 10vw;
      }
    }

  // main content
  &_body {
    flex-grow: 1;
  }

  // modal close control
  &_button-close {
    position: absolute;
    top: 10px;
    right: 10px;
  }

  /**
   * States
   **/
  &--visible {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: $z-index--modal;
    background-image:
      radial-gradient(
        rgba($color__base, 0.98),
        rgba($color__base, 0.92)
      );
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
    'modal_body',
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

    /**
     * Event handlers
     **/

    // Notify any subscribers about button actions, the parent will then manipulate the state
    handle__click_close: function (button) {
      this.$emit('modalClose')
    },
    handle__click_navigate: function (direction) {
      this.$emit('modalNavigate', direction)
    },

    /**
     * Public methods
     **/

    open: function () {
      this.visible = true
    },
    close: function () {
      this.visible = false
    }
  }
}
</script>
