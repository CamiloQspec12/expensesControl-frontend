<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const reactiveRoute = computed(() => {
  return route.path
})
</script>

<template>
  <header
    v-if="reactiveRoute !== '/login'"
    class="bg-white border-b border-gray-200 px-6 py-3 flex items-center"
  >
    <div class="text-gray-900 font-medium">
      <h5 class="size">Expenses Control</h5>
    </div>
    <div class="ms-auto">
      <router-link
        to="/dashboard"
        class="px-4 py-1 cursor-pointer rounded-lg transition-colors bg-blue-600 hover:bg-blue-700 text-white font-medium"
      >
        Dashboard
      </router-link>
    </div>
    <div class="ms-2">
      <router-link
        to="/expenses"
        class="px-4 py-1 cursor-pointer rounded-lg transition-colors bg-blue-600 hover:bg-blue-700 text-white font-medium"
      >
        Expenses
      </router-link>
    </div>
    <div class="ms-2">
      <router-link
        to="/incomes"
        class="px-4 py-1 cursor-pointer rounded-lg transition-colors bg-blue-600 hover:bg-blue-700 text-white font-medium"
      >
        Incomes
      </router-link>
    </div>
    <div class="ms-2">
      <router-link
        to="categories"
        class="px-4 py-1 cursor-pointer rounded-lg transition-colors bg-blue-600 hover:bg-blue-700 text-white font-medium"
      >
        Categories
      </router-link>
    </div>
  </header>
</template>
