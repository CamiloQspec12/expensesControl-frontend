<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import router from '@/router'

const authStore = useAuthStore()
const email = ref('')
const password = ref('')
const error = ref({})
const isLoading = ref(false)

function validate() {
  error.value = {}

  if (!email.value || email.value.trim() === '') {
    error.value.email = 'El email es obligatorio'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    error.value.email = 'El email no tiene un formato válido'
  }

  if (!password.value || password.value.trim() === '') {
    error.value.password = 'La contraseña es obligatoria'
  }

  return Object.keys(error.value).length === 0
  // Importante si no esta el return devuelve undefined que siempre totea todo
}

async function handleLogin() {
  if (!validate()) return

  isLoading.value = true
  try {
    await authStore.login(email.value, password.value)
    router.push('/dashboard')
  } catch (e) {
    if (e.response?.status === 401) {
      error.value.general = 'Email o contraseña incorrectos'
    } else {
      error.value.general = 'Error del servidor, intenta de nuevo más tarde'
    }
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <section class="min-h-[80vh] flex items-center justify-center">
    <div class="w-full max-w-md bg-white rounded-lg shadow-sm p-6">
      <h1 class="text-2xl font-bold text-gray-900 mb-1">Iniciar sesión</h1>
      <p class="text-sm text-gray-500 mb-4">Ingresa a tu cuenta</p>
      <form class="flex flex-col gap-3" @submit.prevent="handleLogin">
        <input
          class="mb-2 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          v-model="email"
          type="email"
          placeholder="Email"
        />
        <label v-if="error.email" class="text-red-600 text-sm mb-2">
          {{ error.email }}
        </label>
        <input
          class="mb-2 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          v-model="password"
          type="password"
          placeholder="Password"
        />
        <label v-if="error.password" class="text-red-600 text-sm mb-2">
          {{ error.password }}
        </label>
        <div
          v-if="error.general"
          class="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-3 py-2"
        >
          {{ error.general }}
        </div>
        <button
          type="submit"
          :disabled="isLoading"
          class="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ isLoading ? 'Ingresando...' : 'Ingresar' }}
        </button>
      </form>
      <p class="text-sm text-gray-500 mt-4 text-center">
        ¿No tienes cuenta?
        <RouterLink to="/signUp" class="text-blue-600 hover:underline">Regístrate</RouterLink>
      </p>
    </div>
  </section>
</template>
