<template>
  <div  class="notification"
        :class="this.type ? 'notification--' + this.type : ''">

      <slot name="notification_body">Notification body</slot>

      <div class="notification_controls">
        <slot name="notification_controls">Notification controls</slot>
      </div>
  </div>
</template>

<style scoped lang="scss">

@import "../../style/variables.scss";
@import "../../style/reset.scss";

.notification {
  padding: $pad__box--desktop;
  text-align: left;
  background: $color__base--blue;

  /**
   * States & modifiers
   **/
  &--info {
  }

  /**
   * Action controls provided to this component
   **/
  &_controls {
    margin-top: -10px;
    text-align: center;
  }
    &_control-seperator {
      padding: 0 5px;
    }
}
</style>

<script>

export default {
  name: 'Notification',
  data () {
    return {
    }
  },
  props: [
    'type'
  ]
}
</script>
