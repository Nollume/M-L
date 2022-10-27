<template>
  <div v-if="store.openNav">
    <TransitionGroup
      tag="ul"
      name="fadeFromLeft"
      class="flex items-center pb-8 justify-center gap-4 my-auto lg:pb-0 lg:flex-col lg:pt-12"
    >
      <li v-if="store.showLinks">
        <a
          href="https://www.facebook.com/MarkandLukas"
          target="_blank"
          title="Facebook"
        >
          <IconsFb class="w-6" />
        </a>
      </li>
      <li v-if="store.showLinks">
        <a
          href="https://twitter.com/markandlukas"
          target="_blank"
          title="Twitter"
        >
          <IconsTwitter class="w-6" />
        </a>
      </li>
      <li v-if="store.showLinks">
        <a
          href="https://soundcloud.com/mark-lukas-1"
          target="_blank"
          title="Soundcloud"
        >
          <IconsSoundcloud class="w-6" />
        </a>
      </li>
      <li v-if="store.showLinks">
        <a
          href="https://open.spotify.com/artist/5RO3il4O2kpXI6nAfLT9xr"
          target="_blank"
          title="Spotify"
          ><IconsSpotify class="w-6"
        /></a>
      </li>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "~/stores/store";
const store = useStore();
</script>

<style scoped>
.fadeFromLeft-enter-active,
.fadeFromLeft-leave-active {
  transition: all 0.5s ease-in-out;
}

.fadeFromLeft-leave-to,
.fadeFromLeft-enter-from {
  transform: translateX(-3rem);
  opacity: 0;
}
</style>
