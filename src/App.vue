<template>
  <div id="app">
    <div v-if="loading" class="backgroud-opacity"></div>
    <pulse-loader :loading="loading" :color="color" :size="size"></pulse-loader>
    <router-view></router-view>
  </div>
</template>

<script>

import PulseLoader from '../node_modules/vue-spinner/src/PulseLoader.vue'
export default {
  name: 'app',
  data() {
      return {
        loading: false,
        color: '#cc181e',
        color1: '#5bc0de',
        size: '45px',
        margin: '2px',
        radius: '2px'
      }
  },
  components: { PulseLoader }
}

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
