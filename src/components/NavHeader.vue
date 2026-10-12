<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { Menu, X } from 'lucide-vue-next'

const route = useRoute()

const reactiveRoute = computed(() => {
  console.log(route.path)
  return route.path
})

const routesNav = [
  {
    path: '/dashboard',
    name: 'Dashboard',
  },
  {
    path: '/expenses',
    name: 'Expenses',
  },
  {
    path: '/incomes',
    name: 'Incomes',
  },
  {
    path: '/categories',
    name: 'Categories',
  },
]

const isOpen = ref(false)
</script>

<template>
  <header
    v-if="reactiveRoute !== '/login' && reactiveRoute !== '/signUp'"
    class="flex relative bg-white border-b border-gray-200 ps-3 pe-6 py-3 items-center"
  >
    <div class="text-gray-900 font-medium">
      <h1 class="text-2xl font-bold text-gray-900">Expenses Control</h1>
    </div>
    <nav class="hidden md:flex ms-auto">
      <router-link
        v-for="(route, idx) in routesNav"
        :key="idx"
        :to="route.path"
        :class="`${idx === 0 ? 'ms-auto' : 'ms-1'} hidden md:flex px-4 py-1 cursor-pointer rounded-lg transition-colors bg-blue-600 hover:bg-blue-700 text-white font-medium`"
      >
        {{ route.name }}
      </router-link>
    </nav>
    <button
      class="md:hidden ms-auto px-4 py-1 cursor-pointer rounded-lg transition-colors bg-blue-600 hover:bg-blue-700 text-white font-medium"
      @click="isOpen = !isOpen"
    >
      <X v-if="isOpen" :size="28" :stroke-width="1.75" />
      <Menu v-else :size="28" :stroke-width="1.75" />
    </button>

    <nav
      v-if="isOpen"
      class="absolute top-full left-0 right-0 z-10 md:hidden bg-white border-b border-gray-200 shadow-md flex flex-col gap-1 p-3"
    >
      <router-link
        v-for="route in routesNav"
        :key="route.path"
        :to="route.path"
        class="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100"
        @click="isOpen = false"
      >
        {{ route.name }}
      </router-link>
    </nav>
  </header>
</template>
