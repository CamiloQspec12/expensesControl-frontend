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
    <div class="w-120 h-120 border-blue-200 rounded bg-blue-100">
      <form class="flex items-center h-full flex-col justify-center" @submit.prevent="handleLogin">
        <input class="border rounded mb-4" v-model="email" type="email" placeholder="Email" />
        <input class="border rounded" v-model="password" type="password" placeholder="Password" />
        <button type="submit pointer">Ingresar</button>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
