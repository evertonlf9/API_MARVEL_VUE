<template>
  <div id="characters-component">
      <List type="characters" />
  </div>
</template>

<script lang="ts">
import List from '@/core/components/list/List.vue'

export default {
  name: 'Characters',
  components: {
    List
  }
}
</script>

<style lang="scss">
#characters-component {

}
</style>
