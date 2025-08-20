<template>
  <li>
    <!-- DATE LABEL -->
    <h2 v-if="props.dateLabel" class="text-gray-600 text-sm font-semibold">{{ dateLabel }}</h2>
    <!-- TODO ITEM -->
    <div class="flex gap-2 items-center">
      <input type="checkbox" :checked="done" @change="e => emit('set-done', props.id, e.target.checked)"
        title="Mark to-do as done." aria-label="Mark to-do as done." :id />
      <div class="flex-1">
        <h3 class="text-lg font-semibold">{{ props.name }}</h3>
        <p class="text-sm text-gray-600">{{ props.description || 'No description' }} - {{ formatDate(dueDate) }}</p>
      </div>
      <button title="Edit to-do." aria-label="Edit to-do." @click="emit('open-edit', props.id)">
        <PencilIcon class="icon-btn" />
      </button>
    </div>
  </li>
</template>

<script setup>
import { PencilIcon } from '@heroicons/vue/24/solid';

const props = defineProps(['name', 'description', 'done', 'dueDate', 'id', 'dateLabel']);
const emit = defineEmits(['set-done', 'open-edit']);

// yyyy-mm-dd => D., dd. M (e. g. Su., 27. July)
function formatDate(date) {
  date = new Date(date);
  const lang = navigator.language || 'en-US';

  return `${new Intl.DateTimeFormat(lang, { weekday: 'short' }).format(date)}., ${date.getDate()}. ${new Intl.DateTimeFormat(lang, { month: 'long' }).format(date)} ${date.getFullYear() !== new Date().getFullYear() ? date.getFullYear() : ''}`;
}
</script>
