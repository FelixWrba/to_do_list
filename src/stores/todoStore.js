import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export const useTodoStore = defineStore('todo', () => {
  // Todo structure: { name: string; description: string; done: boolean; dueDate: "yyyy-mm-dd"; id: number; }
  // load todos from localStorage if they exist
  const todos = ref(JSON.parse(localStorage.getItem('todos') || '[]'));

  // sync todos with localStorage
  watch(todos, (newTodos) => {
    localStorage.setItem('todos', JSON.stringify(newTodos));
  }, { deep: true });

  function addTodo(todo) {
    todos.value = [...todos.value, todo];
  }

  function editTodo(id, newTodo) {
    const index = todos.value.findIndex(todo => todo.id === id);
    if (index < 0) return false;

    todos.value[index] = newTodo;
    return true;
  }

  function deleteTodo(id) {
    todos.value = todos.value.filter(todo => todo.id !== id);
  }

  function setTodos(newTodos) {
    todos.value = [...newTodos];
  }

  return {
    todos,
    addTodo,
    editTodo,
    deleteTodo,
    setTodos,
  }
});
