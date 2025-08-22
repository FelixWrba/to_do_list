<template>
  <header class="bg-green-500 text-white p-2 text-2xl sticky w-full top-0 shadow flex items-center gap-2">
    <router-link to="/home" aria-label="Return to to-do list" title="Return to to-do list">
      <ArrowLeftIcon class="size-6 cursor-pointer" />
    </router-link>

    <h1 class="flex-1">Account</h1>
  </header>

  <main class="max-w-4xl m-auto pb-28 min-h-screen">
    <!-- ACCOUNT CARD -->
    <section class="flex items-center m-4 gap-2">
      <UserCircleIcon class="size-12 text-blue-500 shrink-0" />
      <div class="flex-1">
        <h1 class="text-2xl font-semibold">My Account</h1>
        <p class="text-sm text-gray-600" v-if="isLoggedIn">user@mail.com</p>
        <p class="text-sm text-gray-600" v-else>Local Account</p>
      </div>
      <button class="btn" v-if="isLoggedIn">Logout</button>
      <router-link to="/account/signup" class="btn" v-else>Sign up</router-link>
    </section>
    <!-- LOCAL ACCOUNT INFO -->
    <section class="flex bg-red-100 mx-4 rounded p-2 gap-2 items-center text-red-900"
      v-if="!isLoggedIn">
      <InformationCircleIcon class="size-8 text-red-500 shrink-0" />
      <div>
        <h2 class="font-semibold">You are using a local Account</h2>
        <p class="text-sm">Your tasks are currently only stored on your device. To sync your data across all of your
          devices,
          you must
          create an online account.</p>
        <div class="flex gap-2 mt-2">
          <router-link to="/account/signup" class="btn">Create an account</router-link>
          <router-link to="/account/login" class="btn fade">Log in</router-link>
        </div>
      </div>
    </section>

    <input type="checkbox" v-model="isLoggedIn">

  </main>

  <Footer />
</template>

<script setup>
import Footer from '@/components/Footer.vue';
import { ArrowLeftIcon, UserCircleIcon } from '@heroicons/vue/24/solid';
import { InformationCircleIcon } from '@heroicons/vue/24/outline';
import { ref } from 'vue';

const isLoggedIn = ref(false);
</script>
