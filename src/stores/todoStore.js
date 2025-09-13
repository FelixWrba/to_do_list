import { defineStore } from 'pinia';
import { ref, watch, computed } from 'vue';
import { useAuthStore } from './authStore';
import { supabase } from '@/utils/supabase';

export const useTodoStore = defineStore('todo', () => {
  // Todo structure: { name: string; description: string; done: boolean; dueDate: "yyyy-mm-dd"; id: number; }
  const authStore = useAuthStore();
  const isLoggedIn = computed(() => Boolean(authStore.user));
  const isLoadingDB = ref(Boolean(authStore.hasAccount));

  // tries to load todos from localStorage if has local account
  const todos = ref(
    authStore.hasAccount ? [] : (JSON.parse(localStorage.getItem('todos') || '[]'))
  );

  const sorted = computed(() => todos.value.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()));

  // sync todos with localStorage when local account
  watch(todos, (newTodos) => {
    if (authStore.hasAccount) return;

    localStorage.setItem('todos', JSON.stringify(newTodos));
  }, { deep: true });

  // fetch tasks when isLoggedIn
  watch(isLoggedIn, newIsLoggedIn => {
    if (!newIsLoggedIn) return;
    supabase
      .from('tasks')
      .select('*')
      .then(res => {
        todos.value = res.data;
        isLoadingDB.value = false;
      })
      .catch(err => {
        console.error(err);
        isLoadingDB.value = false;
      });
  });

  function addTodo(todo) {
    // handle local account
    if (!authStore.hasAccount) {
      todo = { ...todo, done: false, id: Date.now() };
      todos.value = [...todos.value, todo];

      return;
    }

    todo = { ...todo, done: false, user_id: authStore.user.id };
    supabase
      .from('tasks')
      .insert([todo])
      .select()
      .then(({ data, error }) => {
        if (error) {
          console.log(error);
          alert('Failed to add task: ' + error);
          return;
        }

        todos.value = [...todos.value, ...data];
      });
  }

  function setDone(id, done) {
    const index = todos.value.findIndex(todo => todo.id === id);
    if (index < 0) return false;

    if (!isLoggedIn.value) {
      todos.value[index].done = done;
      return true;
    }

    supabase
      .from('tasks')
      .update({ 'done': done })
      .eq('id', id)
      .then(({ error }) => {
        if (error) {
          console.error(error);
          return false;
        }

        todos.value[index].done = done;
        return true;
      });
  }

  function editTodo(id, newTodo) {
    const index = todos.value.findIndex(todo => todo.id === id);
    if (index < 0) return false;

    if (!authStore.hasAccount) {
      todos.value[index] = newTodo;
      return true;
    }

    supabase
      .from('tasks')
      .update({ ...newTodo })
      .eq('id', id)
      .then(({ error }) => {
        if (error) {
          alert('Failed to edit to-do: ' + error);
          console.error(error);
          return false;
        }

        todos.value[index] = newTodo;
        return true;
      });
  }

  function deleteTodo(id) {
    if (!authStore.hasAccount) {
      todos.value = todos.value.filter(todo => todo.id !== id);
      return;
    }

    supabase
      .from('tasks')
      .delete()
      .eq('id', id)
      .then(({ error }) => {
        if (error) {
          console.error(error);
          alert('Failed to delete to-do: ' + error);
          return;
        }

        todos.value = todos.value.filter(todo => todo.id !== id);
      });
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
    isLoadingDB,
    addTodo,
    setDone,
    editTodo,
    deleteTodo,
    getTodoBy,
  }
});
