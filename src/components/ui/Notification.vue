<template>
  <div  class="notification"
        :class="this.type ? 'notification--' + this.type : ''">
    <slot>Notification</slot>
  </div>
</template>

<style scoped lang="scss">

@import "../../style/variables.scss";
@import "../../style/reset.scss";

.notification {
  padding: $pad__box--desktop;
  background: $color__base--blue;

  &--info {
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
