<template>
  <select
    v-bind="attrs"
    :required="required"
    :class="['c-select', { 'c-select--error': errorState }]"
  >
    <slot />
  </select>
</template>

<script setup lang="ts">
  import { useAttrs } from 'vue'

  defineProps<{
    type?: string
    placeholder?: string
    required?: boolean
    errorState?: boolean
  }>()

  const attrs = useAttrs()
</script>

<style scoped lang="scss">
  .c-select {
    position: relative;
    width: 100%;
    padding: 8px 36px 8px 8px;
    font-size: 1.6rem;
    appearance: none;
    background-color: var(--color-background-light);
    background-image: url('/shared/img/icon-arrow-black.svg');
    background-repeat: no-repeat;
    background-position: right 12px center;
    background-size: 16px;
    border: 2px solid var(--color-outline-gray);
    border-radius: 8px;

    &--error {
      background-color: #fae4e4;
      background-image: url('/shared/img/icon-arrow-red.svg');
      border-color: var(--color-role-danger-dark);
    }
  }
</style>
