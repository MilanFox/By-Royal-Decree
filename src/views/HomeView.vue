<template>
  <DoublePageLayout title="Welcome" :tabs="tabs" class="home-view">
    <template #left>
      <p>
        You are the monarch of this lands and your population is there to fulfill your wishes. No need to do manual
        labor yourself!
      </p>
      <p>
        Unfortunately your population is rather dumb and relies on your wisdom to accomplish their tasks - you might
        need to spell it out for them..
      </p>
    </template>

    <template #right-0>
      <ul class="home-view__level-select">
        <li v-for="(level, i) in levels" :key="level.title">
          <a :href="`/level/${i + 1}`">
            Chapter {{ i + 1 }}:&nbsp;&nbsp;{{ level.title }}
          </a>
        </li>
      </ul>
    </template>
  </DoublePageLayout>
</template>

<script setup lang="ts">
import DoublePageLayout from '@layouts/DoublePage/DoublePageLayout.vue';
import levels from '@/levels';

const tabs = [
  { text: 'Level Selection', src: '' },
];
</script>

<style lang="scss">
.home-view {
  &__level-select {
    list-style: none;
    padding: 0;
  }

  a {
    color: inherit;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
