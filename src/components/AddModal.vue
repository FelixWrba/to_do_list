<template>
  <dialog ref="addDialog" class="add-modal lg:max-w-3xl transition-all duration-300 p-4 rounded">
    <form @submit.prevent="closeModal" class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold">Add to-do</h2>
      <TextField v-model="formData.name" label="Name" :max-length="50" required :readonly />
      <TextField v-model="formData.description" label="Description" :max-length="100" :readonly/>
      <div class="flex flex-col">
        <input type="date" id="due-date"
          class="border border-gray-300 focus:border-green-500 outline-0 transition-all duration-300 rounded flex-1 p-1">
          <label for="due-date" class="text-gray-500 text-end text-sm" :readonly>Due Date</label>
      </div>

      <div>
        <button type="submit" class="btn mr-2">Add</button>
        <button type="reset" class="btn cancel" @click="closeModal">Cancel</button>
      </div>
    </form>
  </dialog>
</template>

<script setup>
import { useTemplateRef, watch, ref } from 'vue';
import TextField from './TextField.vue';

const addDialog = useTemplateRef('addDialog');
const emit = defineEmits(['close']);
const { isOpen } = defineProps(['isOpen']);

const formData = ref({ name: '', description: '', dueDate: '' });
const readonly = ref(true);

function closeModal() {
  addDialog.value.classList.remove('open');
  document.querySelector('meta[name=theme-color]').setAttribute('content', '#00c951');
  setTimeout(() => addDialog.value.close(), 300);
  emit('close');
  readonly.value = true;
}

function openModal() {
  addDialog.value.showModal();
  setTimeout(() => {
    addDialog.value.classList.add('open');
    document.querySelector('meta[name=theme-color]').setAttribute('content', '#00b549');
    readonly.value = false;
  }, 500);
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
.add-modal {
  width: 80vw;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  opacity: 0;
}

.add-modal::backdrop {
  opacity: 0;
  transition: all 300ms;
  background-color: rgba(0, 0, 0, 0.1);
}

.add-modal.open,
.add-modal.open::backdrop {
  opacity: 1;
}
</style>
