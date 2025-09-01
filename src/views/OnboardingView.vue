<template>
  <main :class="`p-8 max-w-screen min-h-screen overflow-x-hidden ${hasLoaded ? '' : 'overflow-y-hidden'}`">

    <div :class="[!hasLoaded ? 'fade-in' : '', 'flex gap-2 mb-8 dots m-auto w-fit']">
      <div v-for="page in pages"
        :class="page == route.params.page || (!route.params.page && page == 1) ? 'current' : ''" :key="page"></div>
    </div>

    <transition :name="direction === 'forward' ? 'slide-left' : 'slide-right'" mode="out-in">

      <section v-if="route.params.page == 1 || !route.params.page" class="flex flex-col items-center" :key="1">
        <div :class="!hasLoaded ? 'fly-in-1 ' : ''">
          <img src="/img/app_icon.webp" alt="App icon of to-do app" :class="['size-32 png-shadow']">
        </div>

        <h1 :class="[!hasLoaded ? 'fly-in-2' : '', 'text-2xl font-semibold my-4']">Welcome to <span
            class="bg-gradient-to-br from-green-500 to-blue-500 text-transparent bg-clip-text">myTasks:</span> <u
            class="text-blue-500 opacity-50">online</u></h1>

        <p :class="!hasLoaded ? 'fly-in-3' : ''">This simple, yet powerful app helps you organize your tasks
          effortlessly in one place:</p>

        <ul :class="!hasLoaded ? 'fly-in-3 my-8' : 'my-8'">
          <li>✅ Check off to-dos</li>
          <li>📝 Manage your tasks</li>
          <li>💻 Sync your tasks across all of your devices</li>
          <li>📅 Plan your entire week</li>
        </ul>

        <router-link to="/onboarding/2" :class="!hasLoaded ? 'fade-in btn full' : 'btn full'">Get started</router-link>
        <button @click="enterApp" :class="!hasLoaded ? 'fade-in-sm text-gray-400 mt-4 underline text-sm' : 'text-gray-400 mt-4 underline text-sm'">Skip Tutorial</button>
      </section>

      <section v-else-if="route.params.page == 2" class="flex flex-col items-center" :key="2">
        <img src="/img/add_circle.webp" alt="Plus circle icon" class="size-28">

        <h1 class="text-2xl font-semibold my-4">How to <span class="text-green-500">create a to-do</span></h1>

        <ol>
          <li>📝 Enter your task in the bottom input field.</li>
          <li>✅ Click the green button.</li>
        </ol>

        <i class="mt-4 text-gray-600">or</i>

        <ol class="mt-4 mb-8">
          <li><code>1.</code> Click on the ➕ on the bottom right</li>
          <li><code>2.</code> Fill in the form 📄</li>
          <li><code>3.</code> Press the add ✅ button</li>
        </ol>

        <router-link to="/onboarding/3" class="btn full">Continue</router-link>
        <router-link to="/onboarding/1" class="btn full fade mt-4">Previous</router-link>
      </section>

      <section v-else-if="route.params.page == 3" class="flex flex-col items-center" :key="3">
        <img src="/img/edit.webp" alt="Pen icon" class="size-28">

        <h1 class="text-2xl font-semibold my-4"> <span class="text-green-500">Managing</span> your list</h1>

        <ul class="mt-4 mb-8">
          <li>📝 Press the pen to edit a to-do.</li>
          <li>🗑 Click the trash bin to delete a task.</li>
          <li>✅ Check the box after completing a to-do.</li>
          <li>🌐 Manage your account by clicking your profile</li>
        </ul>

        <button @click="enterApp" class="btn full">Enter the app 🚀</button>
        <router-link to="/onboarding/2" class="btn full fade mt-4">Previous</router-link>
      </section>

    </transition>

  </main>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router';

const route = useRoute();
const router = useRouter();

const pages = [1, 2, 3];

const hasLoaded = ref(false);
setTimeout(() => hasLoaded.value = true, 3000);

function enterApp() {


  router.push('/home');
}

const currentPage = computed(() => parseInt(route.params.page || 1))
const previousPage = ref(currentPage.value)
const direction = ref('forward')

onBeforeRouteUpdate((to, from, next) => {
  const toPage = parseInt(to.params.page || 1);
  const fromPage = parseInt(from.params.page || 1);

  direction.value = toPage > fromPage ? 'forward' : 'backward';
  previousPage.value = fromPage;

  next();
})
</script>

<style>
.png-shadow {
  filter: drop-shadow(0px 12px 12px #dbdbdb);
}

.dots div {
  width: 0.5em;
  height: 0.5em;
  border-radius: 50%;
  background-color: #d1d5db;
  transition: all 600ms;
}

.dots div.current {
  background-color: #6b7280;
}


.slide-right-leave-active,

.slide-left-leave-active {
  transition: all .3s ease-in;
}

.slide-right-enter-active,
.slide-left-enter-active {
  transition: all .3s ease-out;
}

.slide-left-enter-from,
.slide-right-leave-to {
  opacity: 0;
  transform: translateX(100px);
}

.slide-left-leave-to,
.slide-right-enter-from {
  opacity: 0;
  transform: translateX(-100px);
}

.fly-in-1 {
  animation: fly-in 1s 0.4s both;
}

.fly-in-2 {
  animation: fly-in 1s 0.6s both;
}

.fly-in-3 {
  animation: fly-in 1s 0.8s both;
}

.fade-in {
  animation: fade-in 1s 1.8s both;
}

.fade-in-sm {
  animation: fade-in-sm 1s 2s both;
}

@keyframes fly-in {
  0% {
    opacity: 0;
    transform: scale(.5) translateY(50vh);
    filter: blur(16px);
  }
}

@keyframes fade-in {
  0% {
    transform: scale(1.5);
    opacity: 0;
    filter: blur(8px);
  }
}

@keyframes fade-in-sm {
  0% {
    opacity: 0;
  }
}
</style>
