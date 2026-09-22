<script setup>
import { onMounted, ref } from 'vue'
import { useExpensesStore } from '../stores/expenses'
import { useCategoriesStore } from '@/stores/categories'
import { useIncomesStore } from '@/stores/incomes'

const type = ref('')
const value = ref(0.0)
const category = ref(0)
const error = ref({})

//Create instancies
const expensesStore = useExpensesStore()
const categoriesStore = useCategoriesStore()
const incomesStore = useIncomesStore()
// Create Instancies

onMounted(() => {
  expensesStore.fetchExpenses()
  categoriesStore.fetchCategories()
})

function validate() {
  error.value = {}

  if (!type.value || type.value.trim() === '') {
    error.value.type = 'El tipo es obligatorio'
  } else if (type.value.trim().length <= 3) {
    error.value.type = 'Tipo tiene que tener mas de 3 caracteres'
    console.log('Entra', error.value.type)
  }

  if (!value.value || value.value <= 0) {
    error.value.value = 'El valor debe ser mayor a 0'
  }

  if (!category.value || category.value === '0') {
    error.value.category = 'Debes seleccionar una categoria'
  }

  return Object.keys(error.value).length === 0
}

async function handleCreate() {
  if (!validate()) return

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
    <div class="flex w-full">
      <div class="bg-white flex-auto me-2 p-2 rounded-lg mb-3">
        <div class="text-gray-900 font-medium text-lg mb-2">Crear gasto</div>
        <form class="flex flex-col max-w-sm" @submit.prevent="handleCreate">
          <input
            class="flex-1 mb-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            v-model="type"
            placeholder="Tipo"
          />
          <label v-if="error.type" class="text-red-600 text-sm mb-2"> {{ error.type }} </label>
          <input
            class="flex-1 mb-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            v-model.number="value"
            placeholder="Valor"
          />
          <label v-if="error.value" class="text-red-600 text-sm mb-2">
            {{ error.value }}
          </label>
          <select
            v-model.number="category"
            class="flex-1 mb-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option disabled value="0">Selecciona una categoría</option>
            <option v-for="c in categoriesStore.categories" :key="c.id" :value="c.id">
              {{ c.name }}
            </option>
          </select>
          <label v-if="error.category" class="text-red-600 text-sm mb-2">
            {{ error.category }}
          </label>
          <button
            type="submit pointer"
            class="px-4 py-1 cursor-pointer rounded-lg transition-colors bg-blue-600 hover:bg-blue-700 text-white font-medium"
          >
            Crear
          </button>
        </form>
        <div class="ms-auto"></div>
      </div>
      <div class="p-2 flex-auto bg-white rounded-lg">
        <p class="text-gray-900 font-medium text-lg mb-1">Latest Expenses</p>
        <ul>
          <li v-for="expenses in expensesStore.expenses" :key="expenses.id">
            {{ expenses.type }} -
            <span class="text-red-600 font-medium">
              {{ incomesStore.formatingCurrency(expenses.value) }}</span
            >
            <p class="text-gray-500 font-small">
              {{ expenses.category?.name }}
            </p>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
