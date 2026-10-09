<script setup>
import { useCategoriesStore } from '@/stores/categories'
import { onMounted, ref } from 'vue'

const name = ref('')
const category = ref('0')
const error = ref({})
const isLoading = ref(false)
const categoriesStore = useCategoriesStore()

onMounted(async () => {
  isLoading.value = true
  try {
    await categoriesStore.fetchCategories()
  } catch (e) {
    console.error(e)
  } finally {
    isLoading.value = false
  }
})

function validate() {
  error.value = {}

  if (!name.value || name.value.trim() === '') {
    error.value.name = 'El nombre de la categoria es obligatorio'
  } else if (name.value.trim().length <= 3) {
    error.value.name = 'El nombre debe tener mas de 3 caracteres'
  }

  if (!category.value || category.value === '0') {
    error.value.category = 'El tipo de categoria es obligatorio'
  }

  return Object.keys(error.value).length === 0
}

async function handleCategory() {
  if (!validate()) return
  isLoading.value = true
  try {
    await categoriesStore.createCategories(name.value, category.value)
    name.value = ''
    category.value = '0'
  } catch (e) {
    if (!e.response) {
      error.value.general = 'No se pudo conectar el servidor'
    } else if (e.response?.status === 400) {
      error.value.general = e.response.data.message
    } else {
      error.value.general = 'Hay un problema en el servidor, intentalo mas tarde'
    }
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <section class="h-full flex flex-col">
    <p class="text-2xl font-bold text-gray-900 mb-4">Categories</p>
    <div class="flex flex-col md:flex-row gap-4 flex-1 min-h-0">
      <div class="bg-white rounded-lg shadow-sm p-4 md:p-6 w-full md:w-1/3">
        <p class="text-lg font-medium text-gray-900 mb-3">Crear Categoria</p>
        <form class="flex flex-col" @submit.prevent="handleCategory">
          <input
            class="flex-1 w-full mb-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            v-model="name"
            placeholder="Tipo"
          />
          <label v-if="error.name" class="text-red-600 text-sm">
            {{ error.name }}
          </label>
          <select
            v-model="category"
            class="mb-2 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option disabled value="0">Selecciona un tipo</option>
            <option value="FIXED">Fijo</option>
            <option value="DEBT">Deuda</option>
            <option value="HORMIGA">Gasto hormiga</option>
            <option value="OTHER">Otro</option>
          </select>
          <label v-if="error.category" class="text-red-600 text-sm">
            {{ error.category }}
          </label>
          <label
            v-if="error.general"
            class="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-3 py-2"
          >
            {{ error.general }}
          </label>
          <button
            type="submit"
            :disabled="isLoading"
            class="px-4 py-1 cursor-pointer rounded-lg transition-colors bg-blue-600 hover:bg-blue-700 text-white font-medium"
          >
            {{ isLoading ? 'Creando' : 'Crear' }}
          </button>
        </form>
      </div>
      <div class="bg-white rounded-lg shadow-sm flex flex-col min-h-0 p-4 md:p-6 w-full md:w-2/3">
        <p class="text-lg font-medium text-gray-900 mb-3">Categorias creadas</p>
        <p v-if="isLoading" class="text-gray-900 mt-4 font-large font-bold text-center">
          Cargando...
        </p>
        <ul class="overflow-y-auto flex-1" v-else>
          <li
            v-for="cat in categoriesStore.categories"
            :key="cat.id"
            class="flex items-center justify-between py-2 border-b border-gray-100"
          >
            <div class="flex w-full">
              <p class="text-gray-900">{{ cat.category }}</p>
              <span
                class="text-xs ms-auto font-medium px-2 py-1 bg-gray-100 text-gray-600 rounded-full"
                >{{ cat.name }}</span
              >
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
