<script setup>
import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'

const authStore = useAuthStore()
const name = ref('')
const email = ref('')
const dob = ref('')
const gender = ref('masculino')
const password = ref('')
const error = ref({})

function validate() {
  error.value = {}

  if (!name || typeof name !== 'string' || name.value.trim().lenght <= 6) {
    return (error.value.name = 'Nombre debe tener mas de 6 caracteres')
  }

  if (!email || email.value.trim() == '') {
    return (error.value.email = 'Nombre debe tener mas de 6 caracteres')
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    error.value.email = 'El email no tiene un formato válido'
  }

  if (!dob) {
    return (error.value.dob = 'la fecha de nacimiento es obligatoria')
  }

  if (!gender) {
    return (error.value.gender = 'El genero es obligatorio')
  }

  if (!password || password.value.trim().lenght <= 6) {
    return (error.value.password = 'La contrasena debe tener mas de 6 caracteres')
  }

  return Object.keys(error.value).length == 0
}

async function handleSignUp() {
  if (!validate()) return

  console.log('paso primera validacion')

  try {
    await authStore.signUp({
      name: name.value,
      email: email.value,
      dob: dob.value,
      gender: gender.value,
      password: password.value,
    })
  } catch (e) {
    console.log(e)
  }
}
</script>

<template>
  <section class="h-full flex justify-center items-center">
    <div class="bg-white rounded w-100 p-2">
      <p class="text-gray-900 font-medium text-lg mb-2 text-center">Formulario de registro</p>
      <form class="mx-3" @submit.prevent="handleSignUp">
        <p class="mt-3">Nombre</p>
        <input
          class="mb-2 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          v-model="name"
          type="text"
          placeholder="Nombre"
        />
        <p class="mt-3">Contraseña</p>
        <input
          class="mb-2 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          v-model="password"
          type="password"
          placeholder="Contraseña"
        />
        <p class="mt-3">Correo</p>
        <input
          class="mb-2 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          v-model="email"
          type="email"
          placeholder="Correo"
        />
        <p class="mt-3">Fecha de nacimiento</p>
        <input
          class="mb-2 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          v-model="dob"
          type="date"
          placeholder="Fecha de nacimiento"
        />
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
        <button
          type="submit"
          class="px-4 mt-3 py-1 cursor-pointer rounded-lg transition-colors bg-blue-600 hover:bg-blue-700 text-white font-medium"
        >
          Crear
        </button>
      </form>
    </div>
  </section>
</template>
