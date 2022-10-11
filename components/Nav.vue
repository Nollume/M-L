<template>
  <div class="fixed w-full h-12 flex justify-between bg-stone-800 px-4">
    <div>
      <img
        class="w-auto h-full"
        src="~/assets/img/mark-lukas-logo-white-transparent.png"
        alt="Mark & Lukas Logo"
      />
    </div>
    <nav class="self-center">
      <ul class="flex gap-2 py-1">
        <li><NuxtLink to="/">Home</NuxtLink></li>
        <li><NuxtLink to="/about">About</NuxtLink></li>
        <li><NuxtLink to="/music">Music</NuxtLink></li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
