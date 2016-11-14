<template>

  <!--
    Replace following "div" with
    "<router-view class="layout-view">" component
    if using subRoutes
  -->

   <div>
    <h1>Index</h1>
    <div v-for="project in projectData" class="project"></div>
   </div>

</template>

<script>
import Quasar from 'quasar'

// TODO: mock browser, language & tool listings
let projectData = [
  /* eslint-disable */
  // JSON format for future-port to API response
  {
    "meta":{
      "name": "Saab",
      "tags": ["advert", "microsite", "html", "showcase"]
    },
    "media": {

    }
  },
  {
    "meta":{
      "name": "Computer Associates",
      "tags": ["advert", "banner", "flash", "showcase"]
    },
    "media": {

    }
  },
  {
    "meta":{
      "name": "ASADA Anti-Doping",
      "tags": ["learning", "html", "responsive", "showcase"]
    },
    "media": {

    }
  },
  {
    "meta":{
      "name": "Education New Zealand",
      "tags": ["learning", "system", "responsive", "showcase"]
    },
    "media": {

    }
  },
  {
    "meta":{
      "name": "Kiwibank Blueprint",
      "tags": ["communication", "html", "parallax", "responsive", "showcase"]
    },
    "media": {

    }
  },
  {
    "meta":{
      "name": "Grunt workflow",
      "tags": ["tooling", "javascript", "build", "team", "internal"]
    },
    "media": {

    }
  },
  {
    "meta":{
      "name": "Git workflow",
      "tags": ["tooling", "git", "team", "internal"]
    },
    "media": {

    }
  },
  {
    "meta":{
      "name": "React",
      "tags": ["javascript", "prototype"]
    },
    "media": {

    }
  },
  {
    "meta":{
      "name": "Vue",
      "tags": ["javascript", "prototype"]
    },
    "media": {

    }
  }
  /* eslint-disable */
]

export default {
  name: 'index',
  data () {
    return {
      quasarVersion: Quasar.version,
      projectData: projectData
    }
  },
  computed: {
  },
  methods: {
    foo (event) {
      // this.moveX = (left - halfW) / halfW * -moveForce
    }
  },
  mounted () {
    this.$nextTick(() => {
      // document.addEventListener('mousemove', this.move)
    })
  },
  beforeDestroy () {
    // document.removeEventListener('mousemove', this.move)
  }
}
</script>

<style lang="scss" scoped>

// TODO: not DRY, find alternative, likely JS to add/remove classes from DOM

.project {
  // 3 columns

  box-sizing: border-box;
  display: inline-block;
  margin: 0 10px 10px 0;

  // sizing
  width: calc(33.3% - 7px);
  height: 300px;

  &:nth-child(3n+1) {
    width: calc(33.3% - 5px);
    margin-right:0px;
  }

  background:pink;
}

@media (max-width:1024px) {
  // 2 columns

  .project {
    background:lime;

    // sizing
    &:nth-child(1n) {
      width: calc(50% - 5px);
    }
    height: 350px;
    margin: 0 10px 10px 0;

    &:nth-child(odd) {
      margin-right:0px;
    }
    &:nth-child(even) {
      margin-right:10px;
    }

  }
}
@media (max-width:640px) {
  // single column

  .project {
    background:cyan;

    // sizing
    &:nth-child(1n) {
      width: 100%;
    }
    margin: 0 0 10px 0;
  }
}
</style>
