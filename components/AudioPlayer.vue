<template>
  <div
    class="px-4 fixed bottom-0 h-16 w-full bg-stone-800 flex items-center justify-between"
  >
    <div class="flex gap-4 items-center">
      <button><IconsNext class="rotate-180" /></button>
      <button><IconsPlay /></button>
      <!-- <button><IconsPause /></button> -->
      <button><IconsNext /></button>
      <button><IconsRepeat /></button>
    </div>
    <div class="flex items-center gap-2">
      <input class="cursor-pointer" type="range" name="range" id="range" />
      <p>0:30</p>
    </div>
    <div class="flex items-center">
      <button><IconsVolumeHigh /></button>
      <!-- <button><IconsVolumeLow /></button>
      <button><IconsMute /></button> -->
    </div>
    <div class="pl-4 h-full w-1/2 flex flex-row-reverse items-center gap-4">
      <div class="h-full py-0.5">
        <img
          class="h-full w-auto"
          src="~/assets/img/mark-lukas-logo-white-transparent.png"
          alt=""
        />
      </div>
      <div>
        <h4>Mark & Lukas</h4>
        <p class="text-sm">Life is About Moments</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
