<script setup lang="ts">
import BaseContent from '~/components/atoms/BaseContent.vue';
import BaseLogo from '~/components/atoms/BaseLogo.vue';
import BaseOverlay from '~/components/atoms/BaseOverlay.vue';
import BaseHamburgerMenu from '~/components/atoms/BaseHamburgerMenu.vue';
import HeaderNavigation from '~/components/molecules/HeaderNavigation.vue';

/**
 * メニュの開閉状態
 */
const isMenuOpen = computed(() => {
  return easyStore.menuActive
})

const activeBodyClassName = 'is-fixed'

/**
 * メニュの開閉toggle
 */
const toggleMenu = () => {
  easyStore.menuActive = !easyStore.menuActive
}

/**
 * メニュの開閉toggle
 */
const closeMenu = () => {
  easyStore.menuActive = false
}

/**
 * ページ遷移時にメニューを閉じる・クラスが残らないようクリーンアップ
 */
const router = useRouter()
watchEffect(() => {
  router.afterEach(() => {
    easyStore.menuActive = false
    document.body.classList.remove(activeBodyClassName)
  })
})

// body に is-fixed を付与・削除
watch(isMenuOpen, (newVal) => {
  if (newVal) {
    document.body.classList.add(activeBodyClassName)
  } else {
    document.body.classList.remove(activeBodyClassName)
  }
})
</script>

<template>
  <header class="c-header">
    <BaseContent padding-y="none">
      <div class="c-header__inner">
        <BaseLogo />
        <BaseHamburgerMenu :class="{ 'is-active': isMenuOpen }" @click="toggleMenu" />
        <HeaderNavigation :class="{ 'is-active': isMenuOpen }" />
        <BaseOverlay :class="{ 'is-active': isMenuOpen }" @click="closeMenu" />
      </div>
    </BaseContent>
  </header><!-- /.c-content -->
</template>

<style scoped lang="scss">
.c-header {
  position: inherit;
  z-index: 100;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: var(--header-height);

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