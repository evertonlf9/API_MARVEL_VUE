<template>
  <div id="events-component">
      <List type="events" />
  </div>
</template>

<script lang="ts">
import List from '@/core/components/list/List.vue'

export default {
  name: 'Events',
  components: {
    List
  }
}
</script>

<style lang="scss">
#events-component {

}
</style>
