<template>
  <div class="relative flex">
    <NavLogo />
    <div
      class="menu"
      @click="store.openNavigation"
      :class="store.openNav ? 'menu-cross lg:hidden' : ''"
    >
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "~/stores/store";
const store = useStore();
</script>

<style lang="scss" scoped></style>
