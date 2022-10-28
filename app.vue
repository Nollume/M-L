<template>
  <NuxtLayout class="relative min-h-screen max-w-[100rem] mx-auto">
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useStore } from "~/stores/store";
const store = useStore();

useHead({
  title: " Mark & Lukas - Music",
  meta: [
    {
      name: "description",
      content:
        "Mark & Lukas are a Slovakian-based brothers duo with the same passion and love for electronic music, especially in the genres of trance, deep house, and their favorite summer genre melodic progressive house.",
    },
  ],
});

store.getMusic();

onMounted(() => {
  store.screenResolution();
  window.addEventListener("resize", store.screenResolution);
});
</script>

<style>
.router-link-exact-active {
  @apply text-orange-600;
}

.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
