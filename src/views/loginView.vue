<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import router from '@/router'

const authStore = useAuthStore()
const email = ref('')
const password = ref('')

async function handleLogin() {
  await authStore.login(email.value, password.value)
  router.push('/dashboard')
}
</script>

<template>
  <div class="loginView flex items-center justify-center h-full flex">
    <div class="w-120 h-120 border-blue-200 rounded bg-blue-50 border-gray-200">
      <form class="flex items-center h-full flex-col justify-center" @submit.prevent="handleLogin">
        <p class="mb-3">Login</p>
        <input
          class="mb-2 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          v-model="email"
          type="email"
          placeholder="Email"
        />
        <input
          class="mb-2 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          v-model="password"
          type="password"
          placeholder="Password"
        />
        <button
          class="px-4 py-1 cursor-pointer rounded-lg transition-colors bg-blue-600 hover:bg-blue-700 text-white font-medium"
          type="submit pointer"
        >
          Ingresar
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
