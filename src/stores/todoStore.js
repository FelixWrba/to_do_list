import { defineStore } from 'pinia';
import { ref, watch, computed } from 'vue';

export const useTodoStore = defineStore('todo', () => {
  // Todo structure: { name: string; description: string; done: boolean; dueDate: "yyyy-mm-dd"; id: number; }
  // load todos from localStorage if they exist
  const todos = ref(JSON.parse(localStorage.getItem('todos') || '[]'));

  const sorted = computed(() => todos.value.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()));

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

  function getTodoBy(id) {
    const index = todos.value.findIndex(todo => todo.id === id);

    if (index < 0) {
      return { name: '', description: '', dueDate: new Date().toLocaleDateString('en-CA') };
    }

    return { ...todos.value[index] };
  }

  return {
    todos,
    sorted,
    addTodo,
    setDone,
    editTodo,
    deleteTodo,
    getTodoBy,
  }
});
