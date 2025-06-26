<template>
  <BaseContent padding-y="none" width="full">
    <div class="mv">MV MV</div>
  </BaseContent>
</template>

<script setup lang="ts">
  import BaseContent from '~/components/atoms/BaseContent.vue'
</script>

<style scoped lang="scss">
  .mv {
    height: min(480px, calc(100vh - var(--header-height)));
    background-color: red;
  }

  :deep(.c-button) {
    margin-top: 56px;
  }
</style>
