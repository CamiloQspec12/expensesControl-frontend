<script setup>
import { onMounted } from 'vue'
import { useExpensesStore } from '../stores/expenses'
const expensesStore = useExpensesStore()
onMounted(() => {
  expensesStore.fetchExpenses()
})
</script>

<template>
  <section class="text-black h-full">
    <div class="flex">
      <div class="text-gray-900 font-medium">Crear gasto</div>
      <div class="ms-auto">
        <button
          class="px-4 py-1 cursor-pointer rounded-lg transition-colors bg-blue-600 hover:bg-blue-700 text-white font-medium"
        >
          Crear
        </button>
      </div>
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
