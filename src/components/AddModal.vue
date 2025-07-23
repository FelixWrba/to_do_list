<template>
  <dialog ref="addDialog" class="modal lg:max-w-3xl transition-all duration-300 p-4 rounded" @close="closeModal">
    <form @submit.prevent="addTodo" class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold">Add to-do</h2>
      <TextField v-model="formData.name" label="Name" :max-length="50" required :write />
      <TextField v-model="formData.description" label="Description" :max-length="100" :write />
      <div class="flex flex-col">
        <input type="date" id="due-date" v-model="formData.dueDate"
          class="border border-gray-300 focus:border-green-500 outline-0 transition-all duration-300 rounded flex-1 p-1 w-full"
          required>
        <label for="due-date" class="text-gray-500 text-end text-sm" :write>Due Date</label>
      </div>

      <div>
        <button type="submit" class="btn mr-2">Add</button>
        <button type="button" class="btn cancel" @click="closeModal">Cancel</button>
      </div>
    </form>
  </dialog>
</template>

<script setup>
import { useTemplateRef, watch, ref } from 'vue';
import TextField from './TextField.vue';
import { useTodoStore } from '@/stores/todoStore';

const addDialog = useTemplateRef('addDialog');
const todoStore = useTodoStore();

const emit = defineEmits(['close']);
const { isOpen } = defineProps(['isOpen']);

const initialFormData = { name: '', description: '', dueDate: new Date().toLocaleDateString('en-CA') };
const formData = ref({ ...initialFormData });
const write = ref(false);

function closeModal() {
  // closing animation
  addDialog.value.classList.remove('open');
  document.querySelector('meta[name=theme-color]').setAttribute('content', '#00c951');
  setTimeout(() => addDialog.value.close(), 300);
  emit('close');

  // reset and make inputs immutable
  formData.value = { ...initialFormData };
  write.value = false;
}

function openModal() {
  // opening animation
  addDialog.value.showModal();
  setTimeout(() => {
    addDialog.value.classList.add('open');
    document.querySelector('meta[name=theme-color]').setAttribute('content', '#00b549');
    // make inputs mutable
    write.value = true;
  }, 500);
}

function addTodo() {
  todoStore.addTodo(formData.value);

  closeModal();
}

watch(() => isOpen, newIsOpen => {
  if (newIsOpen) {
    openModal();
  }
  else {
    closeModal();
  }
});
</script>
