<script setup>
import { useIncomesStore } from '@/stores/incomes'
import { onMounted, ref } from 'vue'

const incomesStore = useIncomesStore()
const quantity = ref(0.0)
const frequency = ref('')

onMounted(() => {
  incomesStore.fetchIncomes()
})

async function handleIncome() {
  await incomesStore.createIncomes(quantity.value, frequency.value)
}
</script>

<template>
  <section class="text-black h-full">
    <p class="text-gray-900 font-medium bg-white rounded-lg mb-3 p-2 text-xl">Ingresos</p>
    <div class="bg-white p-2 rounded-lg mb-3">
      <div class="flex w-full">
        <div class="flex-auto">
          <p class="text-gray-900 font-medium text-lg mb-2">Crear un ingreso</p>
          <form class="flex flex-col max-w-sm" @submit.prevent="handleIncome">
            <input
              v-model.number="quantity"
              type="number"
              class="mb-2 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <select
              v-model="frequency"
              class="mb-2 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option disabled value="0">Selecciona una frecuencia</option>
              <option value="MONTHLY">Mensual</option>
              <option value="WEEKLY">Semanal</option>
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
            <li v-for="inc in incomesStore.incomes" :key="inc.id">
              {{ inc.frequency }} - ${{ inc.qt }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
