<template>
  <div class="modal"
       :class="visible ? 'modal--visible' : 'modal--invisible' ">

    <Button class="modal_button-close button--warning"
            :visually-hidden-text="true"
            @click="handle__click_close">
      <template slot="button_label">Close</template>
      <template slot="button_icon">
        <Icon type="close" />
      </template>
    </Button>

    <div class="modal_content">
      <h3 class="modal_title">
        <slot name="modalTitle">
          Slot header
        </slot>
      </h3>

      <h4 class="modal_blurb">
        <slot name="modalBlurb">
          Slot blurb
        </slot>
      </h4>

      <div class="modal_body">
        <slot name="modalBody">
          <p>Slot content.</p>
        </slot>
      </div>

      <div class="modal_navigation">
        <Button class="modal_button-backward button--tertiary"
                :visually-hidden-text="true"
                @click="handle__click_navigate('backward')">

          <template slot="button_label">Backward</template>
          <template slot="button_icon">
            <Icon type="backward" />
          </template>
        </Button>
        <Button class="modal_button-forward button--primary"
                :visually-hidden-text="true"
                @click="handle__click_navigate('forward')">

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

<script>
import Button from '@/components/ui/Button'
import Icon from '@/components/ui/Icon'

export default {
  name: 'Modal',
  components: {
    Button,
    Icon
  },
  props: {
    'visible': {
        default: false,
        type: Boolean
    },
    'modalBody': {
        default: '',
        type: String
    },
    'modalTitle': {
        default: '',
        type: String
    }
},
  watch: {
    visible: function (newValue, oldValue) {
      // Notify any parent components wanting to update this component's state
      this.$emit('change-visible', {
        oldValue: oldValue,
        newValue: newValue
      })

      // Toggle body element state to provide viewport scroll helpers.
      // Exception to rules: manipulate the DOM's body element since there are
      // currently caveats around mounting the body element with a Vue instance.
      let method = (newValue === true) ? 'add' : 'remove'
      window.document.getElementsByTagName('body')[0].classList[method]('modal_body-scroll--prevent')
    }
  },
  methods: {

    /**
     * Event handlers
     **/

    // Notify any subscribers about button actions, the parent will then
    // manipulate the state
    handle__click_close: function (button) {
      this.$emit('modal-close')
    },
    handle__click_navigate: function (direction) {
      this.$emit('modal-navigate', direction)
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

<style lang="scss">
/**
 * States and modifiers
 **/
// Applied to body element in response to modal component's visible state
.modal_body-scroll--prevent {
  height: 100vh;
  max-height: 100vh;
  overflow: hidden;
}

/**
 * Component
 **/
.modal {

  &_content {
    display: flex;
    flex-direction: column;
    height: 100%;
    max-height: 100vh;
    padding: $pad__modal;

    @media (min-width: 600px) {
      margin: 0 auto;
      width: 90vw;
      max-width: 700px;
    }
    @media (min-width: 1200px) {
      margin: 0 auto;
      width: 70vw;
      max-width: $page__max-width;
    }
  }

  &_title,
  &_blurb,
  &_body,
  &_navigation {
    border: 1px dotted pink;
  }

  // title content
  &_title {
  }

  // blurb content
  &_blurb {
    color: pink;
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
    flex: 1;
    overflow-y: auto;
    border: 2px dashed red;
  }

  // modal close control
  &_button-close {
    position: absolute;
    top: 10px;
    right: 10px;
  }

  /**
   * States and modifiers
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
    @include visually-hidden();
  }

  /**
   * Nested Tags
   **/
  &__tags {
    @include reset-list();
    line-height: 1.1em;
  }
    &__tags-item {
      @include reset-list();
      display: inline-block;
      vertical-align: top;
      line-height: 1.3em;
      margin: 0 2px 2px 0;
      padding: 1px 4px;
      font-size: $font__size--small;
      font-style: italic;
      color: $color__base;
      background: $color__base--yellow;
    }
}
</style>
