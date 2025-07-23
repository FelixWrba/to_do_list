<template>
  <li class="flex gap-2 items-center">
    <input type="checkbox" :checked="done" @change="e => emit('set-done', props.id, e.target.checked)"
      title="Mark to-do as done." aria-label="Mark to-do as done." :id />
    <div class="flex-1">
      <h3 class="text-lg font-semibold">{{ props.name }}</h3>
      <p class="text-sm text-gray-600">{{ props.description || 'No description' }} - Due: {{ dueDate }}</p>
    </div>
    <button title="Edit to-do." aria-label="Edit to-do." @click="handleEdit" ref="editBtn">
      <PencilIcon class="icon-btn" />
    </button>
  </li>
</template>

<script setup>
import { PencilIcon } from '@heroicons/vue/24/solid';
import { useTemplateRef } from 'vue';

const props = defineProps(['name', 'description', 'done', 'dueDate', 'id']);
const emit = defineEmits(['set-done', 'open-edit']);

const editBtn = useTemplateRef('editBtn');

function handleEdit() {
  const { x, y, width, height } = editBtn.value.getBoundingClientRect();

  emit('open-edit', props.id, { x, y, width, height });
}
</script>
