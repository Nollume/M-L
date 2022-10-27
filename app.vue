<template>
  <NuxtLayout class="relative min-h-screen max-w-[100rem] mx-auto ">
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useStore } from "~/stores/store";
const store = useStore();

useHead({
  title: " Mark & Lukas - Music",
});

store.getMusic();

onMounted(() => {
  store.screenResolution();
  window.addEventListener(
    "resize",
    store.screenResolution
  );
});
</script>

<style>
.router-link-exact-active {
  @apply text-orange-600;
}
</style>
