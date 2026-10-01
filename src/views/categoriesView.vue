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
  <section class="text-black h-full">
    <p class="text-gray-900 font-medium bg-white rounded-lg mb-3 p-2 text-xl">Categories</p>
    <div class="bg-white p-2 rounded-lg mb-3">
      <div class="flex w-full">
        <div class="flex-auto">
          <p class="text-gray-900 font-medium text-lg mb-2">Crear Categoria</p>
          <form class="flex flex-col max-w-sm" @submit.prevent="handleCategory">
            <input
              class="mb-2 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              v-model="name"
              placeholder="Tipo"
            />
            <label v-if="error.name" class="text-red-600 text-sm mb-2">
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
            <label v-if="error.category" class="text-red-600 text-sm mb-2">
              {{ error.category }}
            </label>
            <label v-if="error.general" class="text-red-600 text-sm mb-2">
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
        <div class="flex-auto">
          <p class="text-gray-900 font-medium text-lg mb-2">Categorias creadas</p>
          <p v-if="isLoading" class="text-gray-900 mt-4 font-large font-bold text-center">
            Cargando...
          </p>
          <ul v-else>
            <li v-for="cat in categoriesStore.categories" :key="cat.id">
              <span class="text-grey-500 font-medium"> {{ cat.category }} - </span> {{ cat.name }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
