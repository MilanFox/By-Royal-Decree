<template>
  <header class="header">
    <Avatar class="header__avatar"/>
    <h1 class="header__headline"><img src="/logo.png" alt="By Royal Decree" class="header__logo"/></h1>
    <button>
      <IconMenu class="header__menu" color="#FFFFFF" alt="Menu"/>
    </button>
  </header>
</template>

<script setup lang="ts">
import Avatar from '@atoms/Avatar/Avatar.vue';
import IconMenu from '@icons/IconMenu.vue';
</script>

<style lang="scss">
.header {
  height: 100px;
  display: flex;
  align-items: end;
  justify-content: space-between;

  &__headline {
    height: 80%;
  }

  &__logo {
    height: 100%;
    width: 0;

    @include from-breakpoint(tablet) {
      width: unset;
    }
  }

  /* PLACEHOLDER COMPONENT */
  &__avatar {
    height: 80%;

  }

  /* PLACEHOLDER COMPONENT */
  &__menu {
    align-self: center;
    font-size: 50px;
  }
}
</style>
