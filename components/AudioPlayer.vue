<template>
  <div
    v-if="store.filteredData.length"
    class="audio-player-container gap-1 lg:after:hidden 2xl:gap-32"
    :class="
      store.openNav
        ? 'h-1/2  after:scale-x-100 lg:h-20 lg:flex-row '
        : 'h-20 sm:flex-row'
    "
  >
    <AudioPlayerTrackInfo />
    <Transition name="disapear">
      <div
        v-show="store.showLinks"
        class="flex gap-4 items-center rounded-sm py-1 px-2"
      >
        <button
          @dblclick="store.loadNextOrPreviousTrack('prev')"
          @click="playFromStart"
          title="Previous"
        >
          <IconsNext class="rotate-180" />
        </button>
        <button
          title="Play"
          v-if="!isPlaying"
          @click="isPlaying = true"
          class="rounded-full p-2 bg-stone-800 border border-orange-600"
        >
          <IconsPlay />
        </button>
        <button
          v-else
          title="Pause"
          class="rounded-full p-2 bg-stone-800 border border-orange-600"
          @click="pauseTrack"
        >
          <IconsPause />
        </button>
        <button
          :disabled="store.getTrackIndex() === store.filteredData.length - 1"
          :class="{
            'opacity-25':
              store.getTrackIndex() === store.filteredData.length - 1,
          }"
          @click="store.loadNextOrPreviousTrack('next')"
          title="Next"
        >
          <IconsNext />
        </button>

        <button @click="repeatTrack" title="Repeat">
          <IconsRepeat :class="{ 'text-orange-600': isRepeating }" />
        </button>
        <div
          @mouseenter="showSlider = true"
          @mouseleave="showSlider = false"
          class="flex gap-2 items-center relative"
        >
          <button @click="turnOnVolume" v-if="volume == 0">
            <IconsMute />
          </button>
          <button @click="mute" v-else-if="volume >= 1 && volume < 75">
            <IconsVolumeLow />
          </button>
          <button @click="mute" v-else>
            <IconsVolumeHigh />
          </button>
          <div
            v-show="showSlider"
            class="flex items-center absolute bottom-full invisible lg:visible z-50"
          >
            <input
              class="range-inputs w-14 z-50"
              @input="setVolume"
              v-model="volume"
              min="0"
              max="100"
              type="range"
              name="volume"
            />
            <progress
              class="progress-bar w-14"
              min="0"
              max="100"
              value="100"
              ref="progressBarVolume"
            ></progress>
          </div>
          <div class="w-3 hidden lg:block">{{ volume }}</div>
        </div>
        <button
          v-if="!store.openNav"
          class="lg:hidden"
          @click="store.openNavigation"
        >
          <IconsExpand />
        </button>
        <button
          v-if="store.openNav"
          class="lg:hidden"
          @click="store.openNavigation"
        >
          <IconsMinimalize />
        </button>
      </div>
    </Transition>
    <Transition name="fade">
      <div v-show="store.showLinks" class="flex items-center gap-2">
        <div>
          <p class="text-xs w-8 md:w-9 md:text-sm lg:w-11 lg:text-base">
            {{ currentDuration }}
          </p>
        </div>
        <div class="flex items-center relative">
          <input
            class="range-inputs w-48 z-50"
            @input="seekTo"
            v-model="sliderValue"
            min="0"
            max="100"
            type="range"
            name="range"
          />
          <progress
            class="progress-bar w-48"
            min="0"
            max="100"
            value="0"
            ref="progressBar"
          ></progress>
        </div>
        <div>
          <p class="text-xs w-8 md:w-9 md:text-sm lg:w-11 lg:text-base">
            {{ duration }}
          </p>
        </div>
      </div>
    </Transition>
  </div>
  <div>
    <audio ref="currentTrack" class="invisible">
      <source :src="loadData.previewUrl" type="audio/mp3" />
    </audio>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "~/stores/store";
import throttle from "lodash.throttle";
import { storeToRefs } from "pinia";
const currentTrack = ref<HTMLAudioElement>(null);
const progressBar = ref<HTMLProgressElement>(null);
const progressBarVolume = ref<HTMLProgressElement>(null);
const volume = ref(100);
const sliderValue = ref(0);
const duration = ref("00:00");
const currentDuration = ref("00:00");
const showSlider = ref(false);

let timeout: ReturnType<typeof setTimeout>;
const store = useStore();

const { isPlaying, isRepeating, previousVolume, loadData } = storeToRefs(store);

const playTrack = () => {
  currentTrack.value.play();
  isPlaying.value = true;
  tick();
};
const pauseTrack = () => {
  clearInterval(timeout);
  currentTrack.value?.pause();
  isPlaying.value = false;
};
const repeatTrack = () => {
  currentTrack.value.loop = !currentTrack.value.loop;
  isRepeating.value = currentTrack.value.loop;
};
/**
 * Manage Volume
 */
const setVolume = () => {
  currentTrack.value.volume = volume.value / 100;
  currentTrack.value.muted = false;
  progressBarVolume.value.value = volume.value;
};
const mute = () => {
  previousVolume.value = volume.value;
  volume.value = 0;
  progressBarVolume.value.value = volume.value;
  currentTrack.value.muted = true;
};
const turnOnVolume = () => {
  volume.value = previousVolume.value;
  setVolume();
};
/**
 * Seek slider
 */
const seekTo = throttle(() => {
  clearInterval(timeout);
  let seekto = currentTrack.value.duration * (sliderValue.value / 100);
  currentTrack.value.currentTime = seekto;
  tick();
  if (sliderValue.value === 100 && !isRepeating.value) {
    pauseTrack();
  }
  if (!isPlaying.value) {
    clearInterval(timeout);
  }
}, 50);
const updateSliderValueAndDurations = () => {
  if (!isNaN(currentTrack.value?.duration)) {
    sliderValue.value =
      currentTrack.value.currentTime * (100 / currentTrack.value.duration);
    progressBar.value.value = sliderValue.value;
    currentDuration.value = store.formatTime(currentTrack.value?.currentTime);
    duration.value = store.formatTime(currentTrack.value?.duration);
  }
};
const tick = () => {
  updateSliderValueAndDurations();
  timeout = setTimeout(tick, 1000);

  /**
   * if track end, reset
   */
  if (currentTrack.value?.ended && !isRepeating.value) {
    if (store.getTrackIndex() === store.filteredData.length - 1) {
      isPlaying.value = false;
      currentDuration.value = "00:00";
      sliderValue.value = 0;
      progressBar.value.value = 0;
    } else {
      store.loadNextOrPreviousTrack("next");
    }
  }
};

const playFromStart = () => {
  if (isPlaying.value) {
    clearInterval(timeout);
    isPlaying.value = false;

    currentTrack.value.load();
    setTimeout(() => {
      isPlaying.value = true;
    }, 200);
  } else {
    clearInterval(timeout);
    isPlaying.value = false;

    currentTrack.value.load();
    currentDuration.value = "00:00";
    sliderValue.value = 0;
    progressBar.value.value = 0;
  }
};

/**
 * watch new data in player
 */

watch(loadData, () => {
  playFromStart();
});

// watch if plaing or not

watch(isPlaying, () => {
  if (isPlaying.value === false) {
    pauseTrack();
  } else if (isPlaying.value === true) {
    playTrack();
  }
});
</script>

<style scoped>
.fade-leave-active,
.disapear-leave-active {
  transition: all 0.1s ease-in-out;
}
.fade-enter-active,
.disapear-enter-active {
  transition: all 0.5s ease-in-out;
}
.fade-leave-to,
.fade-enter-from {
  transform: translateX(3rem);
  opacity: 0;
}
.disapear-enter-from,
.disapear-leave-to {
  transform: translateX(-3rem);
  opacity: 0;
}
</style>
