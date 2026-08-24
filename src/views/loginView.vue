<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()
const email = ref('')
const password = ref('')

async function handleLogin() {
  await authStore.login(email.value, password.value)
}
</script>

<template>
  <div class="loginView flex items-center justify-center h-full flex">
    <div class="w-120 h-120 border rounded bg-gray-700">
      <form class="flex items-center h-full flex-col justify-center" @submit.prevent="handleLogin">
        <input v-model="email" type="email" placeholder="Email" />
        <input v-model="password" type="password" placeholder="Password" />
        <button type="submit pointer">Ingresar</button>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
