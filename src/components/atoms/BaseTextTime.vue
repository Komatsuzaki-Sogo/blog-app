<template>
  <time :datetime="time" class="c-text-time">
    <ClientOnly>
      {{ formattedTime }}
    </ClientOnly>
  </time>
</template>

<script setup lang="ts">
  import dayjs from 'dayjs'
  import utc from 'dayjs/plugin/utc'
  import timezone from 'dayjs/plugin/timezone'

  const props = defineProps<{
    time: string
  }>()

  dayjs.extend(utc)
  dayjs.extend(timezone)

  const formattedTime = computed(() => dayjs(props.time).tz('Asia/Tokyo').format('YYYY/MM/DD'))
</script>

<style scoped lang="scss">
  .c-text-time {
    font-size: 1.4rem;
    color: var(--color-foreground-gray);
  }
</style>
