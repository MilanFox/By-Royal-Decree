<template>
  <div class="default-layout">
    <header/>
    <main>
      <RouterView class="default-layout__content"/>
    </main>
    <footer/>
  </div>
</template>

<style lang="scss">
.default-layout {
  height: 100dvh;
  display: flex;
  flex-direction: column;

  &__content {
    height: 100%;
  }

  main {
    flex-grow: 1;
  }

  header {
    height: 100px;
  }

  footer {
    height: 100px;
  }
}

</style>
