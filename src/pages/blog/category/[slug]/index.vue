<template>
  <BaseLoading />
</template>

<script setup lang="ts">
  import BaseLoading from '~/components/atoms/BaseLoading.vue'
  const router = useRouter()
  const route = useRoute()
  const slug = route.params.slug as string
  router.replace(`/blog/category/${slug}/1`)
</script>
