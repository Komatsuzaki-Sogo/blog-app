<template>
  <BaseContent padding-y="top" bg-color="primary">
    <div class="c-contact-link">
      <NuxtLink :to="PATHS.CONTACT.path" class="c-contact-link__link">
        <Icon name="bytesize:mail" mode="svg" class="c-contact-link__icon" />
        <span class="c-contact-link__text">
          <span class="c-contact-link__textMain">Contact</span>
          <span class="c-contact-link__textSub">お気軽にお問い合わせください</span>
        </span>
      </NuxtLink>
    </div>

    <div class="c-index-contactSNS">
      <div class="c-index-contactSNS__content">
        <h2 class="c-index-contactSNS__title">Follow me!!</h2>
        <p class="c-index-contactSNS__text">
          Facebook、X、Instagramにて発信していますので<br class="md:hidden" />フォローお願いします。
        </p>
      </div>

      <div class="c-index-contactSNS__links">
        <SNSIcons />
      </div>
    </div>
  </BaseContent>
</template>

<script setup lang="ts">
  import BaseContent from '~/components/atoms/BaseContent.vue'
  import SNSIcons from '~/components/molecules/SNSIcons.vue'
</script>

<style scoped lang="scss">
  .c-contact-link {
    $this: &;

    margin: 0 auto;
    text-align: center;

    @include mixin.media(pc) {
      max-width: 450px;
    }

    &__link {
      padding: 16px;
      font-weight: var(--font-weight-bold);
      color: #2a4fe4;
      background-color: var(--color-background-light);
      border-radius: var(--border-radius-circle);

      @include mixin.media(pc) {
        border-radius: 12px;
      }

      @include mixin.media(hover) {
        &:hover {
          @include mixin.media(pc) {
            #{$this}__icon {
              transform: scale(1);
            }
            #{$this}__text {
              transform: translateY(0);
            }
          }
        }
      }
    }

    &__icon {
      display: none;

      @include mixin.media(pc) {
        display: block;
        width: 48px;
        margin: 0 auto;
        transform: scale(0);
        transition: transform var(--transition);
      }
    }

    &__text {
      display: block;

      @include mixin.media(pc) {
        transform: translateY(-24px);
        transition: transform var(--transition);
      }
    }

    &__textMain {
      display: block;
      font-size: 2.8rem;

      @include mixin.media(pc) {
        font-size: 4rem;
      }
    }

    &__textSub {
      display: block;
      font-size: 1.2rem;

      @include mixin.media(pc) {
        font-size: 1.4rem;
      }
    }
  }

  .c-index-contactSNS {
    display: flex;
    flex-direction: column;
    gap: clamp(3.6rem, calc(0.044rem + 4.63vw), 5.6rem); /* min: 36px, max: 56px */
    margin-top: 40px;
    color: var(--color-foreground-light);
    text-align: center;

    @include mixin.media(pc) {
      flex-direction: row;
      align-items: flex-end;
      justify-content: space-between;
      margin-top: 48px;
      text-align: left;
    }

    &__title {
      font-size: clamp(2.8rem, calc(0.667rem + 2.778vw), 4rem); /* min: 28px, max: 40px */
    }

    &__text {
      margin-top: 16px;
      font-size: 1.4rem;

      @include mixin.media(pc) {
        margin-top: 4px;
      }
    }

    &__links {
      flex: 0 0 auto;
    }
  }
</style>
