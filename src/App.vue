<script setup>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
</script>

<template>

  <Header />

  <main class="max-w-4xl m-auto mb-8 h-screen">

    <RouterView />

  </main>

  <Footer />

</template>
