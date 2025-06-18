<template>
  <div v-if="breadcrumbList && breadcrumbList?.length" class="l-breadcrumb">
    <BaseContent padding-y="none">
      <ul class="l-breadcrumb__list">
        <li v-for="(item, index) in breadcrumbList" :key="item.path" class="l-breadcrumb__item">
          <NuxtLink
            :href="item.path"
            class="l-breadcrumb__link"
            :aria-current="index === breadcrumbList.length - 1 ? 'page' : undefined"
          >
            <em v-if="index === breadcrumbList.length - 1">{{ item.name }}</em>
            <template v-else>{{ item.name }}</template>
          </NuxtLink>
        </li>
      </ul>
    </BaseContent>
  </div>
</template>

<script setup lang="ts">
  import BaseContent from '~/components/atoms/BaseContent.vue'
  const breadcrumbList = useBreadcrumbState()
</script>

<style scoped lang="scss">
  .l-breadcrumb {
    font-size: 1.2rem;
    background-color: var(--color-background-gray);

    @include mixin.media(pc) {
      font-size: 1.3rem;
    }

    &__list {
      display: flex;
      gap: 40px;
      overflow-x: auto;
      list-style: none;
    }

    &__item {
      flex: 0 0 auto;
      padding: 24px 0;

      & + & {
        position: relative;

        &::before {
          position: absolute;
          top: 50%;
          left: -22px;
          display: block;
          width: 7px;
          height: 7px;
          content: '';
          border-top: 1px solid var(--color-foreground-gray);
          border-right: 1px solid var(--color-foreground-gray);
          transform: translateY(-50%) rotate(45deg);
        }
      }
    }

    &__link {
      color: var(--color-foreground-dark);
      transition: color var(--transition);

      @include mixin.media(hover) {
        &:hover {
          color: var(--color-primary);
        }
      }

      &[aria-current='page'] {
        color: var(--color-foreground-dark);
        pointer-events: none;
      }
    }
  }
</style>
