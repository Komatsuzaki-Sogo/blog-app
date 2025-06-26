<template>
  <ul v-if="iconLists.length > 0" :class="rootClass">
    <li v-for="iconList in iconLists" :key="iconList.src" class="c-sns-icons__item">
      <NuxtLink :to="iconList.href" class="c-sns-icons__link" external target="_blank">
        <span class="c-sns-icons__text">{{ iconList.label }}</span>
        <Icon :name="iconList.src" mode="svg" class="c-sns-icons__icon" />
      </NuxtLink>
    </li>
  </ul>
</template>

<script setup lang="ts">
  const iconLists = [
    {
      src: 'simple-icons:github',
      label: 'GitHub',
      href: 'https://www.google.com/',
    },
    {
      src: 'simple-icons:instagram',
      label: 'Instagram',
      href: 'https://www.google.com/',
    },
    {
      src: 'simple-icons:x',
      label: 'X（旧Twitter）',
      href: 'https://www.google.com/',
    },
  ]

  type Props = {
    type?: 'footer'
  }

  const props = defineProps<Props>()

  const rootClass = computed(() => {
    return ['c-sns-icons', props.type === 'footer' && 'c-sns-icons--footer']
  })
</script>

<style scoped lang="scss">
  .c-sns-icons {
    $this: &;

    display: flex;
    gap: 24px;
    list-style: none;

    @include mixin.media(sp) {
      justify-content: center;
    }

    @include mixin.media(pc) {
      gap: 40px;
    }

    &__link {
      position: relative;
      display: flex;
      justify-content: center;
      color: var(--color-foreground-light);
      transition: transform var(--transition);

      &::before {
        position: absolute;
        top: -12px;
        left: -12px;
        width: 64px;
        height: 64px;
        content: '';
        background-color: var(--color-outline-white);
        border-radius: var(--border-radius-circle);
        opacity: 0;
        transition: opacity var(--transition);

        @include mixin.media(pc) {
          top: -20px;
          left: -20px;
          width: 96px;
          height: 96px;
        }
      }

      @include mixin.media(hover) {
        &:hover {
          transform: scale(0.8);

          &::before {
            opacity: 0.4;
          }
        }
      }
    }

    &__text {
      position: absolute;
      top: 0;
      left: 0;
      width: 1px;
      height: 1px;
      font-size: 0;
    }

    &__icon {
      --local-width: 40px;

      position: relative;
      z-index: 1;
      width: var(--local-width);
      height: var(--local-width);
      color: var(--color-foreground-light);

      @include mixin.media(pc) {
        --local-width: 56px;
      }
    }

    &--footer {
      @include mixin.media(pc) {
        gap: 48px;
        justify-content: flex-end;
      }

      #{$this}__icon {
        --local-width: 32px;

        @include mixin.media(pc) {
          --local-width: 32px;
        }
      }

      #{$this}__link {
        &::before {
          top: -12px;
          left: -12px;
          width: 56px;
          height: 56px;

          @include mixin.media(pc) {
            top: -12px;
            left: -12px;
            width: 56px;
            height: 56px;
          }
        }
      }
    }
  }
</style>
