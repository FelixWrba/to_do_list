<script setup>
import LoadingBar from './components/LoadingBar.vue';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter();

const isLoading = ref(true);
const loadTimeout = ref(undefined);

router.beforeEach(() => {
  clearTimeout(loadTimeout.value);

  isLoading.value = true;
  loadTimeout.value = setTimeout(() => isLoading.value = false, 600);
});
</script>

<template>

  <LoadingBar :isLoading />

  <RouterView />

</template>
