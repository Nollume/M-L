<template>
  <div>
    <Transition name="disapear">
      <div v-show="store.showLinks" class="flex gap-4 items-center">
        <button title="Previous"><IconsNext class="rotate-180" /></button>
        <button
          title="Play"
          v-if="!store.isPlaying"
          @click="play"
          class="rounded-full bg-stone-900 p-2 hover:text-orange-500 active:text-orange-500"
        >
          <IconsPlay />
        </button>
        <button
          v-else
          title="Pause"
          class="rounded-full bg-stone-900 p-2"
          @click="store.pauseTrack(currentTrack, timeout)"
        >
          <IconsPause />
        </button>
        <button title="Next"><IconsNext /></button>
        <button @click="store.repeatTrack(currentTrack)" title="Repeat">
          <IconsRepeat :class="{ 'text-orange-600': store.isRepeating }" />
        </button>

        <div class="flex gap-2 items-center relative">
          <button @click="volumeOn" v-if="volume == 0">
            <IconsMute />
          </button>
          <button @click="muteVolume" v-else-if="volume >= 1 && volume < 75">
            <IconsVolumeLow />
          </button>
          <button @click="muteVolume" v-else>
            <IconsVolumeHigh />
          </button>
          <div
            v-show="store.openNav"
            class="flex items-center absolute bottom-full invisible"
          >
            <input
              class="range-inputs w-10 z-50"
              @input="store.setVolume(volume, progressBarVolume, currentTrack)"
              v-model="volume"
              ref="volumeInput"
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

          <div class="text-xs w-3 hidden">
            {{ volume }}
          </div>
        </div>

        <button v-if="!store.openNav" @click="store.openNavigation">
          <IconsExpand />
        </button>
        <button v-if="store.openNav" @click="store.openNavigation">
          <IconsMinimalize />
        </button>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "~/stores/store";

const store = useStore();
const volume = ref(100);
const progressBarVolume = ref<HTMLProgressElement>(null);
const volumeInput = ref<HTMLInputElement>(null);

interface OptionProps {
  currentTrack: HTMLAudioElement;
  timeout: ReturnType<typeof setTimeout>;
  tick?: () => void;
}
const props = defineProps<OptionProps>();

const muteVolume = () => {
  store.mute(volume.value, progressBarVolume.value, props.currentTrack);
  volume.value = 0;
};
const volumeOn = () => {
  volume.value = store.previousVolume;
  store.setVolume(volume.value, progressBarVolume.value, props.currentTrack);
};
const play = () => {
  store.playTrack(props.currentTrack);
  props.tick();
};
</script>

<style scoped>
.disapear-leave-active {
  transition: all 0.1s ease-in-out;
}

.disapear-enter-active {
  transition: all 0.5s ease-in-out;
}

.disapear-enter-from,
.disapear-leave-to {
  transform: translateX(-3rem);
  opacity: 0;
}
</style>
