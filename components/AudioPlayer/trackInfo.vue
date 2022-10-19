<template>
  <div>
    <Transition name="fadeIn">
      <div
        v-if="store.openNav"
        class=" flex items-center justify-evenly gap-2"
      >
        <div class="py-0.5 flex-[1]">
          <img
            class="w-20 h-auto border-2 border-orange-600"
            :src="loadData.artworkUrl60"
            alt=""
          />
        </div>
        <div class="flex-[2]">
          <h4 class="whitespace-nowrap pb-0.5 border-b border-orange-600">
            {{ loadData.artistName }}
          </h4>
          <p class="text-xs pt-1 inline">
            {{ loadData.trackCensoredName }}
          </p>
          <p class="text-xs pt-1 border-t border-orange-600">
            {{ loadData.collectionName }}
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
