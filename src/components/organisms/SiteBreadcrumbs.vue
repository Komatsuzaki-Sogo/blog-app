<template>
  <ul v-if="pageLists && pageLists?.length" class="l-breadcrumb__list">
    <li v-for="(item, index) in pageLists" :key="item.path" class="l-breadcrumb__item">
      <NuxtLink
        :href="item.path"
        class="l-breadcrumb__link"
        :aria-current="index === pageLists.length - 1 ? 'page' : undefined"
      >
        <em v-if="index === pageLists.length - 1">{{ item.name }}</em>
        <template v-else>{{ item.name }}</template>
      </NuxtLink>
    </li>
  </ul>
</template>

<script setup lang="ts">
  const { pageLists } = useBreadcrumb()
</script>
