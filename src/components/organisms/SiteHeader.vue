<script setup lang="ts">
import BaseContent from '~/components/atoms/BaseContent.vue';
import BaseLogo from '~/components/atoms/BaseLogo.vue';
import HeaderNavigation from '~/components/molecules/HeaderNavigation.vue';
</script>

<template>
  <header class="c-header">
    <BaseContent padding-y="none">
      <div class="c-header__inner">
        <BaseLogo />
        <HeaderNavigation />
      </div>
    </BaseContent>
  </header><!-- /.c-content -->
</template>

<style scoped lang="scss">
.c-header {
  position: inherit;
  z-index: 100;

  &__inner {
    display: flex;
    gap: 40px;
    align-items: center;
    justify-content: space-between;

    @include mixin.media(pc, $minor-breakpoint) {
      padding: 16px 0;
    }
  }
}
</style>