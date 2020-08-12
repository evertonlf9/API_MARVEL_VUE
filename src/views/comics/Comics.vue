<template>
  <div id="comics-component">
      <List type="comics" />
  </div>
</template>

<script lang="ts">
import List from '@/core/components/list/List.vue'

export default {
  name: 'Comics',
  components: {
    List
  }
}
</script>

<style lang="scss">
#comics-component {

}
</style>
