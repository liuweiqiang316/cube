<template>
  <button :class="{ 'c-button': true, primary: type === 'primary' }">
    测试按钮22
  </button>
</template>
<script lang="ts" setup>
defineOptions({ name: "c-button" });

interface Props {
  type?: string;
}

withDefaults(defineProps<Props>(), {
  type: "primary",
});
</script>

<style lang="less" scoped>
.c-button.primary {
  background: #66b1ff;
}
</style>
