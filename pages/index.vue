<template>
  <div class="h-full relative bg-stone-900">
    <FilterTracks
      @optionFilter="popularity = $event"
      @searchValue="search = $event"
    />
    <TrackList :filterData="filterData" />
    <div v-if="store.loading" class="grid place-items-center">
      <img
        class="scale-[0.25]"
        src="~/assets/img/Eclipse-1s-187px.gif"
        alt="loading..."
      />
    </div>
    <p v-if="store.error" class="grid place-items-center">
      {{ store.error + " :(" }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { tracks } from "~/interfaces";
import { useStore } from "~/stores/store";
import debounce from "lodash.debounce";
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
</script>
