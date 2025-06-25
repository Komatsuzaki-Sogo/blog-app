<template>
  <BaseContent padding-y="top" bg-color="primary">
    <BaseHeadingLevel1 markup="h2">Contact me</BaseHeadingLevel1>
    <div>button</div>
    <div class="c-index-contactSNS">
      <div class="c-index-contactSNS__content">
        <h3 class="c-index-contactSNS__title">Follow me!!</h3>
        <p class="c-index-contactSNS__text">
          Facebook、X、Instagramにて情報を発信していますので<br
            class="md:hidden"
          />フォローお願いします。
        </p>
      </div>

      <div class="c-index-contactSNS__content">
        <SNSIcons />
      </div>
    </div>
  </BaseContent>
</template>

<script setup lang="ts">
  import BaseContent from '~/components/atoms/BaseContent.vue'
  import BaseHeadingLevel1 from '~/components/atoms/BaseHeadingLevel1.vue'
  import SNSIcons from '~/components/molecules/SNSIcons.vue'
</script>

<style scoped lang="scss">
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
  }
</style>
