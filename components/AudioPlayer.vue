<template>
  <div
    class="audio-player-container"
    :class="store.openNav ? 'h-1/2 gap-1 after:scale-x-100' : 'h-16 gap-0'"
  >
    <Transition name="disapear">
      <div v-show="store.showLinks" class="order-2 flex gap-4 items-center">
        <button title="Previous"><IconsNext class="rotate-180" /></button>
        <button
          title="Play"
          v-if="!isPlaying"
          @click="playTrack"
          class="rounded-full bg-stone-900 p-2 hover:text-orange-500 active:text-orange-500"
        >
          <IconsPlay />
        </button>
        <button
          v-else
          title="Pause"
          class="rounded-full bg-stone-900 p-2"
          @click="pauseTrack"
        >
          <IconsPause />
        </button>
        <button title="Next"><IconsNext /></button>
        <button @click="repeatTrack" title="Repeat">
          <IconsRepeat :class="{ 'text-orange-600': isRepeating }" />
        </button>
        <div class="flex gap-2 items-center relative">
          <button @click="turnOnVolume" v-if="volume == 0">
            <IconsMute />
          </button>
          <button @click="mute" v-else-if="volume >= 1 && volume < 75">
            <IconsVolumeLow />
          </button>
          <button @click="mute" v-else><IconsVolumeHigh /></button>
          <div
            v-show="store.openNav"
            class="flex items-center absolute bottom-full invisible"
          >
            <input
              class="range-inputs w-10 z-50"
              @input="setVolume"
              v-model="volume"
              min="0"
              max="100"
              type="range"
              name="volume"
            />
            <progress
              class="progress-bar w-10"
              min="0"
              max="100"
              value="100"
              ref="progressBarVolume"
            ></progress>
          </div>
          <div class="text-xs w-3 hidden">{{ volume }}</div>
        </div>
        <button v-if="!store.openNav" @click="store.openNavigation">
          <IconsExpand />
        </button>
        <button v-if="store.openNav" @click="store.openNavigation">
          <IconsMinimalize />
        </button>
      </div>
    </Transition>
    <Transition name="fade">
      <div v-show="store.showLinks" class="order-3 flex items-center gap-2">
        <div>
          <p class="text-xs w-8">{{ currentDuration }}</p>
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
          <p class="text-xs w-8">{{ duration }}</p>
        </div>
      </div>
    </Transition>
    <Transition name="fadeIn">
      <div
        v-if="store.openNav"
        class="order-1 flex items-center justify-evenly gap-2"
      >
        <div class="py-0.5 flex-[1]">
          <img
            class="w-20 h-auto border-2 border-orange-600"
            src="~/assets/img/mark-lukas-logo-white-transparent.png"
            alt=""
          />
        </div>
        <div class="flex-[2]">
          <h4 class="whitespace-nowrap pb-0.5 border-b border-orange-600">
            Mark & Lukas
          </h4>
          <p class="text-xs pt-1 inline">{{ stringiring.substring(0, 50) }}</p>
          <span v-if="stringiring.length > 50">...</span>
        </div>
      </div>
    </Transition>
    <div>
      <audio ref="currentTrack" class="invisible">
        <source
          src="~/assets/audio/Mark & Lukas - Dreams, Where I'm Fading [Emergent Shores].mp3"
          type="audio/mp3"
        />
      </audio>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "~/stores/store";
import { formatTime } from "~/functions";
import throttle from "lodash.throttle";

const stringiring = ref("Dreams, Where I'm Fading (Original mix)");

const currentTrack = ref<HTMLAudioElement>(null);
const progressBar = ref<HTMLProgressElement>(null);
const progressBarVolume = ref<HTMLProgressElement>(null);

const isPlaying = ref(false);
const isRepeating = ref(false);
let duration = ref<string>("00:00");
let currentDuration = ref<string>("00:00");
const volume = ref(100);
const previousVolume = ref(100);
const sliderValue = ref(0);

let timeout: ReturnType<typeof setTimeout>;

const store = useStore();

const playTrack = () => {
  currentTrack.value.play();
  isPlaying.value = true;
  duration.value = formatTime(currentTrack.value?.duration);
  tick();
};
const pauseTrack = () => {
  currentTrack.value.pause();
  isPlaying.value = false;
  clearInterval(timeout);
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
    currentDuration.value = "00:00";
    sliderValue.value = 0;
    progressBar.value.value = 0;
  }

  if (!isPlaying.value) {
    clearInterval(timeout);
  }
}, 50);

const updateSliderValueAndCurrentTime = () => {
  if (!isNaN(currentTrack.value?.duration)) {
    sliderValue.value =
      currentTrack.value.currentTime * (100 / currentTrack.value.duration);
    progressBar.value.value = sliderValue.value;
    currentDuration.value = formatTime(currentTrack.value?.currentTime);
  }
};
const tick = () => {
  updateSliderValueAndCurrentTime();

  timeout = setTimeout(tick, 1000);

  /**
   * if track end, reset
   */
  if (currentTrack.value?.ended && !isRepeating.value) {
    isPlaying.value = false;
    currentDuration.value = "00:00";
    sliderValue.value = 0;
    progressBar.value.value = 0;

    clearInterval(timeout);
  }
};
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
<!-- currentTrack.value.load(); //reset audio element to 00:00-->
