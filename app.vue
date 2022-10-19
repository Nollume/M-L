<template>
  <NuxtLayout class="relative min-h-screen overflow-hidden">
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
</script>

<style>
.router-link-exact-active {
  @apply text-orange-600;
}
</style>
