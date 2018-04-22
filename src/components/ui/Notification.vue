<template>
  <div class="notification">
    <slot>Notification</slot>
  </div>
</template>

<style scoped lang="scss">

@import "../../style/reset.scss";
@import "../../style/variables.scss";

.notification {
  border: 1px dashed red;
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
  ]
}
</script>
