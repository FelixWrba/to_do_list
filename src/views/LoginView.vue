<template>
  <header class="bg-green-500 text-white p-2 text-2xl sticky w-full top-0 shadow flex items-center gap-2 z-20">
    <router-link to="/home" aria-label="Return to to-do list" title="Return to to-do list">
      <ArrowLeftIcon class="size-6 cursor-pointer" />
    </router-link>

    <h1 class="flex-1">Login</h1>
  </header>

  <main class="h-screen flex items-center justify-center p-4 bg-gray-50">

    <form @submit.prevent="login" class="max-w-sm rounded shadow p-4 w-full flex flex-col gap-4 bg-white">
      <!-- TITLE -->
      <h2 class="text-2xl font-semibold">Log in to <span class="text-green-500">myTasks</span> <u
          class="text-green-300">online</u></h2>

      <!-- FORM -->
      <TextField label="E-mail" :max-length="254" v-model="formData.email" required autocomplete="email" type="email" />
      <TextField label="Password" :max-length="16" v-model="formData.password" type="password"
        autocomplete="current-password" required />
      <button type="submit" class="btn flex items-center justify-center gap-2"
        :disabled="loginState === 'process'">
        <span class="size-4 border-2 inline-block rounded-full border-b-transparent animate-spin"
          v-if="loginState === 'process'"></span>
        <span>Log in</span>
      </button>

      <!-- FAIL -->
      <p class="text-sm text-red-600 bg-red-100 p-2 rounded" v-if="loginState === 'fail'">
        <b>Failed to log in:</b> {{ errorMessage }}
      </p>
      <!-- INFO -->
      <p class="text-sm text-gray-600">No account yet? <router-link to="/account/signup" class="underline">Sign
          up</router-link></p>
    </form>

  </main>

  <Footer />
</template>

<script setup>
import Footer from '@/components/Footer.vue';
import TextField from '@/components/TextField.vue';
import { ArrowLeftIcon } from '@heroicons/vue/24/solid';
import { ref } from 'vue';

const formData = ref({
  email: '',
  password: ''
})
const loginState = ref(null);
const errorMessage = ref(null);

function login() {
  loginState.value = 'process';

  setTimeout(() => loginState.value = 'fail', 1000);
}
</script>
