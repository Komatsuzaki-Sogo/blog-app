<script setup lang="ts">
  import BaseContent from '~/components/atoms/BaseContent.vue'
  import BaseLogo from '~/components/atoms/BaseLogo.vue'
  import BaseOverlay from '~/components/atoms/BaseOverlay.vue'
  import BaseHamburgerMenu from '~/components/atoms/BaseHamburgerMenu.vue'
  import HeaderNavigation from '~/components/molecules/HeaderNavigation.vue'
  import { minorBreakPoint, getMediaQueryList } from '@/composables/useMediaQuery'

  const activeBodyClassName = 'is-fixed'
  const menuId = 'MenuControl-1'

  /**
   * メニュの開閉状態
   */
  const isMenuOpen = computed(() => {
    return easyStore.menuActive
  })

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
   * ページ遷移時にメニューを閉じる
   * クラスが残らないようクリーンアップ
   *
   */
  onMounted(() => {
    const handleResize = () => {
      easyStore.menuActive = false
    }

    // 初回 & イベントリスナー登録
    handleResize()
    getMediaQueryList(minorBreakPoint).addEventListener('change', handleResize)

    onUnmounted(() => {
      getMediaQueryList(minorBreakPoint).removeEventListener('change', handleResize)
    })
  })

  /**
   * body に is-fixed を付与・削除
   */
  watch(isMenuOpen, (newVal) => {
    if (newVal) {
      document.body.classList.add(activeBodyClassName)
    } else {
      document.body.classList.remove(activeBodyClassName)
    }
  })

  const beforeEnter = (el: Element) => {
    const element = el as HTMLElement
    element.style.height = '0'
    element.style.display = 'block'
  }

  const enter = (el: Element) => {
    const element = el as HTMLElement
    element.style.height = `${element.scrollHeight}px`
  }

  const afterEnter = (el: Element) => {
    const element = el as HTMLElement
    element.style.height = 'auto'
    element.style.display = 'block'
    element.style.overflowY = 'auto'
  }

  const beforeLeave = (el: Element) => {
    const element = el as HTMLElement
    element.style.height = `${element.scrollHeight}px`
  }

  const leave = (el: Element) => {
    const element = el as HTMLElement
    element.style.height = '0'
  }
</script>

<template>
  <header class="c-header">
    <BaseContent padding-y="none">
      <div class="c-header__inner">
        <BaseLogo />
        <BaseHamburgerMenu
          :aria-controls="menuId"
          :aria-expanded="isMenuOpen"
          :class="{ 'is-active': isMenuOpen }"
          @click="toggleMenu"
        />
        <div class="c-header__navigationPC">
          <HeaderNavigation :class="{ 'is-active': isMenuOpen }" />
        </div>
        <div class="c-header__navigationSP">
          <Transition
            name="slide"
            @before-enter="beforeEnter"
            @enter="enter"
            @after-enter="afterEnter"
            @before-leave="beforeLeave"
            @leave="leave"
          >
            <HeaderNavigation
              v-show="isMenuOpen"
              :id="menuId"
              :class="{ 'is-active': isMenuOpen }"
            />
          </Transition>
        </div>
        <BaseOverlay :class="{ 'is-active': isMenuOpen }" @click="closeMenu" />
      </div>
    </BaseContent>
  </header>
  <!-- /.c-content -->
</template>

<style scoped lang="scss">
  .c-header {
    position: sticky;
    top: 0;
    z-index: 100;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: var(--header-height);
    background-color: rgb(246 246 246 / 60%);
    backdrop-filter: blur(15px);

    &__inner {
      display: flex;
      gap: 40px;
      align-items: center;
      justify-content: space-between;

      @include mixin.media(pc, $minor-breakpoint) {
        padding: 16px 0;
      }
    }

    &__navigationSP {
      @include mixin.media(pc, $minor-breakpoint) {
        display: none;
      }
    }

    &__navigationPC {
      @include mixin.media(sp, $minor-breakpoint) {
        display: none;
      }
    }
  }

  .slide-enter-active,
  .slide-leave-active {
    overflow: hidden !important;
    transition: height var(--transition);
  }

  .slide-enter,
  .slide-leave-to {
    height: 0;
  }
</style>
