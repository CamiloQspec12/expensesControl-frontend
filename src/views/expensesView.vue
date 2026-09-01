<script setup>
import { onMounted, ref } from 'vue'
import { useExpensesStore } from '../stores/expenses'
import { useCategoriesStore } from '@/stores/categories'

const type = ref('')
const value = ref(0.0)
const category = ref()

const expensesStore = useExpensesStore()
const categoriesStore = useCategoriesStore()
onMounted(() => {
  expensesStore.fetchExpenses()
  categoriesStore.fetchCategories()
})

async function handleCreate() {
  await expensesStore.createExpense(type.value, value.value, category.value)
  await expensesStore.fetchExpenses()
  type.value = ''
  value.value = 0.0
  category.value = 0
}
</script>

<template>
  <section class="text-black h-full">
    <p class="text-gray-900 font-medium bg-white rounded-lg mb-3 p-2 text-xl">Gastos</p>
    <div class="bg-white p-2 rounded-lg mb-3">
      <div class="text-gray-900 font-medium text-lg mb-2">Crear gasto</div>
      <form class="flex flex-col max-w-sm" @submit.prevent="handleCreate">
        <input
          class="flex-1 mb-2 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          v-model="type"
          placeholder="Tipo"
        />
        <input
          class="flex-1 mb-2 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          v-model.number="value"
          placeholder="Valor"
        />
        <!-- <input
          class="flex-1 mb-2 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          v-model.number="category"
          placeholder="Categoria"
        /> -->
        <select
          v-model.number="category"
          class="flex-1 mb-2 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option disabled value="0">Selecciona una categoría</option>
          <option v-for="c in categoriesStore.categories" :key="c.id" :value="c.id">
            {{ c.name }}
          </option>
        </select>
        <button
          type="submit pointer"
          class="px-4 py-1 cursor-pointer rounded-lg transition-colors bg-blue-600 hover:bg-blue-700 text-white font-medium"
        >
          Crear
        </button>
      </form>
      <div class="ms-auto"></div>
    </div>
    <div class="p-2 bg-white rounded-lg">
      <p class="text-gray-900 font-medium text-lg mb-1">Latest Expenses</p>
      <ul>
        <li v-for="expenses in expensesStore.expenses" :key="expenses.id">
          {{ expenses.type }} - ${{ expenses.value }}
        </li>
      </ul>
    </div>
  </section>
</template>
