<template>
  <dl class="c-list-detailTime">
    <div class="c-list-detailTime__item">
      <dt class="c-list-detailTime__title">公開日</dt>
      <dd class="c-list-detailTime__content">
        <BaseTextTime :time="publishedAt" />
      </dd>
    </div>
    <div v-if="publishedAt === updatedAt" class="c-list-detailTime__item">
      <dt class="c-list-detailTime__title">更新日</dt>
      <dd class="c-list-detailTime__content">
        <BaseTextTime :time="updatedAt" />
      </dd>
    </div>
  </dl>
</template>

<script setup lang="ts">
  import BaseTextTime from '~/components/atoms/BaseTextTime.vue'

  defineProps<{
    publishedAt: string
    updatedAt: string
  }>()
</script>

<style scoped lang="scss">
  .c-list-detailTime {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 8px 24px;
    align-items: baseline;
    width: fit-content;
    margin-top: 40px;
    color: var(--color-foreground-gray);

    @include mixin.media(pc) {
      margin-top: 48px;
    }

    &__item {
      display: grid;
      grid-template-columns: auto 1fr;
      gap: 8px;
      align-items: baseline;
    }

    &__title {
      font-size: 1.4rem;
      font-weight: var(--font-weight-bold);
    }
  }
</style>
