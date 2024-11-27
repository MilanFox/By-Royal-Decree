<template>
  <div class="default-layout">
    <SpeedInsights/>
    <Header/>
    <main>
      <RouterView class="default-layout__content"/>
    </main>
    <Footer/>
  </div>
</template>

<script setup lang="ts">
import { SpeedInsights } from '@vercel/speed-insights/vue';
import Header from '@organisms/Header/Header.vue';
import Footer from '@molecules/Footer/Footer.vue';
</script>

<style lang="scss">
.default-layout {
  height: 100dvh;
  padding: 0 16px;
  max-width: 1600px;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: relative;

  &__content {
    height: 100%;
  }

  main {
    flex-grow: 1;
  }
}

</style>
