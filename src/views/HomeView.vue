<template>
  <ul class="flex flex-col gap-4 m-4">
    <TodoItem v-for="todo in todoStore.todos" :key="todo.id" v-bind="todo" @set-done="handleSetDone" />
  </ul>

  <button class="add-btn" title="Add to-do." aria-label="Add to-do." @click="addTodo" ref="addBtn">
    <PlusIcon class="size-8 text-white" />
  </button>

  <AddModal ref="addModal" @close="handleAddClose" :is-open="isAddModalOpen" />
</template>

<script setup>
import { useTodoStore } from '@/stores/todoStore';
import TodoItem from '@/components/TodoItem.vue';
import AddModal from '@/components/AddModal.vue';
import { useTemplateRef, ref } from 'vue';
import { PlusIcon } from '@heroicons/vue/24/solid';

const todoStore = useTodoStore();
const addBtn = useTemplateRef('addBtn');
const isAddModalOpen = ref(false);

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
  @apply flex justify-center items-center p-2 rounded-full fixed right-4 bottom-4 cursor-pointer shadow-lg w-12 lg:max-w-3xl transition-all duration-700;
  background-color: #00c951;
}

.add-btn.expanded {
  background-color: #ffffff;
  width: 80vw;
  right: 50%;
  bottom: 50%;
  transform: translateX(50%) translateY(50%);
}
</style>
