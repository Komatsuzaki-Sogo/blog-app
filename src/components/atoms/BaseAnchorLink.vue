<template>
  <div v-if="anchors.length" class="c-list-anchor">
    <b class="c-list-anchor__title">目次</b>
    <ol class="c-list-anchor__list">
      <li v-for="(anchor, index) in anchors" :key="anchor.id" class="c-list-anchor__item">
        <a :href="`#${anchor.id}`" class="c-list-anchor__link">
          <span>{{ index + 1 }}.</span>
          <span>{{ anchor.text }}</span>
        </a>
      </li>
    </ol>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    anchors: {
      id: string
      text: string
    }[]
  }>()
</script>

<style scoped lang="scss">
  .c-list-anchor {
    padding: 16px;
    margin-top: 32px;
    background-color: var(--color-background-gray);
    border-radius: 16px;

    @include mixin.media(pc) {
      padding: 24px;
      margin-top: 40px;
      border-radius: 24px;
    }

    &__title {
      font-size: 1.8rem;
    }

    &__list {
      display: grid;
      grid-template-columns: auto 1fr;
      gap: 8px 4px;
      margin-top: 24px;
      list-style: none;

      @include mixin.media(pc) {
        gap: 16px 8px;
      }
    }

    &__item {
      display: contents;
    }

    &__link {
      position: relative;
      display: contents;
      align-items: center;
      width: 100%;
      height: 100%;
      padding: 0 24px 8px 0;
      font-size: 1.4rem;
      font-weight: var(--font-weight-bold);
      transition: color var(--transition);

      @include mixin.media(hover) {
        &:hover {
          color: var(--color-primary);
        }
      }
    }
  }
</style>
