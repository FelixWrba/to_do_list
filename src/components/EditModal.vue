<template>
  <dialog ref="editDialog" class="modal edit-modal lg:max-w-3xl transition-all duration-300 p-4 rounded"
    @close="closeModal">
    <form @submit.prevent="editTodo" class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold">Edit to-do {{ formData.name }}</h2>
      <TextField v-model="formData.name" label="Name" :max-length="50" required :write />
      <TextField v-model="formData.description" label="Description" :max-length="100" :write />
      <div class="flex flex-col">
        <input type="date" id="due-date" v-model="formData.dueDate"
          class="border border-gray-300 focus:border-green-500 outline-0 transition-all duration-300 rounded flex-1 p-1 w-full"
          required>
        <label for="due-date" class="text-gray-500 text-end text-sm" :write>Due Date</label>
      </div>

      <div class="flex gap-2">
        <button type="submit" class="btn">Edit</button>
        <button type="button" class="btn fade" @click="closeModal">Cancel</button>
        <button type="button" class="btn cancel ml-auto inline-flex items-center gap-1" @click="deleteTodo">
          <TrashIcon class="size-4" /> Delete
        </button>
      </div>
    </form>
  </dialog>
</template>

<script setup>
import { useTemplateRef, watch, ref } from 'vue';
import TextField from './TextField.vue';
import { TrashIcon } from '@heroicons/vue/24/solid';
import { useTodoStore } from '@/stores/todoStore';

const todoStore = useTodoStore();
const emit = defineEmits(['close']);
const { isOpen, editId } = defineProps(['isOpen', 'editId']);

const editDialog = useTemplateRef('editDialog');
const write = ref(false);

const formData = ref(todoStore.getTodoBy(editId));
watch(() => editId, newId => formData.value = todoStore.getTodoBy(newId));

function closeModal() {
  // closing animation
  editDialog.value.classList.remove('open');
  document.querySelector('meta[name=theme-color]').setAttribute('content', '#00c951');
  setTimeout(() => editDialog.value.close(), 300);
  emit('close');

  // make inputs immutable
  write.value = false;
}

function openModal() {
  // opening animation
  editDialog.value.showModal();
  editDialog.value.classList.add('open');
  document.querySelector('meta[name=theme-color]').setAttribute('content', '#00b549');

  // make inputs mutable
  setTimeout(() => {
    write.value = true;
  }, 500);
}

function editTodo() {
  todoStore.editTodo(editId, formData.value);

  closeModal();
}

function deleteTodo() {
  const choice = window.confirm('Should this to-do be deleted? This action cannot be undone.');

  if (choice) {
    todoStore.deleteTodo(editId);
    closeModal()
  };
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

<style>
.edit-modal {
  scale: .8;
}

.edit-modal.open {
  scale: 1;
}
</style>
