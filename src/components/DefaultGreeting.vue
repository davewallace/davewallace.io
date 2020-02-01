<template>
  <header>
    <h1>Hello<span>, and welcome</span></h1>
    <p>My name is Dave Wallace, and you've opened my portfolio - thanks. I'm a web developer and UX consultant.</p>
    <p>A selection of my previous work is available below, you can filter it using the labels...</p>
  </header>
</template>

<script>
export default {
  name: 'DefaultGreeting'
}
</script>

<style scoped lang="scss">

// @import "../style/variables.scss";
// @import "../style/reset.scss";
// @import "../style/utility.scss";

header {
  margin-top: 40px;
  margin-bottom: 40px;
  @media (max-width: 320px) {
    margin-top: 20px;
  }
}
h1 {
  font-size: 4.8em;
  line-height: 4.8rem;
  font-family: $font_title--main;

  span {
    font-size: 1.8rem;
    line-height: 1.8em;
  }
}
p {
  font-size: 1.1rem;
  line-height: 1.2rem;
  font-weight: normal;
}
</style>
