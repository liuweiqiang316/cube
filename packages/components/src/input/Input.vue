<template>
    <div class="wq-input">
        <el-input v-model="state" ref="inputRef" class="wq-input__control" type="text" :disabled="props.disabled" />
    </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'
import type { InputEmits, InputProps } from './input';

defineOptions({
    name: 'WqInput',
})

const emit = defineEmits<InputEmits>()

const props = withDefaults(defineProps<InputProps>(), {
    modelValue: '',
    disabled: false
})

const state = computed({
    get: () => props.modelValue,
    set: (val) => {
        emit('update:modelValue', val)
    }
})

const inputRef = ref<HTMLInputElement>()

function focus() {
    inputRef.value?.focus()
}

defineExpose({
    focus
})
</script>
