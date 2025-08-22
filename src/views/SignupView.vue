<template>
  <header class="bg-green-500 text-white p-2 text-2xl sticky w-full top-0 shadow flex items-center gap-2 z-20">
    <router-link to="/home" aria-label="Return to to-do list" title="Return to to-do list">
      <ArrowLeftIcon class="size-6 cursor-pointer" />
    </router-link>

    <h1 class="flex-1">Sign up</h1>
  </header>

  <main class="h-screen flex items-center justify-center p-4 bg-gray-50">

    <form @submit.prevent="createAccount" class="max-w-sm rounded shadow p-4 w-full flex flex-col gap-4 bg-white">
      <!-- INTRO SECTION -->
      <h2 class="text-2xl font-semibold">
        Welcome to <span
          class="bg-gradient-to-br from-green-500 to-blue-500 text-transparent bg-clip-text">myTasks:</span> <u
          class="text-blue-500 opacity-50">online</u>
      </h2>
      <p>Please enter your email and a secure password to create an account:</p>

      <!-- SIGN IN FORM -->
      <TextField label="E-mail" :max-length="254" v-model="formData.email" required autocomplete="email" type="email" />
      <TextField label="Password" :max-length="16" v-model="formData.password" type="password"
        autocomplete="new-password" required />
      <button type="submit" class="btn flex items-center justify-center gap-2"
        :disabled="signInState === 'process' || signInState === 'success'">
        <span class="size-4 border-2 inline-block rounded-full border-b-transparent animate-spin"
          v-if="signInState === 'process'"></span>
        <span>Create an account 🚀</span>
      </button>

      <!-- SUCCESS -->
      <p class="text-sm text-green-600 bg-green-100 p-2 rounded" v-if="signInState === 'success'">
        Account created successfully. <router-link to="/account/login" class="underline">Log in.</router-link>
      </p>
      <!-- FAIL -->
      <p class="text-sm text-red-600 bg-red-100 p-2 rounded" v-if="signInState === 'fail'">
        <b>Failed to create your account:</b> {{ errorMessage }}
      </p>
      <!-- INFO -->
      <p class="text-sm text-gray-600">
        Already have an account? <router-link to="/account/login" class="underline">Log in</router-link>
      </p>
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
  password: '',
});
const signInState = ref(null);
const errorMessage = ref(null);

function createAccount() {
  signInState.value = 'process';
  errorMessage.value = 'some error msg';
  setTimeout(() => signInState.value = 'fail', 1500);
}
</script>
