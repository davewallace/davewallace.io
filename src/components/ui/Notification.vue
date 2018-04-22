<template>
  <div  class="notification"
        :class="this.type ? 'notification--' + this.type : ''">
    <slot>Notification</slot>
  </div>
</template>

<style scoped lang="scss">

@import "../../style/reset.scss";
@import "../../style/variables.scss";

.notification {
  border: 2px dashed green;

  &--info {
    border-color: cyan;
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
