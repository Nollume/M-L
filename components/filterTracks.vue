<template>
  <div
    class="border-b-2 border-orange-600 py-2 w-full px-3 lg:relative lg:border-b-0 lg:min-h-screen lg:border-r-2 lg:px-4 lg:flex lg:flex-col lg:justify-start lg:gap-10"
  >
    <h1
      class="hidden lg:absolute lg:block headline lg:border-b-0 top-1/4 write-mode right-8"
    >
      Music
    </h1>
    <fieldset
      class="w-full flex flex-col gap-4 text-sm md:text-base md:gap-6 lg:mt-8"
    >
      <div
        class="w-full relative sm:w-4/5 sm:mx-auto md:w-1/2 md:mt-4 lg:mt-0 lg:w-3/4"
      >
        <IconsSearch
          class="absolute top-1/2 left-1.5 -translate-y-1/2 lg:w-6 lg:left-2"
        />
        <input
          @input="searchTrack"
          type="text"
          class="search w-full md:pl-7 md:py-2 lg:text-xl lg:pl-9 lg:py-3"
          v-model="search"
          placeholder="Search for a track..."
        />
      </div>
      <div
        class="flex justify-evenly md:pb-4 lg:pb-0 lg:w-3/4 lg:mx-auto lg:flex-col lg:items-start lg:gap-2"
      >
        <div @click="resetSearch" class="flex items-center gap-2">
          <input
            class="input-radio"
            type="radio"
            name="tracks"
            id="originals"
            v-model="popularity"
            :value="tracks.ORIGINALS"
          />
          <label
            class="cursor-pointer hover:text-orange-500 active:text-orange-500 duration-300 lg:text-xl"
            for="originals"
            >{{ tracks.ORIGINALS }}</label
          >
        </div>
        <div @click="resetSearch" class="flex items-center gap-2">
          <input
            class="input-radio"
            type="radio"
            name="tracks"
            id="remixes"
            :value="tracks.REMIXES"
            v-model="popularity"
          />
          <label
            class="cursor-pointer hover:text-orange-500 active:text-orange-500 duration-300 lg:text-xl"
            for="remixes"
            >{{ tracks.REMIXES }}</label
          >
        </div>
        <div @click="resetSearch" class="flex items-center gap-2">
          <input
            class="input-radio"
            type="radio"
            name="tracks"
            id="all"
            :value="tracks.ALL"
            v-model="popularity"
          />
          <label
            class="cursor-pointer hover:text-orange-500 active:text-orange-500 duration-300 lg:text-xl"
            for="all"
            >{{ tracks.ALL }}</label
          >
        </div>
      </div>
    </fieldset>
  </div>
</template>

<script setup lang="ts">
import { tracks } from "~/interfaces";
import debounce from "lodash.debounce";

const popularity = ref<tracks>(tracks.ALL);
const search = ref("");
const emits = defineEmits(["optionFilter", "searchValue"]);

const searchTrack = debounce(() => {
  emits("searchValue", search.value);
}, 500);

const resetSearch = () => {
  search.value = "";
  emits("searchValue", search.value);
};

watch(popularity, () => {
  emits("optionFilter", popularity.value);
});
</script>

<style scoped></style>
