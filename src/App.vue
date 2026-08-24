<script setup>
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const reactiveRoute = computed(() => {
  return route.path
})
</script>

<template>
  <section class="main-wrapp h-dvh flex flex-col">
    <header v-if="reactiveRoute != '/login'" class="h-15">Esto es un header</header>
    <div class="second-wrapp flex-1 overflow-y-auto">
      <RouterView></RouterView>
    </div>
  </section>
</template>

<style scoped></style>
