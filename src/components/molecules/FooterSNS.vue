<template>
  <ul v-if="iconLists.length > 0" class="c-list-sns">
    <li v-for="iconList in iconLists" :key="iconList.src" class="c-list-sns__item">
      <NuxtLink :to="iconList.href" class="c-list-sns__link" external target="_blank">
        <span class="c-list-sns__text">{{ iconList.label }}</span>
        <Icon :name="iconList.src" mode="svg" class="c-list-sns__icon" />
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
</script>

<style scoped lang="scss">
  .c-list-sns {
    display: flex;
    gap: 24px;
    justify-content: center;
    list-style: none;

    @include mixin.media(pc) {
      gap: 48px;
      justify-content: flex-end;
    }

    &__link {
      position: relative;
      color: var(--color-foreground-light);
      transition: opacity var(--transition);

      @include mixin.media(hover) {
        &:hover {
          opacity: var(--opacity);
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
      --local-width: 32px;

      width: var(--local-width);
      height: var(--local-width);
    }
  }
</style>
