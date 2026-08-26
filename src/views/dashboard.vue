<script setup>
import { onMounted } from 'vue'
import { useExpensesStore } from '../stores/expenses'
const expensesStore = useExpensesStore()
onMounted(() => {
  expensesStore.fetchExpenses()
  console.log(expensesStore.fetchExpenses)
})
</script>

<template>
  <section class="text-black flex h-full bg-gray-200">
    <div class="flex-auto p-2">
      <p>Latest Expenses</p>
      <ul>
        <li v-for="expenses in expensesStore.expenses" :key="expenses.id">
          {{ expenses.type }} -- {{ expenses.value }}
        </li>
      </ul>
    </div>
    <div class="flex-auto p-2">dato dos</div>
  </section>
</template>
