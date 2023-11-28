<template>
  <button
    :class="{ 'c-button': true, primary: type === 'primary' }"
    @click="handleClick"
  >
    测试按钮22
  </button>
</template>
<script lang="ts" setup>
import { ajv, validate } from "@/hook/useAjv";

interface Props {
  type?: string;
}

defineOptions({ name: "c-button" });

withDefaults(defineProps<Props>(), {
  type: "primary",
});

const handleClick = () => {
  // console.log("handleClick", ajv, validate);
};
</script>

<style lang="less" scoped>
.c-button.primary {
  background: #66b1ff;
}
</style>
