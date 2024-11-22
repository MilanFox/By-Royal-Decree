<template>
  <div class="avatar">
    <img src="/avatars/avatar_02.webp" alt="">
  </div>
</template>

<style lang="scss">
.avatar {
  border-radius: 50%;
  overflow: hidden;
  aspect-ratio: 1;
  border: 2px solid $color-avatar-border;

  > img {
    height: 100%;
    object-fit: cover;
  }
}
</style>
