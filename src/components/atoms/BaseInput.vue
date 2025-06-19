<template>
  <input
    v-bind="attrs"
    :type="type"
    :placeholder="placeholder"
    :required="required"
    :class="['c-input', { 'c-input--error': errorState }]"
  />
</template>

<script setup lang="ts">
  defineProps<{
    type?: string
    placeholder?: string
    required?: boolean
    errorState?: boolean
  }>()

  const attrs = useAttrs()
</script>

<style scoped lang="scss">
  .c-input {
    width: 100%;
    padding: 8px;
    font-size: 1.6rem;
    border: 2px solid var(--color-outline-gray);
    border-radius: 8px;
    box-shadow: 0 0 0 1000px var(--color-background-light) inset;

    &--error {
      border-color: var(--color-role-danger-dark);
      box-shadow: 0 0 0 1000px #fae4e4 inset;
    }
  }
</style>
