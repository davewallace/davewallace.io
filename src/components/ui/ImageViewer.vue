<template>
  <div class="image-viewer">

    <Button v-if="this.expanded"
            class="image-viewer_button-close button--warning"
            @click="handle__click_close"
            visuallyHiddenText="true">
      <template slot="button_label">Close</template>
      <template slot="button_icon">
        <Icon type="close" />
      </template>
    </Button>

    <div class="image-viewer_content">
      <a  href=""
          title="Select this image to expand it"
          @click.prevent
          @click="handle__click_expand"
          class="image-viewer_button-expand"
          :class="this.expanded ? 'image-viewer--expanded' : '' "
          :style="'background-image: ' + require('../../assets/img/' + this.data[0].url) + ';'">

        <label>{{ this.data[0].alt }}</label>
      </a>
    </div>

  </div>
</template>

<style lang="scss">

@import "../../style/variables.scss";
@import "../../style/reset.scss";
@import "../../style/utility.scss";

/**
 * Component
 **/
.image-viewer {
  height: 100%;
  max-height: 50%;
  border: 4px dashed orange;

  &_content {
  }

  &_button-close {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: $z-index--image-viewer + 1;
  }
  &_button-expand {
  }

  /**
   * States and variants
   **/
  &--expanded {
    position: fixed;
    z-index: $z-index--image-viewer;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;

    display: flex;
  }
}
</style>

<script>

import Button from '@/components/ui/Button'
import Icon from '@/components/ui/Icon'

export default {
  name: 'ImageViewer',
  components: {
    Button,
    Icon
  },
  props: [
    'visible',
    'data'
  ],
  data () {
    return {
      expanded: false
    }
  },
  methods: {

    /**
     * Event handlers
     **/

    // Notify any subscribers about button actions, the parent will then
    // manipulate the state
    handle__click_close: function (button) {
      this.expanded = false
      this.$emit('imageViewerClose')
    },

    //
    handle__click_expand: function (button) {
      this.expanded = true
      this.$emit('imageViewerExpand')
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
