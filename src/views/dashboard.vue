<script setup>
import { useExpensesStore } from '@/stores/expenses'
import { onMounted, ref } from 'vue'

const expensesStores = useExpensesStore()
onMounted(() => {
  expensesStores.fetchExpenses()
})

const lastExpenses = ref([])
</script>

<template>
  <section class="text-black flex h-full">
    <div class="flex w-full flex-col">
      <p class="text-gray-900 font-medium bg-white rounded-lg mb-3 p-2 text-xl">Dashboard</p>
      <div class="flex">
        <div class="flex-auto bg-white rounded-lg p-1 ps-2 me-2">
          <p class="text-gray-900 font-medium bg-white rounded-lg mb-3 text-xl">Ultimos Gastos</p>
          <div class="flex">
            <div
              v-for="c in 5"
              class="flex-auto bg-white border border-gray-200 rounded-xl shadow-sm p-2 min-h-24 me-1"
            >
              dawdwad
            </div>
          </div>
        </div>
        <div class="flex-auto bg-white rounded-lg p-1">dawdw</div>
      </div>
    </div>
  </section>
</template>
