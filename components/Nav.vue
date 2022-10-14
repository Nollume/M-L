<template>
  <div
    class="fixed w-full h-1/2 bg-stone-800 px-4 py-2 z-50 border-b border-orange-600"
  >
    <div class="flex flex-col h-full">
      <div class="relative flex">
        <NuxtLink to="/" class="absolute -top-[60%] -left-[0.7rem]">
          <img
            class="w-16 h-auto"
            src="~/assets/img/mark-lukas-logo-white-transparent.png"
            alt="Mark & Lukas Logo"
          />
        </NuxtLink>
        <div class="menu menu-cross">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <nav class="my-auto">
        <ul class="flex flex-col items-center gap-2 py-1">
          <li>
            <NuxtLink to="/" class="text-xl duration-300 ease-in-out p-1"
              >Home</NuxtLink
            >
          </li>
          <li>
            <NuxtLink to="/about" class="text-xl duration-300 ease-in-out p-1"
              >About</NuxtLink
            >
          </li>
          <li>
            <NuxtLink to="/music" class="text-xl duration-300 ease-in-out p-1"
              >Music</NuxtLink
            >
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
