<template>
  <div class="default-layout">
    <Header/>
    <main>
      <RouterView class="default-layout__content"/>
    </main>
    <Footer/>
  </div>
</template>

<script setup lang="ts">
import Header from '@organisms/Header/Header.vue';
import Footer from '@molecules/Footer/Footer.vue';
</script>

<style lang="scss">
.default-layout {
  height: 100dvh;
  padding: 0 16px;
  max-width: 1600px;
  margin: auto;
  gap: 16px;
  position: relative;
  display: grid;
  grid-template-rows: min-content minmax(0, 1fr) min-content;

  &__content {
    height: 100%;
  }
}

</style>
