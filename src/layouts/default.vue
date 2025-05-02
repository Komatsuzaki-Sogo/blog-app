<template>
  <div class="container">
    <header>header</header>
    <slot />
    <footer>footer</footer>
  </div>
</template>

<style lang="scss">
html {
  font-family: "Noto Sans JP", serif;
}

.container {
  display: grid;
  grid-template-rows: auto 1fr auto;
  gap: 40px;
}
</style>
