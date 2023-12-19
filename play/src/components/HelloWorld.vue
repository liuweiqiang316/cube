<template>
  <div>
    <wq-input v-model="state" ref="inputRef" />
    {{ state }}
    <button @click="onFocus">focus</button>
  </div>
</template>
<script setup lang="ts">
import type { InputInstance } from '@llwwqq/components';
import { ref } from 'vue';

const state = ref('')
const inputRef = ref<InputInstance>()

function onFocus() {
  inputRef.value?.focus()
}
</script>
<style scoped></style>
