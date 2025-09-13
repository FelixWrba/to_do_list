<template>
  <header class="bg-green-500 text-white p-2 text-2xl sticky w-full shadow flex items-center gap-1 top-0 z-40">
    <svg xmlns="http://www.w3.org/2000/svg" fill="#FFFFFF" height="28px" viewBox="0 -960 960 960" width="28px">
      <path
        d="M120-320v-80h320v80H120Zm0-160v-80h480v80H120Zm0-160v-80h480v80H120Zm534 440L512-342l56-56 86 84 170-170 56 58-226 226Z" />
    </svg>
    <h1 class="flex-1">myTasks <u class="text-green-200">online</u></h1>
    <router-link to="/account" aria-label="View Account" title="View Account">
      <UserCircleIcon class="size-8 cursor-pointer" />
    </router-link>
  </header>
</template>

<script setup>
import { UserCircleIcon } from '@heroicons/vue/24/solid';
</script>
