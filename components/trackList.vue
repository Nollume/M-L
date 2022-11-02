<template>
  <ul
    class="w-full px-3 mx-auto pt-2 pb-24 flex flex-col gap-2 sm:pt-6 lg:overflow-y-scroll"
  >
    <li
      v-for="(track, index) in filterData"
      :key="track.trackId"
      class="flex gap-2 list lg:px-4"
    >
      <div class="flex items-center gap-2">
        <p class="text-xs w-5 hidden sm:block">
          {{ (index + 1).toString().padStart(3, "0") }}
        </p>
        <div class="relative">
          <picture>
            <source :srcset="track.artworkUrl60" media="(min-width: 640px)" />
            <img :src="track.artworkUrl30" alt="art work" />
          </picture>
          <div
            v-if="!store.isPlaying || track.trackId !== store.loadData.trackId"
            class="icon-play"
            @click="
              store.sendDataToAudioPlayer(
                track.artistName,
                track.trackCensoredName,
                track.previewUrl,
                track.artworkUrl60,
                track.collectionName,
                track.trackId
              )
            "
          >
            <div class="bg-orange-600 p-1.5 rounded-full">
              <IconsPlay />
            </div>
          </div>
          <div
            v-else-if="store.isPlaying"
            @click="store.isPlaying = false"
            class="icon-play opacity-100 lg:scale-100"
          >
            <div class="bg-orange-600 p-1.5 rounded-full">
              <IconsPause class="text-stone-200" />
            </div>
          </div>
        </div>
      </div>
      <article
        class="flex-1 flex flex-col justify-evenly px-2 rounded-sm bg-[#201D1C]"
      >
        <div class="flex justify-between">
          <h4 class="font-bold text-sm md:text-base">
            {{ track.artistName }}
          </h4>
          <p v-if="track.releaseDate" class="hidden sm:block">
            {{ new Date(track.releaseDate).toLocaleDateString() }}
          </p>
        </div>
        <p class="text-xs inline md:text-sm">{{ track.trackCensoredName }}</p>
      </article>
    </li>
    <li v-if="!filterData.length && search.length">
      <p class="text-center lg:text-xl">Couldn't find that track.</p>
    </li>
    <li>
      <div
        class="hidden lg:block lg:row-start-1 lg:col-span-2 aspect-[31/13] w-full mb-14"
      ></div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { allMusicData } from "~/interfaces";
import { useStore } from "~/stores/store";
const store = useStore();

interface propsOptions {
  filterData: allMusicData[];
  search: string;
}

const props = defineProps<propsOptions>();
</script>

<style scoped></style>
