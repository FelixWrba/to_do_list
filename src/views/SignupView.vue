<template>
  <header class="bg-green-500 text-white p-2 text-2xl sticky w-full top-0 shadow flex items-center gap-2 z-20">
    <router-link to="/home" aria-label="Return to to-do list" title="Return to to-do list">
      <ArrowLeftIcon class="size-6 cursor-pointer" />
    </router-link>

    <h1 class="flex-1">Sign up</h1>
  </header>

  <main class="h-screen flex items-center justify-center p-4 bg-gray-50">

    <form @submit.prevent="createAccount" class="max-w-sm rounded shadow p-4 w-full flex flex-col gap-4 bg-white"
      v-if="!authStore.hasAccount">
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
        :disabled="signInState === 'process' || signInState === 'success' || isFormInvalid">
        <span class="size-4 border-2 inline-block rounded-full border-b-transparent animate-spin"
          v-if="signInState === 'process'"></span>
        <span>Create an account 🚀</span>
      </button>

      <!-- SUCCESS -->
      <div class="text-green-600 bg-green-50 p-2 rounded" v-if="signInState === 'success'">
        <h3 class="font-semibold">Your account was created successfully.</h3>
        <p>Please check your e-mail inbox and confirm your e-mail address.</p>
      </div>
      <!-- FAIL -->
      <p class="text-sm text-red-600 bg-red-100 p-2 rounded" v-if="signInState === 'fail'">
        <b>Failed to create your account:</b> {{ errorMessage }}
      </p>
      <!-- INFO -->
      <p class="text-sm text-gray-600">
        Already have an account? <router-link to="/account/login" class="underline">Log in</router-link>
      </p>
    </form>

    <div v-if="authStore.hasAccount" class="max-w-sm rounded shadow p-4 w-full flex flex-col gap-4 bg-white">
      <h2 class="text-2xl font-semibold">Switch to a local Account for <span class="text-green-500">myTasks</span> <u
          class="text-green-300">online</u></h2>
      <p>By using a local Account, your tasks will be stored on your device.</p>
      <div class="flex gap-2">
        <button class="btn" @click="createLocalAccount">Use a local Account</button>
        <router-link class="btn fade text-center" to="/account/login">Log in</router-link>
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
import { supabase } from '@/utils/supabase';
import { useAuthStore } from '@/stores/authStore';
import { useTodoStore } from '@/stores/todoStore';

const authStore = useAuthStore();
const todoStore = useTodoStore();

const formData = ref({
  email: '',
  password: '',
});
const signInState = ref(null);
const errorMessage = ref(null);
const isFormInvalid = ref(true);

async function createAccount() {
  signInState.value = 'process';

  const { data, error } = await supabase.auth.signUp({ ...formData.value });

  if (error) {
    signInState.value = 'fail';
    errorMessage.value = 'Invalid E-mail or password.';
    isFormInvalid.value = true;
    console.error(error);
  }
  else {
    signInState.value = 'success';
    authStore.setUser(data.user);
    authStore.setHasAccount(true);

    if (todoStore.todos.length < 1) {
      supabase
        .from('tasks')
        .insert(
          todoStore.todos.map((todo) => { return { ...todo, user_id: authStore.user.id }; })
        );
    }
  }
}

function createLocalAccount() {
  if (window.confirm('(!) By switching to a local Account, you tasks will be stored on your device. If you reset or loose your device, you will not be able to access your tasks anymore. Do you still want to continue?')) {
    authStore.setHasAccount(false);
    authStore.setUser(null);
  }
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
});
</script>
