<template>
  <a  href="javascript:;"
      @click="handle__click()"
      :class="this.selected ? this.modifierClassNameBase + '--selected' : this.modifierClassNameBase">

        <slot>Button</slot>
  </a>
</template>

<script>

export default {
  name: 'Button',
  data () {
    return {
      selected: false
    }
  },
  props: {
    selectable: false,
    modifierClassNameBase: ''
  },
  methods: {
    handle__click: function () {
      if (this.selectable) {
        this.selected = !this.selected
      }
      console.log('button component clicked, selected: ' + this.selected)
    }
  },
  created: function () {
  },
  mounted: function () {
  }
}
</script>
