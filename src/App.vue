<template>
  <div id="app">
     <a-layout>
      <a-layout-header>
        <Menu />
      </a-layout-header>
      <a-layout-content>
        <router-view/>
      </a-layout-content>
      <a-layout-footer>
        &copy; 2020 by <a href="http://marvel.com/" target='_blank'>Marvel</a>
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<script>
// @ is an alias to /src
import Menu from '@/core/components/menu/Menu.vue'

export default {
  name: 'App',
  components: {
    Menu
  }
}
</script>

<style lang="scss">
@import './App.scss';
</style>
