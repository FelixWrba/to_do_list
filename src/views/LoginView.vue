<template>
  <header class="bg-green-500 text-white p-2 text-2xl sticky w-full top-0 shadow flex items-center gap-2 z-20">
    <router-link to="/home" aria-label="Return to to-do list" title="Return to to-do list">
      <ArrowLeftIcon class="size-6 cursor-pointer" />
    </router-link>

    <h1 class="flex-1">Login</h1>
  </header>

  <main class="h-screen flex items-center justify-center p-4 bg-gray-50">

    <form @submit.prevent="login" class="max-w-sm rounded shadow p-4 w-full flex flex-col gap-4 bg-white"
      v-if="!authStore.user">
      <!-- TITLE -->
      <h2 class="text-2xl font-semibold">Log in to <span class="text-green-500">myTasks</span> <u
          class="text-green-300">online</u></h2>

      <!-- FORM -->
      <TextField label="E-mail" :max-length="254" v-model="formData.email" required autocomplete="email" type="email" />
      <TextField label="Password" :max-length="16" v-model="formData.password" type="password"
        autocomplete="current-password" required />
      <button type="submit" class="btn flex items-center justify-center gap-2"
        :disabled="loginState === 'process' || isFormInvalid">
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

    <div v-if="authStore.user" class="max-w-sm rounded shadow p-4 w-full flex flex-col gap-4 bg-white">
      <h2 class="text-2xl font-semibold">Log out of <span class="text-green-500">myTasks</span> <u
          class="text-green-300">online</u></h2>
      <div class="flex gap-2">
        <button class="btn" @click="authStore.signOut()">Log out</button>
        <router-link to="/home" class="btn fade text-center">Return to list</router-link>
      </div>
    </div>

  </main>

  <Footer />
</template>

<script setup>
import Footer from '@/components/Footer.vue';
import TextField from '@/components/TextField.vue';
import { ArrowLeftIcon } from '@heroicons/vue/24/solid';
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { supabase } from '@/utils/supabase';
import { useAuthStore } from '@/stores/authStore';

const router = useRouter();
const authStore = useAuthStore();

const formData = ref({
  email: '',
  password: ''
});
const loginState = ref(null);
const errorMessage = ref(null);
const isFormInvalid = ref(true);

async function login() {
  loginState.value = 'process';

  const { data, error } = await supabase.auth.signInWithPassword({ ...formData.value });

  if (error) {
    errorMessage.value = 'Wrong e-mail or password.';
    loginState.value = 'fail';
    isFormInvalid.value = true;

    console.error(error);

    return;
  }

  if(!authStore.hasAccount) {
    authStore.setHasAccount(true);
  }

  authStore.setUser(data.user);
  router.push('/home');
}

// validate form
watch(formData.value, (newData) => {
  if (!newData.email || !newData.password) {
    isFormInvalid.value = true;
    return;
  }
  if (!newData.email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
    isFormInvalid.value = true;
    return;
  }
  if (!newData.password.match(/^[A-Za-z0-9!@#$%^&*()\-_=+[\]{};:'",.<>/?\\|`~]{6,16}$/)) {
    isFormInvalid.value = true;
    return;
  }
  isFormInvalid.value = false;
})
</script>
