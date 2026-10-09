<script setup>
import NavHeader from './components/NavHeader.vue'
</script>

<template>
  <section class="bg-gray-50 md:h-screen min-h-screen flex flex-col">
    <NavHeader></NavHeader>
    <main class="flex-1 min-h-0 p-4">
      <RouterView></RouterView>
    </main>
  </section>
</template>

<style scoped></style>
