<template>
  <div id="creators-component">
      <List type="creators" />
  </div>
</template>

<script lang="ts">
import List from '@/core/components/list/List.vue'

export default {
  name: 'Creators',
  components: {
    List
  }
}
</script>

<style lang="scss">
#creators-component {

}
</style>
