<template>
  <footer class="c-footer">
    <BaseContent padding-y="none">
      <div class="c-footer__layout">
        <div class="c-footer__logo">
          <BaseLogo />
        </div>

        <div class="c-footer__navigation">
          <FooterNavigation />
        </div>

        <div class="c-footer__sns">
          <SNSIcons type="footer" />
        </div>

        <div class="c-footer__copyright">
          <small class="c-footer__copyrightText">
            Copyright &copy; KS BLOG. All Rights Reserved.
          </small>
        </div>
      </div>
    </BaseContent>
  </footer>
</template>

<script setup lang="ts">
  import BaseContent from '~/components/atoms/BaseContent.vue'
  import BaseLogo from '~/components/atoms/BaseLogo.vue'
  import SNSIcons from '~/components/molecules/SNSIcons.vue'
  import FooterNavigation from '~/components/molecules/FooterNavigation.vue'
</script>

<style scoped lang="scss">
  .c-footer {
    --local-gap-y: 24px;

    padding: 48px 0;
    color: var(--color-foreground-light);
    background-color: var(--color-background-black);

    @include mixin.media(pc) {
      padding-top: 108px;
    }

    &__layout {
      display: grid;
      grid-template-areas: 'logo' 'navigation' 'sns' 'copyright';
      grid-template-rows: auto 1fr auto auto;
      grid-template-columns: 1fr;
      gap: var(--local-gap-y);

      @include mixin.media(pc) {
        grid-template-areas: 'logo navigation' 'sns sns' 'copyright copyright';
        grid-template-rows: auto 1fr auto;
        grid-template-columns: 1fr auto;
      }
    }

    &__logo {
      grid-area: logo;

      @include mixin.media(sp) {
        padding-bottom: var(--local-gap-y);
        border-bottom: 1px solid #484848;
      }
    }

    &__navigation {
      grid-area: navigation;

      @include mixin.media(sp) {
        padding-bottom: var(--local-gap-y);
        border-bottom: 1px solid #484848;
      }

      @include mixin.media(pc) {
        display: flex;
        align-items: center;
      }
    }

    &__sns {
      grid-area: sns;
    }

    &__copyright {
      grid-area: copyright;
    }

    &__copyrightText {
      display: block;
      font-size: 1.2rem;
      text-align: center;
    }

    *:focus-visible {
      outline-color: var(--color-outline-white);
    }
  }
</style>
