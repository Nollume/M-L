<template>
  <div
    class="nav-container"
    :class="
      store.openNav ? 'h-1/2 after:scale-x-100 lg:h-12 lg:after:hidden' : 'h-12'
    "
  >
    <div class="flex flex-col h-full">
      <NavLogoMenu class="lg:hidden" />
      <NavLinks />
      <NavSociallinks class="lg:hidden" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "~/stores/store";
const store = useStore();
</script>

<style scoped></style>
