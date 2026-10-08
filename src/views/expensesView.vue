<script setup>
import { onMounted, ref } from 'vue'
import { useExpensesStore } from '../stores/expenses'
import { useCategoriesStore } from '@/stores/categories'
import { useIncomesStore } from '@/stores/incomes'
import { Plus } from 'lucide-vue-next'

const type = ref('')
const value = ref(0.0)
const category = ref(0)
const error = ref({})
const isLoading = ref(false)

//Create instancies
const expensesStore = useExpensesStore()
const categoriesStore = useCategoriesStore()
const incomesStore = useIncomesStore()
// Create Instancies

onMounted(async () => {
  isLoading.value = true
  try {
    await expensesStore.fetchExpenses()
    await categoriesStore.fetchCategories()
  } catch (e) {
    console.error(e)
  } finally {
    isLoading.value = false
  }
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

  isLoading.value = true
  try {
    await expensesStore.createExpense(type.value, value.value, category.value)
    await expensesStore.fetchExpenses()
    type.value = ''
    value.value = 0.0
    category.value = 0
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
    <h1 class="text-2xl font-bold text-gray-900 mb-4">Gastos</h1>
    <div class="flex flex-col md:flex-row gap-4 flex-1 min-h-0">
      <div class="bg-white rounded-lg shadow-sm p-4 md:p-6 w-full md:w-1/3">
        <div class="text-lg font-medium text-gray-900 mb-3">Crear gasto</div>
        <form class="flex flex-col" @submit.prevent="handleCreate">
          <input
            class="flex-1 w-full mb-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            v-model="type"
            placeholder="Tipo"
          />
          <label
            v-if="error.type"
            class="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-3 py-2 mb-2"
          >
            {{ error.type }}
          </label>
          <input
            class="flex-1 w-full mb-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            v-model.number="value"
            placeholder="Valor"
          />
          <label
            v-if="error.value"
            class="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-3 py-2 mb-2"
          >
            {{ error.value }}
          </label>
          <select
            v-model.number="category"
            class="flex-1 w-full mb-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option disabled value="0">Selecciona una categoría</option>
            <option v-for="c in categoriesStore.categories" :key="c.id" :value="c.id">
              {{ c.name }}
            </option>
          </select>
          <label
            v-if="error.category"
            class="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-3 py-2 mb-2"
          >
            {{ error.category }}
          </label>
          <label
            v-if="error.general"
            class="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-3 py-2 mb-2"
          >
            {{ error.general }}
          </label>
          <button
            type="submit pointer"
            class="px-4 flex items-center gap-2 leading-none justify-center py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            :disabled="isLoading"
          >
            {{ isLoading ? 'Creando' : 'Crear' }}
            <Plus class="w-4 h-4 shrink-0 translate-y-px" :stroke-width="2.5" />
          </button>
        </form>
      </div>
      <div class="bg-white rounded-lg shadow-sm flex flex-col min-h-0 p-4 md:p-6 w-full md:w-2/3">
        <p class="text-lg font-medium text-gray-900 mb-3">Ultimos gastos</p>
        <p v-if="isLoading" class="text-gray-900 mt-4 font-large font-bold text-center">
          Cargando....
        </p>
        <ul class="overflow-y-auto flex-1" v-else>
          <li
            v-for="expenses in expensesStore.expenses"
            :key="expenses.id"
            class="flex items-center justify-between py-2 border-b border-gray-100"
          >
            <div>
              <p class="text-gray-900">{{ expenses.type }}</p>
              <span class="text-xs font-medium px-2 py-1 bg-gray-100 text-gray-600 rounded-full">{{
                expenses.category?.name
              }}</span>
            </div>
            <span class="text-red-600 font-medium">
              {{ incomesStore.formatingCurrency(expenses.value) }}
            </span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
