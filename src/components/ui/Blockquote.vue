<template>
  <blockquote>

      <slot name="blockquote_body">Blockquote text</slot>

      <cite class="blockquote_citation">
        <slot name="blockquote_citation">Blockquote citation</slot>
      </cite>
  </blockquote>
</template>

<style scoped lang="scss">
blockquote {
  margin: 0;
  padding: 10px 10px 1px 20px; // margin-collapsing when bottom-pad set to 0px
  border-left: 3px solid $color__base--green;
  color: $color__base--green;
  font-size: $font__size--large;
}
blockquote + blockquote { // limited by markdown output, I'm using a 2nd blockquote as the quotee
  padding-top: 0px;
  text-align: right;
  font-style: italic;
  color: $color__base--reverse;
}
</style>

<script>
export default {
  name: 'Blockquote',
  data () {
    return {
    }
  },
  props: [
    'type'
  ]
}
</script>
