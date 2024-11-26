<template>
  <nav class="navigation">
    <a href="#" class="navigation__link">Wiki</a>
    <a href="#" class="navigation__link">Contribute</a>
    <a href="#" class="navigation__link">Level Select</a>
    <a href="#" class="navigation__link">Settings</a>

    <a href="https://github.com/MilanFox/By-Royal-Decree" class="navigation__link navigation__link--icon">
      <img alt="Github Repo" src="/images/socials/github.png">
    </a>

    <a href="#" class="navigation__link navigation__link--button">Login</a>
  </nav>
</template>

<style lang="scss">
.navigation {
  display: flex;
  align-items: center;
  gap: 50px;

  &__link {
    color: inherit;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }

    &--button {
      background: $color-contrast;
      color: $color-bg;
      padding: 4px 12px;
      border-radius: 999px;
    }

    &--icon {
      height: calc(1em + 12px);

      img {
        height: 100%;
      }
    }
  }

}
</style>
