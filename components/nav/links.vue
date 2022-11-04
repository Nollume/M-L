<template>
  <nav v-if="store.openNav" class="my-auto relative">
    <TransitionGroup
      tag="ul"
      name="fadeFromRight"
      class="flex flex-col items-center gap-2 py-1 lg:flex-row lg:justify-end 2xl:justify-center"
    >
      <li class="hidden lg:block" key="0">
        <NavLogo />
      </li>
      <li v-if="store.showLinks" key="1">
        <NuxtLink to="/" @click="store.openNavigation" class="navLinks"
          >Music</NuxtLink
        >
      </li>
      <li v-if="store.showLinks" key="2">
        <NuxtLink to="/about" @click="store.openNavigation" class="navLinks"
          >About</NuxtLink
        >
      </li>
      <li v-if="store.showLinks" key="3">
        <NuxtLink to="/contact" @click="store.openNavigation" class="navLinks"
          >Contact</NuxtLink
        >
      </li>
    </TransitionGroup>
  </nav>
</template>

<script setup lang="ts">
import { useStore } from "~/stores/store";
const store = useStore();
</script>

<style scoped>
.fadeFromRight-enter-active,
.fadeFromRight-leave-active {
  transition: all 0.5s ease-in-out;
}

.fadeFromRight-leave-to,
.fadeFromRight-enter-from {
  transform: translateX(3rem);
  opacity: 0;
}
</style>
