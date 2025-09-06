<template>
  <main class="pt-12">
    <nav class="absolute top-0 right-0 flex gap-4 p-4 z-10 bg-white/50">
      <router-link to="/account/login" class="px-2 py-1 outline outline-gray-200 rounded">Login</router-link>
      <router-link to="/account/signup" class="px-2 py-1 outline outline-green-500 rounded bg-green-500 text-white">Sign
        up</router-link>
    </nav>
    <div class="text-2xl absolute top-0 left-0 p-4">
      <span class="text-green-600">myTasks</span> <u class="text-green-400">online</u>
    </div>

    <!-- Hero Section -->
    <header class="mt-24 text-center px-6 max-w-4xl mx-auto">
      <h1 class="text-4xl font-bold mb-4">
        <span class="bg-gradient-to-br from-green-500 to-blue-500 text-transparent bg-clip-text">myTasks:</span> <u
          class="text-blue-500 opacity-50">online</u> - Free To-Do List App for Work & Life
      </h1>
      <p class="text-lg text-gray-700 mb-6">
        Organize tasks, plan your week, and boost productivity with our simple yet powerful online task manager.
        Check off to-dos, sync tasks across devices, and stay in control — all for free.
      </p>
      <router-link to="/onboarding"
        class="py-2 px-8 rounded shadow bg-green-500 text-white font-bold text-xl flex gap-1 items-center w-fit m-auto group">Get
        Started For Free
        <ChevronRightIcon class="size-6 group-hover:translate-x-1 transition-all duration-500 stroke-1 stroke-white" />
      </router-link>

      <div class="flex justify-center mt-6 items-center">
        <StarIcon class="stroke-yellow-500 fill-yellow-300 size-5" />
        <StarIcon class="stroke-yellow-500 fill-yellow-300 size-5" />
        <StarIcon class="stroke-yellow-500 fill-yellow-300 size-5" />
        <StarIcon class="stroke-yellow-500 fill-yellow-300 size-5" />
        <StarIcon class="stroke-yellow-500 fill-yellow-300 size-5" />
        <p class="text-gray-700 ml-2 text-start">Trusted by dozens of people worldwide<sup>1</sup></p>
      </div>

    </header>

    <section class="mt-8 px-4">
      <img src="@/assets/img/main_screenshot.webp" alt="Image showcasing screenshots of the myTasks dashboard with task lists and dates taken on a phone, tablet and laptop."
        class="mx-auto max-w-4xl main-screenshot bg-gray-100 rounded">
    </section>

    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
      <path fill="#2b7fff" fill-opacity="1"
        d="M0,128L48,106.7C96,85,192,43,288,69.3C384,96,480,192,576,229.3C672,267,768,245,864,208C960,171,1056,117,1152,101.3C1248,85,1344,107,1392,117.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z">
      </path>
    </svg>
    <div class="text-white bg-gradient-to-b from-blue-500 to-green-500">

      <!-- Features -->
      <section class="px-6 mx-auto max-w-4xl -my-1">
        <h2 class="text-2xl font-semibold mb-6 text-blue-50">Why choose myTasks online?</h2>
        <ul class="grid md:grid-cols-2 gap-8">
          <li v-for="({ name, description }, index) in features" :key="index" class="bg-blue-50 rounded shadow p-2">
            <h3 class="font-bold text-lg text-blue-900">{{ name }}</h3>
            <p class="text-gray-600">{{ description }}</p>
          </li>
        </ul>
      </section>

    </div>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
      <path fill="#00c951" fill-opacity="1"
        d="M0,256L60,224C120,192,240,128,360,117.3C480,107,600,149,720,181.3C840,213,960,235,1080,224C1200,213,1320,171,1380,149.3L1440,128L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z">
      </path>
    </svg>

    <!-- Testimonials / Social Proof -->
    <section class="mt-16 px-6 mx-auto max-w-4xl text-center">
      <h2 class="text-2xl font-semibold mb-6">Loved by productive people worldwide</h2>
      <article v-for="({ msg, author }, i) in testimonials" :key="i" class="mb-12">
        <blockquote class="italic text-gray-700">
          „{{ msg }}“
        </blockquote>
        <p class="ml-2">{{ author }}</p>
      </article>
    </section>

    <!-- CTA Repeated -->
    <section
      class="mt-16 mx-4 sm:m-auto sm:max-w-md text-center flex flex-col items-center p-4 shadow rounded bg-gradient-to-br from-green-500 to-blue-500">
      <h2 class="text-2xl font-semibold text-white mb-1">Ready to organize your life?</h2>
      <p class="text-white opacity-70 text-sm mb-4">Manage your tasks for free with our simple To-Do App.</p>
      <a href="/onboarding" class="px-3 py-1 shadow rounded bg-white/70 text-blue-500 font-semibold">Start using
        myTasks</a>
    </section>

  </main>

  <section class="mt-16 px-6 mx-auto max-w-4xl text-sm text-gray-600">
    <ol>
      <li><sup>1</sup>The count is based on users who clicked on ENTER THE APP at /onboarding/3 and had neither an
        account nor any tasks saved. Stars are not based on ratings.</li>
    </ol>
  </section>

  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
    <path fill="#f1f5f9" fill-opacity="1"
      d="M0,288L120,266.7C240,245,480,203,720,202.7C960,203,1200,245,1320,266.7L1440,288L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z">
    </path>
  </svg>
  <Footer />
</template>

<script setup>
import Footer from '@/components/Footer.vue';
import { ChevronRightIcon, StarIcon } from '@heroicons/vue/24/solid';

const features = [
  {
    name: '✅ Simple To-Do List',
    description: 'Quickly add, check off, and manage tasks in one place.',
  },
  {
    name: '📅 Weekly Planning',
    description: 'Organize your entire week with calendar-style task management.',
  },
  {
    name: '💻 Sync Across Devices',
    description: 'Access your tasks anytime and online — on desktop, tablet, or mobile.',
  },
  {
    name: '📊 Progress Tracking',
    description: 'Visualize and share your productivity with stats and task completion rates.',
  },
  {
    name: '🔒 Secure & Free',
    description: 'Enjoy a free to-do list app with privacy and no hidden fees.',
  }
];

const testimonials = [
  {
    msg: "myTasks online has completely changed the way I plan my work and personal life. It's the best free task manager I've ever used.",
    author: "Marc, Freelancer 💻",
  },
]
</script>

<style>
.main-screenshot {
  width: 100%;
  aspect-ratio: 35/19;
}
</style>
