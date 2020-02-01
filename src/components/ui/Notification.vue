<template>
  <div class="notification"
       :class="type ? 'notification--' + type : ''">

    <slot name="notification_body">Notification body</slot>

    <div class="notification_controls">
      <slot name="notification_controls">Notification controls</slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Notification',
  props: {
    type: {
      type: String,
      default: 'info'
    }
  }
}
</script>

<style scoped lang="scss">
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
    margin-top: -5px;
    text-align: center;
  }
    &_control-seperator {
      padding: 0 5px;
    }
}
</style>
