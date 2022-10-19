<template>
  <div>
    <Transition name="fade">
      <div v-show="store.showLinks" class="flex items-center gap-2">
        <div>
          <p class="text-xs w-8">{{ store.currentDuration }}</p>
        </div>
        <div class="flex items-center relative">
          <input
            class="range-inputs w-48 z-50"
            @input="seekTo()"
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
          <p class="text-xs w-8">{{ store.duration }}</p>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "~/stores/store";

interface OptionProps {
  currentTrack: HTMLAudioElement;
}
const props = defineProps<OptionProps>();
const emits = defineEmits(["sendTimeout", "sendTick"]);
let timeout: ReturnType<typeof setTimeout>;

const sliderValue = ref(0);
const progressBar = ref<HTMLProgressElement>(null);

const store = useStore();

onMounted(() => {
  emits("sendTimeout", timeout);
  emits("sendTick", tick);
});

const seekTo = () => {
  clearInterval(timeout);
  let seekto = props.currentTrack.duration * (sliderValue.value / 100);
  props.currentTrack.currentTime = seekto;

  tick();

  if (sliderValue.value === 100 && !store.isRepeating) {
    store.pauseTrack(props.currentTrack, timeout);
    store.currentDuration = "00:00";
    sliderValue.value = 0;
    progressBar.value.value = 0;
  }

  if (!store.isPlaying) {
    clearInterval(timeout);
  }
};

const updateSliderValueAndCurrentTime = () => {
  if (!isNaN(props.currentTrack?.duration)) {
    sliderValue.value =
      props.currentTrack.currentTime * (100 / props.currentTrack.duration);
    progressBar.value.value = sliderValue.value;
    store.currentDuration = store.formatTime(props.currentTrack?.currentTime);
  }
};
const tick = () => {
  updateSliderValueAndCurrentTime();
  timeout = setTimeout(tick, 1000);

  /**
   * if track end, reset
   */
  if (props.currentTrack?.ended && !store.isRepeating) {
    store.isPlaying = false;
    store.currentDuration = "00:00";
    sliderValue.value = 0;
    progressBar.value.value = 0;

    clearInterval(timeout);
  }
  console.log(timeout);
};

</script>

<style scoped>
.fade-leave-active {
  transition: all 0.1s ease-in-out;
}
.fade-enter-active {
  transition: all 0.5s ease-in-out;
}

.fade-leave-to,
.fade-enter-from {
  transform: translateX(3rem);
  opacity: 0;
}
</style>
