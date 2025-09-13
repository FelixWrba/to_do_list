<template>
  <Header />

  <main class="max-w-4xl m-auto pb-28 min-h-screen">

    <!-- TODO LIST -->
    <TransitionGroup tag="ul" class="flex flex-col gap-4 m-4" name="list">

      <!-- TODO ITEM -->
      <TodoItem v-for="(todo, i) in todoStore.sorted" :key="todo.id" v-bind="todo" @set-done="handleSetDone"
        @open-edit="openEdit"
        :date-label="getDateLabel(todoStore.sorted[i - 1]?.dueDate) !== getDateLabel(todo.dueDate) ? getDateLabel(todo.dueDate) : null" />


      <!-- LOADING MESSAGE -->
      <li v-if="todoStore.isLoadingDB" class="text-center">
        <div class="flex gap-2 items-center justify-center font-semibold">
          <span class="size-4 border-2 inline-block rounded-full border-b-transparent animate-spin"></span>
        <p>Loading</p>
        </div>
        <p class="text-sm text-gray-600 mt-2">If your to-do list does not load try to <router-link to="/account/login" class="underline">log in</router-link>.</p>
      </li>

      <!-- EMPTY MESSAGE -->
      <li v-else-if="todoStore.todos.length < 1" class="flex flex-col gap-2 items-center text-center max-w-sm m-auto">
        <InformationCircleIcon class="size-8" />
        <p>Your to-do list is empty. Press (+) on the bottom right to add a to-do to the list.</p>
      </li>

    </TransitionGroup>

    <!-- PROGRESS TRACKING -->
    <div class="flex flex-col gap-2 items-center p-4" v-if="!todoStore.isLoadingDB">
      <!-- progress stats -->
      <progress id="progress" :value="progress" :max="todoStore.todos.length" class="progress"></progress>
      <!-- progress stats -->
      <label for="progress" class="text-gray-600 text-sm">
        <p class="flex items-center gap-2 mb-2">
          <ChartPieIcon class="size-5 " />
          <span> {{ Math.round(progress / todoStore.todos.length * 100) || 0 }}% Done</span>
        </p>
        <p class="flex items-center gap-2 mb-2">
          <ChartBarIcon class="size-5 " />
          <span>{{ progress }} / {{ todoStore.todos.length }} tasks completed</span>
        </p>
      </label>
      <!-- progress sharing -->
      <button class="flex items-center gap-2 btn" @click="shareProgress(progress, todoStore.todos.length)">
        <ShareIcon class="size-5" /> <span>Share Progress</span>
      </button>
      <p v-if="shareError" class="text-sm text-red-600 bg-red-50 p-2 rounded"><b>Failed to share progress: </b>{{
        shareError }} <button @click="shareError = ''" class="underline cursor-pointer">(Hide Error)</button></p>
    </div>

    <!-- ADD TODO INPUT FIELD -->
    <form
      class="peer fixed max-w-xl bottom-4 not-md:left-4 md:w-full right-20 shadow-md rounded-full bg-green-50/50 backdrop-blur-sm focus-within:bottom-1/2 md:focus-within:bottom-4 focus-within:bg-green-200/50 transition-colors duration-300 delay-75 border border-gray-300/50 focus-within:border-green-300/50"
      @submit.prevent="addTodo">
      <div class="relative" v-show="delayedFocus">
        <ul class="fixed -top-10 pb-1 mb-2 flex gap-1 overflow-x-auto w-chipbar z-50">
          <button v-for="(chip, i) in dayChips" @click="selectDate(chip.value)"
            :class="`chip ${chip.value === dayCount ? 'current' : ''}`" type="button" :key="i">{{ chip.name }}</button>
        </ul>
      </div>
      <input type="text" placeholder="Enter new to-do" v-model="addTodoField" required
        class="border-0 outline-0 text-inherit text-base p-3 w-full" id="todo-input-field" spellcheck="false"
        autocomplete="off" aria-label="To-do input field" @focus="focus" @blur="unfocus" ref="addTodoFieldEl">
    </form>

    <!-- ADD TODO BUTTON -->
    <button
      :class="`add-btn bottom-4 peer-focus-within:bottom-1/2 md:peer-focus-within:bottom-4 ${hasTodoFieldFocus && !addTodoField ? 'cursor-not-allowed bg-gray-300' : 'cursor-pointer bg-green-500'}`"
      title="Add to-do." aria-label="Add to-do." @click="addTodo" ref="addBtn">
      <CheckIcon class="size-8 text-white" v-show="addTodoField || hasTodoFieldFocus" />
      <PlusIcon class="size-8 text-white" v-show="!addTodoField && !hasTodoFieldFocus" />
    </button>

    <!-- MODALS -->
    <AddModal @close="handleAddClose" :is-open="isAddModalOpen" />
    <EditModal @close="isEditModalOpen = false" :is-open="isEditModalOpen" :edit-id />

  </main>
  <Footer />
</template>

<script setup>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import TodoItem from '@/components/TodoItem.vue';
import AddModal from '@/components/AddModal.vue';
import EditModal from '@/components/EditModal.vue';

import { useTemplateRef, ref, computed } from 'vue';
import { useTodoStore } from '@/stores/todoStore';
import { PlusIcon, CheckIcon } from '@heroicons/vue/24/solid';
import { InformationCircleIcon, ChartPieIcon, ChartBarIcon, ShareIcon } from '@heroicons/vue/24/outline';

const todoStore = useTodoStore();
const progress = computed(() => todoStore.todos.reduce((sum, todo) => todo.done ? sum + 1 : sum, 0));

const shareError = ref('');

const addBtn = useTemplateRef('addBtn');

const addTodoField = ref('')
const addTodoFieldEl = useTemplateRef('addTodoFieldEl');
const hasTodoFieldFocus = ref(false);

const dayCount = ref(0);
const dayChips = [
  { name: 'Today', value: 0 },
  { name: 'Tomorrow', value: 1 },
  { name: 'In 2 days', value: 2 },
  { name: 'In 3 days', value: 3 },
  { name: 'In a week', value: 7 },
  { name: 'In a month', value: 30 },
  { name: 'In a year', value: 365 },
];

const focus = () => {
  clearTimeout(delayId);
  hasTodoFieldFocus.value = true;
  delayedFocus.value = true;
};
const unfocus = () => {
  hasTodoFieldFocus.value = false;
  delayId.value = setTimeout(() => delayedFocus.value = false, 500);
};

const delayedFocus = ref(false);
const delayId = ref(null);

const isAddModalOpen = ref(false);
const isEditModalOpen = ref(false);

const editId = ref(null);

function handleSetDone(id, done) {
  todoStore.setDone(id, done);
}

function addTodo() {
  if (addTodoField.value) {
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + dayCount.value);

    todoStore.addTodo({ name: addTodoField.value.slice(0, 50), description: '', dueDate: dueDate.toLocaleDateString('en-CA') });

    addTodoField.value = '';
    dayCount.value = 0;
  }
  else if (delayedFocus.value || hasTodoFieldFocus.value) {
    addTodoFieldEl.value.focus();
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
  const today = new Date();
  const due = new Date(dueDate)

  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const startOfDue = new Date(due.getFullYear(), due.getMonth(), due.getDate());
  const dueDateOffset = Math.floor((startOfDue - startOfToday) / 86400000);

  if (dueDateOffset < 0) {
    return 'Overdue';
  }
  if (dueDateOffset === 0) {
    return 'Today';
  }
  if (dueDateOffset === 1) {
    return 'Tomorrow';
  }
  if (dueDateOffset <= (7 - today.getDay())) {
    return 'This Week';
  }
  if (
    dueDateOffset <= (new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate() - today.getDate())
  ) {
    return 'This Month';
  }
  if (due.getFullYear() === today.getFullYear()) {
    return 'This Year';
  }
  if ((due.getFullYear() === today.getFullYear() + 1) && today.getMonth() === 11) {
    return 'Next Year';
  }
  if (due.getFullYear() - 10 <= today.getFullYear()) {
    return 'This Decade';
  }
  if (due.getFullYear() - 100 <= today.getFullYear()) {
    return 'This Century';
  }
  if (due.getFullYear() - 1000 <= today.getFullYear()) {
    return 'This Millenium';
  }

  return 'idk when';
}

function selectDate(days) {
  clearTimeout(delayId.value);
  delayedFocus.value = true;
  dayCount.value = days;
  addTodoFieldEl.value.focus();
}

function shareProgress(done, all) {
  if (!navigator.canShare) {
    shareError.value = 'Your browser does not support sharing. Please update to a newer version.';
    return;
  }

  const shareTexts = {
    en: `I just completed ${done === all ? 'all of my' : done + ' of ' + all} tasks 🥳! I found this out by tracking📊 my to-dos with myTasks: online! This simple To-Do App increased my productivity by 73%📈🔥😎 Get the app: mytasksonline.netlify.app`,
    de: `I habe gerade ${done === all ? 'all meine' : done + ' von ' + all} Aufgaben erledigt 🥳! Das habe ich durch's Tracken📊 meiner To-Dos mit myTasks: online herausgefunden! Diese einfache To-Do App hat meine Produktivität um 73% gesteigert📈🔥😎 Hol dir die App: mytasksonline.netlify.app`,
  };
  const userLang = navigator.language.includes('de') ? 'de' : 'en';

  navigator
    .share({ text: shareTexts[userLang] })
    .catch(err => {
      console.error(err);
      shareError.value = err;
    });
}
</script>

<style>
@import 'tailwindcss';

.add-btn {
  @apply flex justify-center items-center p-2 fixed right-4 shadow-lg w-12 h-12 lg:max-w-3xl transition-all duration-700;
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

.list-enter-active,
.list-leave-active {
  transition: all .5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(-16px);
}

.progress {
  @apply h-4 appearance-none w-full max-w-sm;
}

.progress::-webkit-progress-bar {
  @apply bg-slate-100 rounded-full border border-slate-300;
}

.progress::-webkit-progress-value {
  @apply bg-green-500 rounded-full transition-all duration-300;
  border: none;
  box-shadow: none;
}

.chip {
  @apply rounded-full px-2 bg-gray-200 text-gray-800 py-0.5 cursor-pointer backdrop-blur-sm transition-colors duration-300 text-nowrap shadow border border-gray-300;
}

.current {
  @apply bg-green-200 text-green-800 border-green-300;
}

.w-chipbar {
  width: calc(100% + 64px);
}
</style>
