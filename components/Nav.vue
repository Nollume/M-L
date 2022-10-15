<template>
  <div
    class="nav-container"
    :class="store.openNav ? 'h-1/2 after:scale-x-100' : 'h-12'"
  >
    <div class="flex flex-col h-full">
      <div class="relative flex">
        <NuxtLink
          to="/"
          @click="store.openNav = false"
          class="absolute -top-[60%] -left-[0.7rem]"
        >
          <img
            class="w-16 h-auto"
            src="~/assets/img/mark-lukas-logo-white-transparent.png"
            alt="Mark & Lukas Logo"
          />
        </NuxtLink>
        <div
          class="menu"
          @click="store.openNavigation"
          :class="store.openNav ? 'menu-cross' : ''"
        >
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <nav v-if="store.openNav" class="my-auto">
        <TransitionGroup
          tag="ul"
          name="fadeFromRight"
          class="flex flex-col items-center gap-2 py-1"
        >
          <li v-if="store.showLinks">
            <NuxtLink to="/" @click="store.openNavigation" class="navLinks"
              >Home</NuxtLink
            >
          </li>
          <li v-if="store.showLinks">
            <NuxtLink to="/about" @click="store.openNavigation" class="navLinks"
              >About</NuxtLink
            >
          </li>
          <li v-if="store.showLinks">
            <NuxtLink to="/music" @click="store.openNavigation" class="navLinks"
              >Music</NuxtLink
            >
          </li>
        </TransitionGroup>
      </nav>
      <div v-if="store.openNav">
        <TransitionGroup
          tag="ul"
          name="fadeFromLeft"
          class="flex items-center justify-center gap-4 my-auto"
        >
          <li v-if="store.showLinks">
            <a
              href="https://www.facebook.com/MarkandLukas"
              target="_blank"
              class="p-4"
              title="Facebook"
            >
              <IconsFb class="scale-150" />
            </a>
          </li>
          <li v-if="store.showLinks">
            <a
              href="https://twitter.com/markandlukas"
              target="_blank"
              title="Twitter"
            >
              <IconsTwitter class="scale-150" />
            </a>
          </li>
          <li v-if="store.showLinks">
            <a
              href="https://soundcloud.com/mark-lukas-1"
              target="_blank"
              title="Soundcloud"
            >
              <IconsSoundcloud class="scale-150" />
            </a>
          </li>
          <li v-if="store.showLinks">
            <a
              href="https://open.spotify.com/artist/5RO3il4O2kpXI6nAfLT9xr"
              target="_blank"
              title="Spotify"
              ><IconsSpotify class="scale-150"
            /></a>
          </li>
        </TransitionGroup>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "~/stores/store";
const store = useStore();
</script>

<style scoped>
.fadeFromRight-enter-active,
.fadeFromRight-leave-active,
.fadeFromLeft-enter-active,
.fadeFromLeft-leave-active {
  transition: all 0.5s ease-in-out;
}

.fadeFromRight-leave-to,
.fadeFromRight-enter-from {
  transform: translateX(3rem);
  opacity: 0;
}
.fadeFromLeft-leave-to,
.fadeFromLeft-enter-from {
  transform: translateX(-3rem);
  opacity: 0;
}
</style>
