<template>
  <li class="flex gap-2 items-center">
    <input type="checkbox" :checked="done" @change="e => emit('set-done', props.id, e.target.checked)" title="Mark to-do as done." aria-label="Mark to-do as done." />
    <div class="flex-1">
      <h3 class="text-lg font-semibold">{{ props.name }}</h3>
      <p class="text-sm text-gray-600">{{ props.description || 'No description' }} - Due: {{ dueDate }}</p>
    </div>
    <button title="Edit to-do." aria-label="Edit to-do.">
      <PencilIcon class="icon-btn" />
    </button>
  </li>
</template>

<script setup>
import { PencilIcon } from '@heroicons/vue/24/solid';

const props = defineProps(['name', 'description', 'done', 'dueDate', 'id']);
const emit = defineEmits(['set-done']);
</script>
