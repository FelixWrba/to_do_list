<template>
  <li class="flex gap-2 items-center">
    <input type="checkbox" :checked="done" @change="e => emit('set-done', props.id, e.target.checked)" />
    <div class="flex-1">
      <h3 class="text-lg font-semibold">{{ props.name }}</h3>
      <p class="text-sm text-gray-600">{{ props.description }} - Due: {{ dueDate }}</p>
    </div>
    <PencilIcon class="icon-btn" />
  </li>
</template>

<script setup>
import { PencilIcon } from '@heroicons/vue/24/solid';

const props = defineProps(['name', 'description', 'done', 'dueDate', 'id']);
const emit = defineEmits(['set-done']);
</script>
