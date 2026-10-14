<script setup>
import router from '@/router'
import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'

const authStore = useAuthStore()
const name = ref('')
const email = ref('')
const dob = ref('')
const gender = ref('')
const password = ref('')
const error = ref({})
const isLoading = ref(false)

function validate() {
  error.value = {}

  if (!name.value || typeof name.value !== 'string' || name.value.trim().length <= 6) {
    error.value.name = 'Nombre debe tener mas de 6 caracteres'
  }

  if (!email.value || email.value.trim() == '') {
    error.value.email = 'El correo electronico es obligatorio'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    error.value.email = 'El email no tiene un formato válido'
  }

  if (!dob.value) {
    error.value.dob = 'La fecha de nacimiento es obligatoria'
  } else if (new Date(dob.value) > new Date()) {
    error.value.dob = 'La fecha de nacimiento no puede ser futura'
  }

  if (!gender.value) {
    error.value.gender = 'El género es obligatorio'
  }

  if (!password.value || password.value.trim().length <= 6) {
    error.value.password = 'La contrasena debe tener mas de 6 caracteres'
  }

  return Object.keys(error.value).length === 0
}

async function handleSignUp() {
  if (!validate()) return

  isLoading.value = true

  try {
    await authStore.signUp({
      name: name.value,
      email: email.value,
      dob: dob.value,
      gender: gender.value,
      password: password.value,
    })

    name.value = ''
    email.value = ''
    dob.value = ''
    gender.value = ''
    password.value = ''
    router.push('/login')
  } catch (e) {
    if (!e.response) {
      error.value.general = 'Error al conectar con el servidor'
    } else if (e.response?.status === 400) {
      error.value.general = e.response.data.message
    } else {
      error.value.general = 'Error del servidor intentalo mas tarde nuevamente'
    }
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <section class="min-h-[80vh] flex items-center justify-center">
    <div class="w-full max-w-md bg-white rounded-lg shadow-sm p-6">
      <h1 class="text-2xl font-bold text-gray-900 mb-4">Formulario de registro</h1>
      <form class="flex flex-col gap-3" @submit.prevent="handleSignUp">
        <div class="flex flex-col gap-1">
          <label for="name" class="text-sm font-medium text-gray-700">Nombre</label>
          <input
            class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            id="name"
            v-model="name"
            type="text"
            placeholder="Nombre"
          />
          <span v-if="error.name" class="text-red-600 text-sm">
            {{ error.name }}
          </span>
        </div>
        <div class="flex flex-col gap-1">
          <label for="email" class="text-sm font-medium text-gray-700">Correo</label>
          <input
            class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            id="email"
            v-model="email"
            type="email"
            placeholder="Correo"
          />
          <span v-if="error.email" class="text-red-600 text-sm">
            {{ error.email }}
          </span>
        </div>
        <div class="flex flex-col gap-1">
          <label for="password" class="text-sm font-medium text-gray-700">Contraseña</label>
          <input
            class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            id="password"
            v-model="password"
            type="password"
            placeholder="Contraseña"
          />
          <span v-if="error.password" class="text-red-600 text-sm">
            {{ error.password }}
          </span>
        </div>
        <div class="flex flex-col gap-1">
          <label for="dob" class="text-sm font-medium text-gray-700">Fecha de nacimiento</label>
          <input
            class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            id="dob"
            v-model="dob"
            type="date"
            placeholder="Fecha de nacimiento"
          />
          <span v-if="error.dob" class="text-red-600 text-sm">
            {{ error.dob }}
          </span>
        </div>
        <fieldset class="flex flex-col gap-1">
          <legend class="text-sm font-medium text-gray-700">Género</legend>
          <div class="flex items-center gap-4">
            <label class="flex items-center gap-2 text-gray-700">
              <input type="radio" v-model="gender" value="masculino" />
              Masculino
            </label>
            <label class="flex items-center gap-2 text-gray-700">
              <input type="radio" v-model="gender" value="femenino" />
              Femenino
            </label>
          </div>
          <span v-if="error.gender" class="text-red-600 text-sm">{{ error.gender }}</span>
        </fieldset>
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
          {{ isLoading ? 'Creando...' : 'Crear' }}
        </button>
      </form>
    </div>
  </section>
</template>
