<template>
  <BaseHeadingLevel2>Skill</BaseHeadingLevel2>

  <ul class="c-skill-list">
    <li v-for="skillItem in skillItems" :key="skillItem.name" class="c-skill-list__item">
      <div class="c-skill-list__title">
        <b>{{ skillItem.title }}</b>
      </div>
      <div class="c-skill-list__icon">
        <Icon
          class="c-skill-list__iconItem"
          :name="`simple-icons:${skillItem.name}`"
          size="48"
          :title="skillItem.title"
          role="img"
          :style="{ '--color-skill': skillItem.colorCode }"
        />
      </div>
      <div class="c-skill-list__rate">
        <BaseRate :rate="skillItem.skillRate" />
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
  import BaseHeadingLevel2 from '~/components/atoms/BaseHeadingLevel2.vue'
  import BaseRate from '~/components/atoms/BaseRate.vue'

  type SkillItem = {
    name: string
    title: string
    colorCode: string
    skillRate: number
  }

  const skillItems: SkillItem[] = [
    { name: 'adobephotoshop', title: 'Photoshop', colorCode: '#31A8FF', skillRate: 4 },
    { name: 'adobeillustrator', title: 'Illustrator', colorCode: '#FF9A00', skillRate: 4 },
    { name: 'adobexd', title: 'XD', colorCode: '#FF61F6', skillRate: 5 },
    { name: 'figma', title: 'Figma', colorCode: '#F24E1E', skillRate: 4 },
    { name: 'github', title: 'GitHub', colorCode: '#181717', skillRate: 5 },
    { name: 'gitlab', title: 'GitLab', colorCode: '#FC6D26', skillRate: 5 },
    { name: 'html5', title: 'HTML5', colorCode: '#E34F26', skillRate: 5 },
    { name: 'ejs', title: 'EJS', colorCode: '#B4CA65', skillRate: 5 },
    { name: 'css', title: 'CSS', colorCode: '#663399', skillRate: 5 },
    { name: 'sass', title: 'Sass', colorCode: '#CC6699', skillRate: 5 },
    { name: 'tailwindcss', title: 'Tailwind CSS', colorCode: '#06B6D4', skillRate: 3 },
    { name: 'javascript', title: 'JavaScript', colorCode: '#F7DF1E', skillRate: 5 },
    { name: 'typescript', title: 'TypeScript', colorCode: '#3178C6', skillRate: 4 },
    { name: 'vuedotjs', title: 'Vue.js', colorCode: '#4FC08D', skillRate: 3.5 },
    { name: 'nuxtdotjs', title: 'Nuxt.js', colorCode: '#00DC82', skillRate: 3.5 },
    { name: 'react', title: 'React', colorCode: '#61DAFB', skillRate: 2 },
    { name: 'nextdotjs', title: 'Next.js', colorCode: '#000000', skillRate: 2 },
    { name: 'nodedotjs', title: 'Node.js', colorCode: '#5FA04E', skillRate: 4 },
    { name: 'php', title: 'PHP', colorCode: '#777BB4', skillRate: 2 },
  ]
</script>

<style scoped lang="scss">
  .c-skill-list {
    display: flex;
    flex-wrap: wrap;
    gap: clamp(2.4rem, calc(-3.289rem + 7.407vw), 5.6rem); /* min: 24px, max: 56px */
    justify-content: center;
    margin: 32px auto 0;
    list-style: none;

    @include mixin.media(pc) {
      margin-top: 40px;
    }

    &__item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-end;
      width: 98px;

      @include mixin.media(pc) {
        width: 110px;
      }
    }

    &__title {
      font-size: 1.4rem;
      text-align: center;

      @include mixin.media(pc) {
        font-size: 1.6rem;
      }
    }

    &__icon {
      margin-top: 8px;
    }

    &__iconItem {
      color: var(--color-skill);
    }

    &__rate {
      margin-top: 4px;
    }
  }
</style>
