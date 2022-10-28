<template>
  <div>
    <Transition name="fadeIn">
      <div
        v-if="store.openNav"
        class="flex items-center justify-start h-24 gap-2 lg:h-full lg:w-80"
      >
        <div class="py-0.5 flex items-center sm:h-full">
          <img
            class="w-24 h-auto lg:h-full lg:w-auto"
            :src="loadData.artworkUrl60"
            alt=""
          />
        </div>
        <div class="w-full">
          <h4 class="pb-0.5 border-b border-orange-600 whitespace-nowrap">
            {{ loadData.artistName }}
          </h4>
          <p class="text-xs pt-1 sm:text-sm">
            {{ loadData.trackCensoredName }}
          </p>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useStore } from "~/stores/store";

const store = useStore();
const { loadData } = storeToRefs(store);
</script>

<style scoped>
.fadeIn-enter-active {
  animation: fade-in 1s;
}
.fadeIn-leave-active {
  animation: fade-in 0.25s reverse;
}
@keyframes fade-in {
  0% {
    opacity: 0;
  }
  75% {
    scale: 0.8;
    opacity: 0;
    transform: translatex(3rem);
  }
  100% {
    scale: 1;
    transform: translatex(0);
    opacity: 1;
  }
}
</style>
