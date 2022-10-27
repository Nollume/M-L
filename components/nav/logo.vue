<template>
  <NuxtLink
    to="/"
    @click="redirectTohome"
    class="absolute -top-[60%] -left-[0.7rem] lg:top-[50%] lg:-translate-y-1/2"
  >
    <img
      class="w-16 h-auto"
      src="~/assets/img/mark-lukas-logo-white-transparent.png"
      alt="Mark & Lukas Logo"
    />
  </NuxtLink>
</template>

<script setup lang="ts">
import { useStore } from "~/stores/store";
const store = useStore();

const redirectTohome = () => {
  if (store.hamburgerMenu) {
    store.openNav = false;
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
};
</script>

<style lang="scss" scoped></style>
