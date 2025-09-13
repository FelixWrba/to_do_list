<template>
  <div class="fixed top-0 left-0 z-50 h-1 bg-blue-500/50 rounded-full loading-bar" v-if="isLoading"></div>
</template>

<script setup>
const { isLoading } = defineProps(['isLoading']);
</script>

<style>
.loading-bar {
  animation: loading-bar .6s;
}

@keyframes loading-bar {
  0% {
    width: 0%;
    opacity: 1;
  }

  50% {
    opacity: 1;
  }

  100% {
    width: 100%;
    opacity: 0;
  }
}
</style>
