<template>
  <header class="bg-green-500 text-white p-2 text-2xl sticky w-full shadow flex items-center gap-2 top-0">
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
    <section class="flex bg-red-100 mx-4 rounded p-2 gap-2 items-center text-red-900" v-if="!isLoggedIn">
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

    <section class="m-4">
      <h2 class="text-xl font-semibold">Do you like the app?</h2>
      <p>Recommend myTasks to friends: <button class="btn" @click="shareApp">Share your experience</button></p>
    </section>

  </main>

  <Footer />
</template>

<script setup>
import Footer from '@/components/Footer.vue';
import { ArrowLeftIcon, UserCircleIcon } from '@heroicons/vue/24/solid';
import { InformationCircleIcon } from '@heroicons/vue/24/outline';
import { ref } from 'vue';

const isLoggedIn = ref(false);

function shareApp() {
  if (!navigator.canShare) {
    alert('Tell your friends about myTasks: online!');
    return;
  }

  const shareTexts = {
    en: `🚀 I've been using this super simple to-do app and it's a game-changer!
✅ Add & check off tasks in seconds
📅 Plan your week with ease
💻 Syncs across all devices
🔒 100% free & private
Try it out and stay on top of your day: mytasksonline.netlify.app`,
    de: `🚀 Ich nutzte in letzter Zeit diese supereinfache To-Do-App und sie ist ein echter Game-Changer!
✅ Erstellen und Abhaken von Aufgaben in Sekunden
📅 Plane Deine Woche mit Leichtigkeit
💻 Synchronisiere To-Dos über alle Geräte
🔒 100% kostenlos & sicher
Probier es aus und behalte den Überblick über Deinen Tag - auf mytasksonline.netlify.app`,
  };
  const userLang = navigator.language.includes('de') ? 'de' : 'en';

  navigator
    .share({ text: shareTexts[userLang] })
    .catch(err => {
      console.error(err);
    });
}
</script>
