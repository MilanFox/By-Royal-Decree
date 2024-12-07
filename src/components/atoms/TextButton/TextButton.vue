<template>
  <button class="text-button">
    <slot/>
  </button>
</template>

<style lang="scss">
.text-button {
  margin-top: 8px;
  padding: 4px 8px;
  text-align: center;
  border: 4px outset $color-black;
  background: $color-primary-4;
  color: $color-primary-1;
  width: 100%;
}
</style>
