<template>
  <div
    class="relative px-3 bg-stone-900 sm:px-6 lg:h-screen lg:overflow-y-hidden lg:px-0 lg:absolute lg:top-0 lg:right-0 lg:left-0"
  >
    <div class="lg:grid lg:grid-cols-2 lg:h-screen">
      <div
        class="hidden aspect-[62/13] w-full mb-12 lg:block lg:row-start-1 lg:col-span-2"
      ></div>

      <FilterTracks
        @optionFilter="popularity = $event"
        @searchValue="search = $event"
      />
      <TrackList
        :filterData="filterData"
        class="lg:row-start-2 lg:col-start-2"
      />
      <div v-if="store.loading" class="grid place-items-center">
        <img
          class="scale-[0.25]"
          src="/img/Eclipse-1s-187px.gif"
          alt="loading..."
        />
      </div>
      <p v-if="store.error" class="grid place-items-center">
        {{ store.error + " :(" }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { tracks } from "~/interfaces";
import { useStore } from "~/stores/store";
const store = useStore();

const popularity = ref<tracks>(tracks.ALL);
const search = ref("");

const filterData = computed(() => {
  if (search.value.length) {
    return store.allData.filter((track) => {
      return (
        store
          .validateSearch(track.trackCensoredName)
          .includes(store.validateSearch(search.value)) ||
        store
          .validateSearch(track.artistName)
          .includes(store.validateSearch(search.value))
      );
    });
  } else {
    if (popularity.value === tracks.ALL) {
      return store.allData;
    } else if (popularity.value === tracks.ORIGINALS) {
      return store.allData.filter((track) => {
        return !track.trackCensoredName.includes("Remix");
      });
    } else if (popularity.value === tracks.REMIXES) {
      return store.allData.filter((track) => {
        return (
          track.trackCensoredName.includes("Mark & Lukas") &&
          track.trackCensoredName.includes("Remix")
        );
      });
    }
  }
});

watchEffect(() => {
  store.filteredData = filterData.value;

});
</script>
