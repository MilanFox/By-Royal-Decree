<template>
  <a v-if="!isImage" :href="href" class="navigation-item" :class="{'navigation-item--pill': isPill}">
    {{ text }}
  </a>

  <a v-else :href="href" class="navigation-item navigation-item--image">
    <img :alt="text" :src="src">
    <span>{{ text }}</span>
  </a>
</template>

<script setup lang="ts">
import type { NavigationItemProps } from '@atoms/NavigationItem/NavigationItem.types';

defineProps<NavigationItemProps>();
</script>

<style lang="scss">
.navigation-item {
  color: inherit;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }

  &--pill {
    @include from-breakpoint(desktop) {
      background: $color-contrast;
      color: $color-bg;
      padding: 4px 12px;
      border-radius: 999px;
    }
  }

  &--image {
    span {
      @include from-breakpoint(desktop) {
        display: none;
      }
    }

    img {
      height: calc(1em + 12px);
      display: none;

      @include from-breakpoint(desktop) {
        display: unset;
      }
    }
  }
}

</style>
