<template>
  <NuxtLayout class="relative min-h-screen overflow-hidden">
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
useHead({
  title: " Mark & Lukas - Music",
});
</script>

<style>
.router-link-exact-active {
  @apply text-orange-600;
}
</style>
