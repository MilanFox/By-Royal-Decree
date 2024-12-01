<template>
  <DoublePageLayout title="Settings" :tabs="tabs">
    <template #left>Here be Settings</template>

    <template #right-0>Lorem Ipsum</template>
  </DoublePageLayout>
</template>

<script setup lang="ts">
import DoublePageLayout from '@layouts/DoublePage/DoublePageLayout.vue';

const tabs = [
  { text: 'Game Settings', src: '/icons/settings.png' },
];
</script>

<style lang="scss">

</style>
