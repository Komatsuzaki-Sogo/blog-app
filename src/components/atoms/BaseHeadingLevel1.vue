<template>
  <div :class="contentClass">
    <h1 class="c-heading-level1__title">
      <span class="c-heading-level1__mainTitle">
        <slot />
      </span>
      <template v-if="props.subTitle">
        <span class="c-heading-level1__subTitle">{{ subTitle }}</span>
      </template>
    </h1>
    <div
      v-if="props.type && props.badges && props.badges.length > 0"
      class="c-heading-level1__badgeList"
    >
      <BaseBadge v-for="badge in props.badges" :key="badge.id">{{ badge.name }}</BaseBadge>
    </div>
  </div>
</template>

<script setup lang="ts">
  import BaseBadge from '~/components/atoms/BaseBadge.vue'
  type BadgeType = {
    id: string
    name: string
  }
  type Props = {
    subTitle?: string
    type?: 'cms'
    badges?: BadgeType[]
  }

  const props = defineProps<Props>()

  const contentClass = computed(() => {
    return ['c-heading-level1', props.type === 'cms' && 'c-heading-level1--cms']
  })
</script>

<style scoped lang="scss">
  .c-heading-level1 {
    $this: &;

    &__title {
      display: flex;
      flex-direction: column-reverse;
      text-align: center;
    }

    &__mainTitle {
      font-size: clamp(3.6rem, calc(0.044rem + 4.63vw), 5.6rem); /* min: 36px, max: 56px */
    }

    &__subTitle {
      font-size: clamp(1.6rem, calc(0.889rem + 0.926vw), 2rem); /* min: 16px, max: 20px */
      color: var(--color-primary);
      background: var(--color-gradient);
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    &--cms {
      display: flex;
      flex-direction: column-reverse;

      #{$this}__title {
        text-align: left;
      }

      #{$this}__badgeList {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }
    }

    & + *:not(.c-list-detailTime) {
      margin-top: 32px !important;

      @include mixin.media(pc) {
        margin-top: 40px !important;
      }
    }
  }
</style>
