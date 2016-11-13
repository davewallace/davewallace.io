<template>
  <div :class="componentclasses">
    <input :required="required" :class="inputclasses" v-model="model" :disabled="disable">
    <label v-show="label">{{label}}</label>
    <a @click="generateValue()" class="icon icon-generate"></a>
  </div>
</template>
<script>
export default {
  name: 'input-text-generated',

  methods: {

    /**
    * Given a generator function, this component's inputValue is set
    * to the return value of the generator.
    *
    * @param Function
    **/
    generateValue: function (generator) {
      this.set('input', 'test')
    }
  },

  props: {
    'value': String,
    'required': Boolean,
    'disable': Boolean,
    'label': String,
    'inputclasses': String,
    'componentclasses': String
  },

  computed: {
    model: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    }
  }
}
</script>

<style lang="scss">
.icon-generate {
  float:right;
  width:16px;
  height:16px;
  border:1px dashed red;
}
</style>
