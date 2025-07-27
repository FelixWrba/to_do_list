<template>
  <!-- TODO LIST -->
  <ul class="flex flex-col gap-4 m-4">
    <TodoItem v-for="(todo, i) in todoStore.sorted" :key="todo.id" v-bind="todo" @set-done="handleSetDone"
      @open-edit="openEdit"
      :date-label="getDateLabel(todoStore.sorted[i - 1]?.dueDate) !== getDateLabel(todo.dueDate) ? getDateLabel(todo.dueDate) : null" />

    <li v-if="todoStore.todos.length < 1" class="flex gap-2 items-center text-gray-600 font-semibold">
      <NoSymbolIcon class="size-6" />
      <p>To-do list is empty.</p>
    </li>
  </ul>

  <!-- ADD TODO INPUT FIELD -->
  <form class="fixed max-w-xl bottom-4 not-md:left-4 md:w-full right-20 p-1 pt-3 shadow rounded bg-white"
    @submit.prevent="addTodo">
    <TextField label="Add to-do" max-length="50" v-model="addTodoField" required />
  </form>

  <!-- ADD TODO BUTTON -->
  <button class="add-btn" title="Add to-do." aria-label="Add to-do." @click="addTodo" ref="addBtn">
    <CheckIcon class="size-8 text-white" v-show="addTodoField" />
    <PlusIcon class="size-8 text-white" v-show="!addTodoField" />
  </button>

  <!-- MODALS -->
  <AddModal @close="handleAddClose" :is-open="isAddModalOpen" />
  <EditModal @close="isEditModalOpen = false" :is-open="isEditModalOpen" :edit-id />
</template>

<script setup>
import TodoItem from '@/components/TodoItem.vue';
import AddModal from '@/components/AddModal.vue';
import EditModal from '@/components/EditModal.vue';
import TextField from '@/components/TextField.vue';

import { useTemplateRef, ref } from 'vue';
import { useTodoStore } from '@/stores/todoStore';
import { PlusIcon, NoSymbolIcon, CheckIcon } from '@heroicons/vue/24/solid';

const todoStore = useTodoStore();

const addBtn = useTemplateRef('addBtn');
const addTodoField = ref('');

const isAddModalOpen = ref(false);
const isEditModalOpen = ref(false);

const editId = ref(null);

function handleSetDone(id, done) {
  todoStore.setDone(id, done);
}

function addTodo() {
  if (addTodoField.value) {
    todoStore.addTodo({ name: addTodoField.value, description: '', dueDate: new Date().toLocaleDateString('en-CA') });

    addTodoField.value = '';
  }
  else {
    addBtn.value.classList.add('expanded');
    isAddModalOpen.value = true;
  }
}

function handleAddClose() {
  addBtn.value.classList.remove('expanded');
  isAddModalOpen.value = false;
}

function openEdit(id) {
  isEditModalOpen.value = true;
  editId.value = id;
}

function getDateLabel(dueDate) {
  const dueDateOffset = Math.ceil((new Date(dueDate).getTime() - new Date().getTime()) / 86400000);
  if (dueDateOffset < 0) {
    return 'Overdue';
  }
  if (dueDateOffset === 0) {
    return 'Today';
  }
  if (dueDateOffset === 1) {
    return 'Tomorrow';
  }
  if (dueDateOffset < 7) {
    return 'This Week';
  }
  if (dueDateOffset < 30) {
    return 'This Month';
  }
  if (dueDateOffset < 365) {
    return 'This Year';
  }
  if (dueDateOffset < 3653) {
    return 'This Decade';
  }
  if (dueDateOffset < 36535) {
    return 'This Century';
  }
  else {
    return 'idk when';
  }
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
  height: 304px;
  right: 50%;
  bottom: 50%;
  transform: translateX(50%) translateY(50%);
  border-radius: 4px;
}
</style>
