<template>
  <header class="header">
    <a href="/">
      <h1>
        <picture class="header__logo">
          <source srcset="/logo.png" media="(min-width: 768px)"/>
          <img src="/logo_sm.png" alt="By Royal Decree">
        </picture>
      </h1>
    </a>
    <Navigation class="header__navigation"/>
  </header>
</template>

<script setup lang="ts">
import Navigation from '@molecules/Navigation/Navigation.vue';
</script>

<style lang="scss">
.header {
  padding-top: 20px;
  padding-right: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &__logo img {
    height: 40px;

    @include from-breakpoint(tablet) {
      height: 80px;
    }
  }
}
</style>
