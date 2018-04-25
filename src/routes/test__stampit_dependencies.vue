<template>
  <div>
    <h1 id="test">{{ msg }}</h1>
  </div>
</template>

<script>

import stampit from 'stampit'
//import Hideable from '@/behaviours/hideable'
//import Editable from '@/behaviours/editable'

//let he = stampit({}, Hideable, Editable)
//console.log(he)

const Character = stampit({
  props: {
    name: null,
    health: 100
  },
  init ({ name = this.name }) {
    this.name = name
  }
})

const Fighter = stampit(Character, { // inheriting
  props: {
    stamina: 100
  },
  init ({ stamina = this.stamina }) {
    this.stamina = stamina
  },
  methods: {
    fight () {
      // console.log(`${this.name} takes a mighty swing!`)
      this.stamina--
    }
  }
})

const Mage = stampit(Character, { // inheriting
  props: {
    mana: 100
  },
  init ({ mana = this.mana }) {
    this.mana = mana
  },
  methods: {
    cast () {
      // console.log(`${this.name} casts a fireball!`)
      this.mana--
    }
  }
})

const Paladin = stampit(Mage, Fighter) // as simple as that!

const fighter = Fighter({ name: 'Thumper' })
fighter.fight()
const mage = Mage({ name: 'Zapper' })
mage.cast()
const paladin = Paladin({ name: 'Roland', stamina: 50, mana: 50 })
paladin.fight()
paladin.cast()

//console.log(Paladin.compose.properties) // { name: null, health: 100, stamina: 100, mana: 100 }
//console.log(Paladin.compose.methods) // { fight: [Function: fight], cast: [Function: cast] }

console.warn('test__stampit_dependencies.vue loaded. Why? Because its registered in `src/router/index.js`?')

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Check the console for successful usage of stampit API.'
    }
  },

  /**
   * Lifecycle methods
   **/
  created: function () {
    console.log('created')
  },
  mounted: function () {
    console.log('mounted')
  }
}
</script>
