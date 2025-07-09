<template>
  <ul class="flex flex-col gap-4 m-4">
    <TodoItem v-for="todo in todoStore.todos" :key="todo.id" v-bind="todo" @set-done="handleSetDone" />
  </ul>

  <button class="add-btn" title="Add to-do." aria-label="Add to-do." @click="addTodo" ref="addBtn">
    <PlusIcon class="size-8 text-white" />
  </button>

  <AddModal @close="handleAddClose" :is-open="isAddModalOpen" />

  <EditModal @close="isEditModalOpen = false" :is-open="isEditModalOpen" />
  <button @click="isEditModalOpen = true">Open edit modal</button>
</template>

<script setup>
import TodoItem from '@/components/TodoItem.vue';
import AddModal from '@/components/AddModal.vue';
import EditModal from '@/components/EditModal.vue';

import { useTemplateRef, ref } from 'vue';
import { useTodoStore } from '@/stores/todoStore';
import { PlusIcon } from '@heroicons/vue/24/solid';

const todoStore = useTodoStore();
const addBtn = useTemplateRef('addBtn');

const isAddModalOpen = ref(false);
const isEditModalOpen = ref(false);

function handleSetDone(id, done) {
  todoStore.setDone(id, done);
}

function addTodo() {
  addBtn.value.classList.add('expanded');
  isAddModalOpen.value = true;
}

function handleAddClose() {
  addBtn.value.classList.remove('expanded');
  isAddModalOpen.value = false;
}
</script>

<style>
@import 'tailwindcss';

.add-btn {
  @apply flex justify-center items-center p-2 fixed right-4 bottom-4 cursor-pointer shadow-lg w-12 h-12 lg:max-w-3xl transition-all duration-700;
  background-color: #00c951;
  border-radius: 99px;
}

.add-btn.expanded {
  background-color: #ffffff;
  width: 80vw;
  height: 280px;
  right: 50%;
  bottom: 50%;
  transform: translateX(50%) translateY(50%);
  border-radius: 4px;
}
</style>
