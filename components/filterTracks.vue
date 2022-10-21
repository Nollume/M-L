<template>
  <div class="border-b-2 border-orange-600 py-2 w-full px-3">
    <fieldset class="w-full flex flex-col gap-2 text-sm">
      <input
        type="text"
        class="search border border-orange-700"
        v-model="search"
        placeholder="Search for a track..."
      />
      <div class="flex justify-evenly">
        <div class="flex items-center gap-2">
          <input
            class="input-radio"
            type="radio"
            name="tracks"
            id="originals"
            v-model="popularity"
            :value="tracks.ORIGINALS"
          />
          <label
            class="cursor-pointer hover:text-orange-500 active:text-orange-500 duration-300"
            for="originals"
            >{{ tracks.ORIGINALS }}</label
          >
        </div>
        <div class="flex items-center gap-2">
          <input
            class="input-radio"
            type="radio"
            name="tracks"
            id="remixes"
            :value="tracks.REMIXES"
            v-model="popularity"
          />
          <label
            class="cursor-pointer hover:text-orange-500 active:text-orange-500 duration-300"
            for="remixes"
            >{{ tracks.REMIXES }}</label
          >
        </div>
        <div class="flex items-center gap-2">
          <input
            class="input-radio"
            type="radio"
            name="tracks"
            id="all"
            :value="tracks.ALL"
            v-model="popularity"
          />
          <label
            class="cursor-pointer hover:text-orange-500 active:text-orange-500 duration-300"
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

watch(popularity, () => {
  emits("optionFilter", popularity.value);
});
watch(
  search,
  debounce(() => {
    emits("searchValue", search.value);
  }, 500)
);
</script>

<style scoped></style>
