<template>
  <header class="bg-green-500 text-white p-2 text-2xl sticky w-full top-0 shadow flex items-center gap-2">
    <router-link to="/" aria-label="Return to to-do list" title="Return to to-do list">
      <ArrowLeftIcon class="size-6 cursor-pointer" />
    </router-link>

    <h1 class="flex-1">Sign up</h1>
  </header>

  <main class="h-screen flex items-center justify-center p-4 bg-gray-50">

    <form @submit.prevent="() => console.log('login')" class="max-w-sm rounded shadow p-4 w-full flex flex-col gap-4 bg-white">
      <h2 class="text-2xl font-semibold">Welcome to <span class="text-green-500">To-do list</span></h2>
      <p>Please enter your email and a secure password to create an account:</p>

      <TextField label="E-mail" :max-length="254" v-model="formData.email" required autocomplete="email" type="email" />
      <TextField label="Password" :max-length="16" v-model="formData.password" type="password"
        autocomplete="new-password" required />

      <button type="submit" class="btn">Create an account 🚀</button>

      <p class="text-sm text-gray-600">Already have an account? <router-link to="/account/login" class="underline">Log in</router-link></p>
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
</script>
