<template>
  <nav class="navigation">
    <button class="navigation__menu-button" @click="toggleMobileNavigation">
      <img src="/icons/menu.png" alt="Show Menu" aria-haspopup="menu">
    </button>

    <ul class="navigation__list" :class="{'navigation__list--visible': shouldShowMobileNavigation}">
      <li v-for="navItem in navItems" :key="navItem.text">
        <NavigationItem v-bind="navItem"/>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { navItems } from '@molecules/Navigation/Navigation.src';
import NavigationItem from '@atoms/NavigationItem/NavigationItem.vue';
import { ref } from 'vue';

const shouldShowMobileNavigation = ref(false);
const toggleMobileNavigation = () => shouldShowMobileNavigation.value = !shouldShowMobileNavigation.value;
</script>

<style lang="scss">
.navigation {
  &__menu-button {
    @include from-breakpoint(desktop) {
      display: none;
    }

    img {
      height: 40px;
    }
  }

  &__list {
    list-style: none;
    padding: 0;
    display: none;
    overflow-y: auto;

    &--visible {
      @include to-breakpoint(desktop) {
        position: absolute;
        inset: 100px 0 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        z-index: $z-index-popup-menu;
        background: $color-bg;
        font-size: 24px;

        li {
          display: grid;
          place-items: center;
          height: 50px;
        }

        li + li {
          border-top: 1px solid $color-contrast
        }
      }

      @include to-breakpoint(tablet) {
        inset: 80px 0 0;
      }
    }

    @include from-breakpoint(desktop) {
      display: flex;
      align-items: center;
      gap: 50px;
    }
  }
}
</style>
