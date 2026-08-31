<script setup>
import { onMounted, ref } from 'vue'
import { useExpensesStore } from '../stores/expenses'

const type = ref('')
const value = ref(0.0)
const category = ref()

const expensesStore = useExpensesStore()
onMounted(() => {
  expensesStore.fetchExpenses()
})

async function handleCreate() {
  await expensesStore.createExpense(type.value, value.value, category.value)
  expensesStore.fetchExpenses()
  type.value = ''
  value.value = 0.0
  category.value = 0
}
</script>

<template>
  <section class="text-black h-full">
    <p class="text-gray-900 font-medium bg-white rounded-lg mb-3 p-2 text-xl">Gastos</p>
    <div class="bg-white p-2 rounded-lg">
      <div class="text-gray-900 font-medium text-lg mb-2">Crear gasto</div>
      <form class="flex flex-col" @submit.prevent="handleCreate">
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
        <input
          class="flex-1 mb-2 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          v-model.number="category"
          placeholder="Categoria"
        />
        <button
          type="submit pointer"
          class="px-4 py-1 cursor-pointer rounded-lg transition-colors bg-blue-600 hover:bg-blue-700 text-white font-medium"
        >
          Crear
        </button>
      </form>
      <div class="ms-auto"></div>
    </div>
    <div class="p-2">
      <p>Latest Expenses</p>
      <ul>
        <li v-for="expenses in expensesStore.expenses" :key="expenses.id">
          {{ expenses.type }} - {{ expenses.value }}
        </li>
      </ul>
    </div>
    <div class="flex-auto p-2">dato dos</div>
  </section>
</template>
