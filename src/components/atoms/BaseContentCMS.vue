<script setup lang="ts">
  defineProps<{
    content: string
  }>()
</script>

<template>
  <div class="c-content-cms" v-html="content" />
</template>
