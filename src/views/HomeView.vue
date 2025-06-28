<template>
  <ul class="flex flex-col gap-4 m-4">
    <TodoItem v-for="todo in todoStore.todos" :key="todo.id" v-bind="todo" @set-done="handleSetDone" />
  </ul>
</template>

<script setup>
import { useTodoStore } from '@/stores/todoStore';
import TodoItem from '@/components/TodoItem.vue';

const todoStore = useTodoStore();

function handleSetDone(id, done) {
  todoStore.setDone(id, done);
}
</script>
