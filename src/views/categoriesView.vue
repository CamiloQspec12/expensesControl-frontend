<script setup>
import { useCategoriesStore } from '@/stores/categories'
import { onMounted, ref } from 'vue'

const name = ref('')
const category = ref('')

const categoriesStore = useCategoriesStore()

onMounted(() => {
  categoriesStore.fetchCategories()
})

async function handleCategory() {
  await categoriesStore.createCategories(name.value, category.value)
  name.value = ''
  category.value = ''
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
            <select
              v-model="category"
              class="mb-2 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option disabled value="">Selecciona un tipo</option>
              <option value="FIXED">Fijo</option>
              <option value="DEBT">Deuda</option>
              <option value="HORMIGA">Gasto hormiga</option>
              <option value="OTHER">Otro</option>
            </select>
            <button
              type="submit pointer"
              class="px-4 py-1 cursor-pointer rounded-lg transition-colors bg-blue-600 hover:bg-blue-700 text-white font-medium"
            >
              Crear
            </button>
          </form>
        </div>
        <div class="flex-auto">
          <p class="text-gray-900 font-medium text-lg mb-2">Categorias creadas</p>
          <ul>
            <li v-for="cat in categoriesStore.categories" :key="cat.id">{{ cat.name }}</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
