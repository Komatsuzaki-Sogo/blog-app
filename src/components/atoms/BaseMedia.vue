<template>
  <div :class="rootClass">
    <component :is="props.href ? NuxtLink : 'div'" class="c-media__wrap" :href="props.href">
      <div v-if="props.caption" class="c-media__caption">
        {{ props.caption }}
      </div>
      <img
        class="c-media__item"
        :src="props.src"
        :width="Number(props.width)"
        :height="Number(props.height)"
        :alt="props.alt ?? ''"
        :loading="props.loading"
      />
    </component>
  </div>
</template>

<script setup lang="ts">
  import { NuxtLink } from '#components'

  type Props = {
    src: string
    width: string | number
    height: string | number
    caption?: string
    alt?: string
    loading?: 'lazy' | 'eager'
    type?: 'circle'
    href?: string
  }

  const props = defineProps<Props>()

  const rootClass = computed(() => {
    return ['c-media', props.type === 'circle' && 'c-media--circle']
  })
</script>

<style scoped lang="scss">
  .c-media {
    $this: &;

    margin-top: 32px;

    &__wrap {
      position: relative;
      display: table;
      margin: auto;
      vertical-align: top;
      text-decoration: none;

      @include mixin.media(hover) {
        &:any-link {
          &:hover {
            text-decoration: underline;

            #{$this}__item {
              opacity: var(--opacity);
            }
          }
        }
      }
    }

    &__caption {
      display: table-caption;
      margin: 8px auto 0;
      font-size: 1.3rem;
      line-height: 1.6;
      caption-side: bottom;
    }

    &__item {
      display: block;
      transition: opacity var(--transition);
    }

    &--circle {
      #{$this}__item {
        border-radius: var(--border-radius-circle);
      }
    }
  }
</style>
