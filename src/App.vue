<script setup>
import NavHeader from './components/navHeader.vue'
</script>

<template>
  <section class="main-wrapp bg-gray-50 h-dvh flex flex-col">
    <NavHeader></NavHeader>
    <div class="second-wrapp flex-1 p-2 overflow-y-auto">
      <RouterView></RouterView>
    </div>
  </section>
</template>

<style scoped></style>
