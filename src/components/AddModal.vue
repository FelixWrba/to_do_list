<template>
  <dialog ref="addDialog" class="add-modal lg:max-w-3xl transition-all duration-300">
    <form @submit.prevent="closeModal">
      <h2>Add to-do</h2>
      <button type="submit">Add</button>
      <button type="submit">Cancel</button>
    </form>
  </dialog>
</template>

<script setup>
import { useTemplateRef, watch } from 'vue';

const addDialog = useTemplateRef('addDialog');
const emit = defineEmits(['close']);
const { isOpen } = defineProps(['isOpen']);

function closeModal() {
  addDialog.value.classList.remove('open');
  setTimeout(() => addDialog.value.close(), 300);
  emit('close');
}

function openModal() {
  addDialog.value.showModal();
  setTimeout(() => addDialog.value.classList.add('open'), 500);
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
}

.add-modal.open,
.add-modal.open::backdrop {
  opacity: 1;
}
</style>
