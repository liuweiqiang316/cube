<script setup lang="ts">
import { ref, onMounted } from "vue";
import { CButton, CTooltip } from "@llwwqq/components";
import { fetchRandomData, fetchRandomData2 } from "@/apis";

defineProps<{ msg: string }>();

console.log('%c 111 CTooltip', 'color:red', CTooltip);
const count = ref(0);

const fetchData = async () => {
  fetchRandomData.controller.abort()
  const res = await fetchRandomData()
  console.log('%c 111 res', 'color:red', res);
}

const fetchData2 = async () => {
  fetchRandomData2.controller.abort()
  const res = await fetchRandomData2()
  console.log('%c 222 ', 'color:red', res);
}
const handleClick = () => {
  fetchData()
}

onMounted(() => {
  fetchData()
  fetchData2()
})

</script>

<template>
  <h1>{{ msg }}</h1>
  <c-button type="plain" @click="handleClick"></c-button>
  <c-button></c-button>
  <!-- <c-icon></c-icon> -->
  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank">create-vue</a>, the official Vue + Vite
    starter
  </p>
  <p>
    Install
    <a href="https://github.com/vuejs/language-tools" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
