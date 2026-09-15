<script setup>
import { useExpensesStore } from '@/stores/expenses'
import { useIncomesStore } from '@/stores/incomes'
import { computed, onMounted, ref } from 'vue'

const expensesStores = useExpensesStore()
const incomesStore = useIncomesStore()
onMounted(() => {
  expensesStores.fetchExpenses()
  incomesStore.fetchIncomes()
})

const initialValue = ref({})

const recentExpenses = computed(() => {
  return expensesStores.expenses.slice(0, 5)
})

// const recentIncomes = computed(() => {
//   return incomesStore.incomes.slice(0, 3)
// })

const totalExpenses = computed(() => {
  return expensesStores.expenses.reduce((acc, value) => acc + Number(value.value), 0)
})

const totalIncome = computed(() => {
  return incomesStore.incomes.reduce((acc, value) => acc + Number(value.qt), 0)
})

const balance = computed(() => {
  return totalIncome.value - totalExpenses.value
})

const mostUsedCategories = computed(() => {
  const counts = expensesStores.expenses.reduce((acc, value) => {
    const name = value.category.name
    acc[name] = (acc[name] || 0) + 1
    return acc
  }, initialValue.value)
  return Object.entries(counts).sort((a, b) => b[1] - a[1])
})

function formatDate(dateString) {
  return new Intl.DateTimeFormat('es-CO').format(new Date(dateString))
}
</script>

<template>
  <section class="text-black flex h-full">
    <div class="flex w-full flex-col">
      <p class="text-gray-900 font-medium bg-white rounded-lg mb-3 p-2 text-xl">Dashboard</p>
      <div class="flex">
        <div class="flex-auto bg-white rounded-lg p-1 ps-2 me-2">
          <p class="text-gray-900 font-medium bg-white rounded-lg mb-3 text-xl">Ultimos Gastos</p>
          <div
            class="flex-auto mb-3 bg-white border border-gray-200 rounded-xl shadow-sm p-2 min-h-12 me-1"
          >
            <span class="text-gray-900 font-medium"> Total de gastos </span>
            <span class="text-3xl font-bold text-red-600">
              {{ totalExpenses ? incomesStore.formatingCurrency(totalExpenses) : 0 }}
            </span>
          </div>
          <div class="flex">
            <div
              v-for="ex in recentExpenses"
              :key="ex.id"
              class="flex-auto bg-white border border-gray-200 rounded-xl shadow-sm p-2 min-h-24 me-1"
            >
              <p class="text-gray-900 font-medium">
                {{ ex.type }}
              </p>
              <p class="text-gray-500 text-sm">
                {{ ex.category?.name }}
              </p>
              <p class="text-3xl font-bold text-red-600">
                {{ incomesStore.formatingCurrency(ex.value) }}
              </p>
            </div>
          </div>
        </div>
        <div class="flex-auto bg-white rounded-lg p-1">
          <p class="text-gray-900 font-medium bg-white rounded-lg mb-3 text-xl">Total Ingresos</p>
          <div
            class="flex-auto mb-3 bg-white border border-gray-200 rounded-xl shadow-sm p-2 min-h-12 me-1"
          >
            <span class="text-gray-900 font-medium">
              Total:
              <span class="text-3xl font-bold text-red-600">
                {{ totalIncome ? incomesStore.formatingCurrency(totalIncome) : 0 }}
              </span>
            </span>
          </div>
          <p class="text-gray-900 font-medium bg-white rounded-lg mb-3 text-xl">Balance</p>
          <div
            class="flex-auto mb-3 bg-white border border-gray-200 rounded-xl shadow-sm p-2 min-h-12 me-1"
          >
            <span class="text-3xl font-bold text-gray-900">
              Balance actual:
              <span :class="`${balance >= 0 ? 'text-green-600' : 'text-red-600'}  font-semibold`">
                {{ incomesStore.formatingCurrency(balance) }}
              </span>
            </span>
          </div>
          <!-- <div
            v-for="inc in recentIncomes"
            :key="inc.id"
            class="flex-auto bg-white py-2 px-2 mb-2 border border-gray-200 rounded-xl shadow-sm me-1"
          >
            <p class="text-gray-900 font-medium">
              {{ inc.source }}
            </p>
            <p class="text-gray-500 text-sm">
              {{ formatDate(inc.createAt) }}
            </p>
            <p class="text-red-600 font-semibold">
              {{ incomesStore.formatingCurrency(inc.qt) }}
            </p>
          </div> -->
        </div>
      </div>
      <div class="bg-white rounded-lg p-1 ps-2 me-2 mt-3">
        <p class="text-gray-900 font-medium bg-white rounded-lg mb-3 text-xl">
          Categorias mas utilizadas
        </p>
        <div
          class="flex-auto w-50 bg-white py-1 px-1 mb-2 border border-gray-200 rounded-lg shadow-sm me-1"
          v-for="[name, count] in mostUsedCategories"
          :key="name"
        >
          {{ name }} - {{ count }}
        </div>
      </div>
    </div>
  </section>
</template>
