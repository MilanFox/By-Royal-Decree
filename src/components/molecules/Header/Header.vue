<template>
  <header class="header">
    <a href="/">
      <h1><img src="/logo.png" alt="By Royal Decree" class="header__logo"/></h1>
    </a>
    <Navigation class="header__navigation"/>
  </header>
</template>

<script setup lang="ts">
import Navigation from '@atoms/Navigation/Navigation.vue';
</script>

<style lang="scss">
.header {
  padding-top: 20px;
  padding-right: 20px;
  display: flex;
  align-items: end;
  justify-content: space-between;

  &__logo {
    height: 80px;
  }

  &__navigation {
    height: 100%;
  }
}
</style>
