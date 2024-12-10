<template>
  <div class="status-message" v-if="levelValidationStatus">
    <img alt="" src="/images/status/king.png" class="status-message__image">
    <div class="status-message__message" role="alert">
      <button @click="clearMessage" aria-label="Clear Status Message" class="status-message__clear-button">X</button>
      &nbsp;&nbsp;
      {{ levelValidationStatus }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { statusMessage, useStatusMessageStore } from '@stores/statusMessage';

const { levelValidationStatus } = storeToRefs(useStatusMessageStore());

const clearMessage = () => {
  levelValidationStatus.value = statusMessage.validation.BLANK;
};
</script>

<style lang="scss">
.status-message {
  position: absolute;
  z-index: 1;
  inset: 0;
  filter: drop-shadow(5px 5px 2px rgba($color-black, 50%));
  pointer-events: none;

  > * {
    pointer-events: auto;
  }

  &__image {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 100px;

    @include from-breakpoint(tablet) {
      right: 75px;
    }
  }

  &__message {
    display: flex;
    align-items: center;
    position: absolute;
    max-width: 80%;
    background: $color-white;
    border-radius: 999px;
    padding: 4px 12px;
    bottom: 32px;
    right: 100px;
    word-break: break-all;
    max-height: 80%;
    font-size: 20px;

    @include from-breakpoint(tablet) {
      font-size: 24px;
      right: 175px;
      max-width: 60%;
    }

    &::after {
      content: '';
      position: absolute;
      right: 5px;
      top: 50%;
      width: 0;
      height: 0;
      border: 20px solid transparent;
      border-left-color: $color-white;
      border-right: 0;
      border-bottom: 0;
      margin-top: -10px;
      margin-right: -20px;
    }
  }

  &__clear-button {
    background: $color-text-primary;
    color: $color-white;
    width: 20px;
    height: 20px;
    display: grid;
    place-items: center;
    font-size: 16px;
    border-radius: 50px;
  }
}
</style>
