<template>
  <div class="flex flex-col relative">
    <input type="text" :id="id" v-model="modelValue"
      class="border border-gray-300 focus:border-green-500 outline-0 transition-all duration-300 rounded flex-1 p-1 peer"
      :aria-labelledby="id" autocomplete="off" spellcheck="false" :required="required" :readonly="!write" />

    <label :for="id"
      :class="'absolute left-1 text-gray-500 peer-focus:text-green-500 transition-all bg-white duration-300 px-1 ' + (isFloating ? '-top-2.5 text-xs' : 'top-1 text-base peer-focus:-top-2.5 peer-focus:text-xs')">
      {{ label }}
    </label>

    <span class="text-gray-500 text-xs text-end">{{ modelValue.length }}/{{ maxLength }}</span>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const { label, maxLength, required = false, write = true } = defineProps(['label', 'maxLength', 'required', 'write']);
const modelValue = defineModel({
  set(value) {
    return value.slice(0, maxLength);
  }
});

const id = label.toLowerCase().replace(/\s+/g, '-') + Math.round(Math.random() * 100);
const isFloating = computed(() => modelValue.value && modelValue.value.length > 0);
</script>
