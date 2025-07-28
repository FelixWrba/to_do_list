<template>
  <main class="p-8">

    <div class="flex gap-2 mb-8 dots m-auto w-fit">
      <div v-for="page in pages"
        :class="page == route.params.page || (!route.params.page && page == 1) ? 'current' : ''" :key="page"></div>
    </div>

    <transition name="slide" mode="out-in">

      <section v-if="route.params.page == 1 || !route.params.page" class="flex flex-col items-center">
        <img src="/icons/icon-512.png" alt="App icon of to-do app" class="size-32 png-shadow">

        <h1 class="text-2xl font-semibold my-4">Welcome to <span class="text-green-500">To-do app</span></h1>

        <p>This app helps you organize your tasks effortlessly in one place:</p>

        <ul class="my-8">
          <li>✅ Check off to-dos</li>
          <li>📝 Manage your tasks</li>
          <li>💻 Sync your tasks across all of your devices</li>
          <li>📅 Plan your entire week</li>
        </ul>

        <router-link to="/onboarding/2" class="btn full">Get started</router-link>
      </section>

      <section v-else-if="route.params.page == 2" class="flex flex-col items-center">
        <img src="/icons/icon-512.png" alt="App icon of to-do app" class="size-32 png-shadow">

        <h1 class="text-2xl font-semibold my-4">How to <span class="text-green-500">create a to-do</span></h1>

        <p>Enter your task in the text field at the bottom and press ✅.</p>

        <i class="mt-4 text-gray-600">or</i>

        <ol class="mt-4 mb-8">
          <li>1. Click on the plus+ on the bottom right</li>
          <li>2. Fill in the form📄</li>
          <li>3. Press the Add✅ button</li>
        </ol>

        <router-link to="/onboarding/3" class="btn full">Next</router-link>
        <router-link to="/onboarding/1" class="btn full fade mt-4">Back</router-link>
      </section>

      <section v-else-if="route.params.page == 3" class="flex flex-col items-center">
        <img src="/icons/icon-512.png" alt="App icon of to-do app" class="size-32 png-shadow">

        <h1 class="text-2xl font-semibold my-4">How to <span class="text-green-500">manage your list</span></h1>

        <ul class="mt-4 mb-8">
          <li>📝 Press the pen icon to edit your selected to-do.</li>
          <li>🗑 Click the trash bin to delete a task.</li>
          <li>✅ Check the the checkbox to check your to-do off.</li>
        </ul>

        <button @click="enterApp" class="btn full">Enter the app 🚀</button>
        <router-link to="/onboarding/2" class="btn full fade mt-4">Back</router-link>
      </section>

    </transition>

  </main>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const pages = [1, 2, 3];

function enterApp() {
  localStorage.setItem('boarded', 'true');

  router.push('/');
}
</script>

<style>
@import 'tailwindcss';

.png-shadow {
  filter: drop-shadow(0px 12px 12px #dbdbdb);
}

.dots div {
  width: 0.5em;
  height: 0.5em;
  border-radius: 50%;
  background-color: #d1d5db;
  transition: all 300ms;
}

.dots div.current {
  background-color: #6b7280;
}
</style>
