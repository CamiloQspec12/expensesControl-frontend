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
    error.value.dob = 'la fecha de nacimiento es obligatoria'
  }

  if (!gender.value) {
    error.value.gender = 'El genero es obligatorio'
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
  <section class="h-full flex justify-center items-center">
    <div class="bg-white rounded w-100 p-2">
      <p class="text-gray-900 font-medium text-lg mb-2 text-center">Formulario de registro</p>
      <p v-if="isLoading" class="text-gray-900 font-medium text-lg mb-2 text-center">Cargando...</p>
      <form v-else class="mx-3" @submit.prevent="handleSignUp">
        <p class="mt-3">Nombre</p>
        <input
          class="mb-2 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          v-model="name"
          type="text"
          placeholder="Nombre"
        />
        <label v-if="error.name" class="text-red-600 text-sm mb-2">
          {{ error.name }}
        </label>
        <p class="mt-3">Contraseña</p>
        <input
          class="mb-2 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          v-model="password"
          type="password"
          placeholder="Contraseña"
        />
        <label v-if="error.password" class="text-red-600 text-sm mb-2">
          {{ error.password }}
        </label>
        <p class="mt-3">Correo</p>
        <input
          class="mb-2 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          v-model="email"
          type="email"
          placeholder="Correo"
        />
        <label v-if="error.email" class="text-red-600 text-sm mb-2">
          {{ error.email }}
        </label>
        <p class="mt-3">Fecha de nacimiento</p>
        <input
          class="mb-2 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          v-model="dob"
          type="date"
          placeholder="Fecha de nacimiento"
        />
        <label v-if="error.dob" class="text-red-600 text-sm mb-2">
          {{ error.dob }}
        </label>
        <p class="mt-2">Genero</p>
        <div>
          <input
            class="mb-2 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            v-model="gender"
            id="male"
            value="masculino"
            name="male"
            type="radio"
          />
          <label for="male">Masculino</label>
          <input
            class="mb-2 ms-2 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            v-model="gender"
            id="female"
            value="femenino"
            name="female"
            type="radio"
          />
          <label for="female">Femenino</label>
        </div>
        <label v-if="error.gender" class="text-red-600 text-sm mb-2">
          {{ error.gender }}
        </label>
        <button
          type="submit"
          class="px-4 mt-3 py-1 cursor-pointer rounded-lg transition-colors bg-blue-600 hover:bg-blue-700 text-white font-medium"
        >
          Crear
        </button>
        <label v-if="error.general" class="text-red-600 text-sm mb-2">
          {{ error.general }}
        </label>
      </form>
    </div>
  </section>
</template>
