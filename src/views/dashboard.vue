<script setup>
import { useExpensesStore } from '@/stores/expenses'
import { useIncomesStore } from '@/stores/incomes'
import { computed, onMounted } from 'vue'

const expensesStore = useExpensesStore()
const incomesStore = useIncomesStore()
onMounted(() => {
  expensesStore.fetchExpenses()
  incomesStore.fetchIncomes()
})


const recentExpenses = computed(() => {
  return expensesStore.expenses.slice(0, 5)
})


const totalExpenses = computed(() => {
  return expensesStore.expenses.reduce((acc, value) => acc + Number(value.value), 0)
})

const totalIncome = computed(() => {
  return incomesStore.incomes.reduce((acc, value) => acc + Number(value.qt), 0)
})

const balance = computed(() => {
  return totalIncome.value - totalExpenses.value
})

const mostUsedCategories = computed(() => {
  const counts = expensesStore.expenses.reduce((acc, value) => {
    const name = value.category?.name || 'Sin categoria'

    acc[name] = (acc[name] || 0) + 1

    return acc
  }, {})
  return Object.entries(counts).sort((a, b) => b[1] - a[1])
})

function formatDate(dateString) {
  return new Intl.DateTimeFormat('es-CO').format(new Date(dateString))
}
</script>

<template>
  <div class="h-full overflow-y-auto">
    <h1 class="text-2xl font-bold text-gray-900 mb-4">Dashboard</h1>
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
      <div class="bg-white rounded-lg shadow-sm p-4">
        <p class="text-sm text-gray-500">Total de gastos</p>
        <p class="text-2xl font-bold text-red-600 break-words">
          {{ totalExpenses ? incomesStore.formatingCurrency(totalExpenses) : 0 }}
        </p>
      </div>
      <div class="bg-white rounded-lg shadow-sm p-4">
        <p class="text-sm text-gray-500">Total de ingresos</p>
        <p class="text-2xl font-bold text-green-600 break-words">
          {{ totalIncome ? incomesStore.formatingCurrency(totalIncome) : 0 }}
        </p>
      </div>
      <div class="bg-white rounded-lg shadow-sm p-4">
        <p class="text-sm text-gray-500">Balance actual</p>
        <p class="text-2xl font-bold break-words" :class="balance >= 0 ? 'text-green-600' : 'text-red-600'"">
          {{ incomesStore.formatingCurrency(balance) }}
        </p>
      </div>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div class="bg-white rounded-lg shadow-sm p-4 lg:col-span-2">
        <h2 class="text-lg font-medium text-gray-900 mb-3">Últimos gastos</h2>
        <ul>
          <li
            v-for="ex in recentExpenses"
            :key="ex.id"
            class="flex items-center justify-between py-2 border-b border-gray-100"
          >
            <div>
              <p class="text-gray-900">{{ ex.type }}</p>
              <span class="text-xs font-medium px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                {{ ex.category?.name }}
              </span>
            </div>
            <span class="text-red-600 font-medium">
              {{ incomesStore.formatingCurrency(ex.value) }}
            </span>
          </li>
        </ul>
      </div>
      <div class="bg-white rounded-lg shadow-sm p-4">
        <h2 class="text-lg font-medium text-gray-900 mb-3">Categorías más utilizadas</h2>
        <ul>
          <li
            v-for="[name, count] in mostUsedCategories"
            :key="name"
            class="flex justify-between py-2 border-b border-gray-100"
          >
            <span class="text-gray-900"> {{ name }} </span>
            <span class="text-sm text-gray-500"> {{ count }} </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
