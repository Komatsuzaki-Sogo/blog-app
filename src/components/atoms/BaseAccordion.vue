<template>
  <details
    :id="accordionId"
    :ref="detailsRefKey"
    class="c-accordion"
    :open="false"
    :class="{ 'is-opened': isOpened }"
  >
    <summary class="c-accordion__summary" @click.prevent="onClickSummary">
      <span class="c-accordion__summaryInner">
        <span class="c-accordion__summaryText"> {{ accordionTitle }}</span>
      </span>
    </summary>

    <div :ref="contentRefKey" class="c-accordion__content">
      <div class="c-accordion__contentInner">
        <slot />
      </div>
    </div>
  </details>
</template>

<script setup lang="ts">
  export interface MoleculesAccordion {
    accordionId: string
    accordionTitle: string
  }

  const { accordionId, accordionTitle } = defineProps<MoleculesAccordion>()

  const detailsRefKey = 'detailsRef'
  const contentRefKey = 'contentRef'

  const { isOpened, openContent, onClickSummary } = useAccordion(detailsRefKey, contentRefKey)

  /**
   * ハッシュ情報を取得して、accordionIdと等しければ開く
   */
  onMounted(() => {
    const route = useRoute()

    watchEffect(async () => {
      if (route.hash === `#${accordionId}`) {
        await nextTick()
        openContent()
      }
    })
  })
</script>

<style scoped lang="scss">
  .c-accordion {
    $this: &;

    max-width: 770px;
    margin: 40px auto 0;
    overflow: hidden;
    background: var(--color-background-light);
    border: 1px solid var(--color-primary);
    border-radius: 16px;
    box-shadow: var(--box-shadow);

    @include mixin.media(pc) {
      margin-top: 48px;
    }

    &[open] {
      #{$this}__summaryInner {
        &::after {
          transform: rotate(0);
        }
      }
    }

    &:not([open]) {
      #{$this}__content {
        display: none;
      }
    }

    &__summary {
      padding: 24px;
      cursor: pointer;
      list-style: none;
    }

    &__summaryInner {
      position: relative;
      display: block;
      padding: 0 32px 0 0;

      &::before,
      &::after {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        display: block;
        width: 20px;
        height: 4px;
        margin-top: auto;
        margin-bottom: auto;
        content: '';
        background-color: var(--color-primary);
        border-radius: 2px;
      }

      &::after {
        transform: rotate(90deg);
        transition: transform 0.4s;
      }
    }

    &__summaryText {
      position: relative;
      padding-left: 40px;
      font-size: 1.8rem;
      font-weight: var(--font-weight-bold);

      &::before {
        position: absolute;
        top: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 30px;
        height: 30px;
        padding-bottom: 3px;
        margin-top: auto;
        margin-bottom: auto;
        font-size: 1.8rem;
        font-weight: var(--font-weight-bold);
        color: var(--color-foreground-light);
        content: 'Q';
        background-color: var(--color-primary);
        border-radius: var(--border-radius-circle);
      }
    }

    &__contentInner {
      position: relative;
      padding: 0 24px 24px 64px;

      &::before {
        position: absolute;
        top: 0;
        left: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 30px;
        height: 30px;
        padding-bottom: 3px;
        margin-top: auto;
        margin-bottom: auto;
        font-size: 1.8rem;
        font-weight: var(--font-weight-bold);
        color: var(--color-foreground-light);
        content: 'A';
        background-color: #e9002e;
        border-radius: var(--border-radius-circle);
      }
    }

    & + & {
      margin-top: 24px;

      @include mixin.media(pc) {
        margin-top: 32px;
      }
    }
  }
</style>
