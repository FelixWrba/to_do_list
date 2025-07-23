import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export const useTodoStore = defineStore('todo', () => {
  // Todo structure: { name: string; description: string; done: boolean; dueDate: "yyyy-mm-dd"; id: number; }
  // load todos from localStorage if they exist
  const todos = ref(JSON.parse(localStorage.getItem('todos') || '[{ "name": "Test", "description": "This is a simple test to-do.", "done": true, "dueDate": "yyyy-mm-dd", "id": 1 }]'));

  // sync todos with localStorage
  watch(todos, (newTodos) => {
    localStorage.setItem('todos', JSON.stringify(newTodos));
  }, { deep: true });

  function addTodo(todo) {
    todo = { ...todo, done: false, id: new Date().getTime() };
    todos.value = [...todos.value, todo];
  }

  function setDone(id, done) {
    const index = todos.value.findIndex(todo => todo.id === id);
    if (index < 0) return false;

    todos.value[index].done = done;
    return true;
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

  return {
    todos,
    addTodo,
    setDone,
    editTodo,
    deleteTodo,
  }
});
