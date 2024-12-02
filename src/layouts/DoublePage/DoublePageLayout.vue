<template>
  <div class="double-page">
    <Pane :title="title" class="double-page__left double-page__page">
      <slot name="left"/>
    </Pane>

    <div class="double-page__right double-page__page">
      <div class="double-page__tablist" role="tablist">
        <button
          v-for="({text, src}, i) in tabs"
          :key="text"
          role="tab"
          class="double-page__tab"
          @click="currentTab = i"
          :aria-controls="`double-page__tabpanel-${i}`"
          :aria-current="currentTab === i"
          :disabled="!src"
          :class="{
            'double-page__tab--active': currentTab === i,
            'double-page__tab--disabled': !src,
          }"
        >
          <img :alt="text" src="/images/ribbon/ribbon_r.png" class="double-page__tab-ribbon">
          <img v-if="src" alt="" :src="src" class="double-page__tab-thumbnail"/>
        </button>
      </div>

      <div class="double-page__tabpanel" role="tabpanel">
        <Pane
          v-for="({text}, i) in tabs"
          :key="text"
          :title="text"
          v-show="currentTab === i"
          class="double-page__tabpanel-content"
          id="double-page__tabpanel-0">
          <slot :name="`right-${i}`"/>
        </Pane>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Pane from '@molecules/Pane/Pane.vue';
import { ref } from 'vue';
import type { DoublePageLayoutProps } from './DoublePageLayout.types';

withDefaults(defineProps<DoublePageLayoutProps>(), {
  tabs: () => [{ text: 'Game Settings', src: '' }],
});

const currentTab = ref(0);
</script>

<style lang="scss">
.double-page {
  display: grid;
  isolation: isolate;
  grid-template-rows: repeat(2, minmax(0, 1fr));
  grid-template-columns: 1fr;
  height: calc(100% - 120px);
  margin-top: 20px;

  @include from-breakpoint(tablet) {
    grid-template-rows: minmax(0, 1fr);
    grid-template-columns: repeat(2, minmax(0, 1fr));
    width: calc(100% - 120px);
    margin-top: unset;
    margin-left: 20px;
    height: 100%;
  }

  &__left {
    --shadow-offset-x: -20px;
    --dummy-page-pos-offset: -10px;
    --dummy-page-size-offset: 10px;
    --dummy-page-z-index: -1;
  }

  &__right {
    --shadow-offset-x: 20px;
    --dummy-page-pos-offset: calc(-20px - 100%);
    --dummy-page-size-offset: 20px;
    --dummy-page-z-index: -2;
  }

  &__page {
    position: relative;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: var(--dummy-page-pos-offset);
      bottom: 0;
      width: 100%;
      height: calc(200% + (2 * var(--dummy-page-size-offset)));
      border-image: url('/images/panes/background.png') 64 fill / 64px / 0 round;
      z-index: var(--dummy-page-z-index);
      filter: brightness(70%);

      @include from-breakpoint(tablet) {
        width: calc(200% + (2 * var(--dummy-page-size-offset)));
        height: 100%;
        left: var(--dummy-page-pos-offset);
        top: 0;
      }
    }

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      pointer-events: none;
      box-shadow: inset 0 var(--shadow-offset-x) 20px rgb(0 0 0 / 20%);

      @include from-breakpoint(tablet) {
        box-shadow: inset var(--shadow-offset-x) 0 20px rgb(0 0 0 / 20%);
      }
    }
  }

  &__tablist {
    position: absolute;
    display: flex;
    z-index: -1;

    @include to-breakpoint(tablet) {
      bottom: 10px;
      left: 20px;
    }

    @include from-breakpoint(tablet) {
      flex-direction: column;
      right: -50px;
      top: 25px;
    }
  }

  &__tab {
    transition: transform 100ms ease-in-out;
    position: relative;
    width: 50px;
    transform: rotateZ(90deg);

    &:hover {
      transform: translateY(25px) rotateZ(90deg);
    }

    &--disabled {
      cursor: unset;
    }

    &--active {
      transform: translateY(50px) rotateZ(90deg) !important;
    }

    @include from-breakpoint(tablet) {
      width: initial;
      transform: initial;

      &:hover {
        transform: translateX(25px);
      }

      &--active {
        transform: translateX(50px) !important;
      }
    }
  }

  &__tab-thumbnail {
    position: absolute;
    height: 35px;
    transform: rotateZ(-90deg);
    left: 35px;
    top: 5px;

    @include from-breakpoint(tablet) {
      transform: unset;
      right: 40px;
    }
  }

  &__tabpanel, &__tabpanel-content {
    height: 100%;
  }
}

</style>
