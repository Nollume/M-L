<template>
  <div
    class="cover pt-12 relative top-0 w-full z-40 after:absolute before:absolute"
  >
    <picture>
      <source srcset="~/assets/img/SC4.jpg" media="(min-width: 640px)" />
      <img src="~/assets/img/FB4 .jpg" alt="" />
    </picture>
    <NavSociallinks
      class="hidden absolute top-1/2 -translate-y-1/2 right-4 lg:block 2xl:right-8"
    />
    <div
      class="absolute h-6 w-full bottom-0 bg-gradient-to-t from-stone-900 to-transparent"
    ></div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
