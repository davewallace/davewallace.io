<template>
  <div>
    <h1>Create a character</h1>

    <h2>The basics</h2>

    <input-text-generated
      label="My Label"
      componentclasses="floating-label"
      inputclasses="full-width"
      @click="alert('hello world!')"
    ></input-text-generated>

    <div>
      <p>What gender will you be?</p>
      <label>
        <quasar-radio v-model="gender" val="female"></quasar-radio>
        Female
      </label>
      <label>
        <quasar-radio v-model="gender" val="neutral"></quasar-radio>
        Neutri-grain
      </label>
      <label>
        <quasar-radio v-model="gender" val="male"></quasar-radio>
        Male
      </label>
    </div>

    <h2>Choose your path</h2>

    <p>Defining yourself can happen in one of two ways, now you must take your pick. You can either fully define your skills and talents as you play, based on the decisions you make. Or instead, you can make some basic choices now. Making choices now will mean fewer defining options throughout your journey, instead assuming certain decisions based on choices made now.</p>

    <label>
      <quasar-toggle v-model="journeyMode"></quasar-toggle>
      Do you want to make all of your own decisions?
    </label>

    <div v-show="!journeyMode">

      <label>
        <h3>Choose your Alignment</h3>
        <quasar-range
          v-model="alignment"
          :min="alignmentMinimumValue"
          :max="alignmentMaximumValue"
          :step="alignmentStep"
          label
          snap
          markers
        ></quasar-range>
      </label>

    </div>

  </div>
</template>

<script>
import InputTextGenerated from '../form/InputTextGenerated'

export default {

  name: 'create-character',

  components: {
    'input-text-generated': InputTextGenerated
  },

  methods: {
    generateName: function (gender) {
      const names = {
        male: ['Weaven', 'Bracknel', 'Obulix', 'Terufon', 'Naz'],
        female: ['Esme', 'Helene', 'Trinn', 'Corinne'],
        neutral: ['Morgan', 'Juno', 'Trice', 'Ley', 'Farr']
      }
      return names[gender][Math.floor(Math.random() * names[gender].length)]
    }
  },

  data () {
    return {
      characterName: '',
      gender: 'female',
      ready: true,
      journeyMode: true, // whether to disallow character customisation or not
      alignment: 0, // 0=neutral, -100=evil, 100=good
      alignmentMinimumValue: -100,
      alignmentMaximumValue: 100,
      alignmentStep: 10
    }
  }
}
</script>

<style>
</style>
