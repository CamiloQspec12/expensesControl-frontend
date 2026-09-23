<script setup>
import { useIncomesStore } from '@/stores/incomes'
import { onMounted, ref } from 'vue'

const incomesStore = useIncomesStore()
const source = ref('')
const quantity = ref(0.0)
const frequency = ref('0')
const error = ref({})

function validate() {
  error.value = {}

  if (!source.value || source.value.trim() === '') {
    error.value.source = 'El nombre del ingreso es obligatorio'
  } else if (source.value.trim().length <= 3) {
    error.value.source = 'El nombre debe tener mas de 3 caracteres'
  }

  if (!quantity.value || quantity.value <= 0.0) {
    error.value.quantity = 'La cantidad del ingreso debe ser mayor a 0'
  }

  if (!frequency.value || frequency.value === '0') {
    error.value.frequency = 'La frecuencia del ingreso es obligatorio'
  }

  return Object.keys(error.value).length === 0
}

onMounted(() => {
  incomesStore.fetchIncomes()
})

async function handleIncome() {
  if (!validate()) return

  await incomesStore.createIncomes(quantity.value, frequency.value, source.value)
  quantity.value = ''
  frequency.value = '0'
  source.value = ''
}
</script>

<template>
  <section class="text-black h-full">
    <p class="text-gray-900 font-medium bg-white rounded-lg mb-3 p-2 text-xl">Ingresos</p>
    <div class="mb-3">
      <div class="flex w-full">
        <div class="flex-auto bg-white rounded-lg mr-3 p-2">
          <p class="text-gray-900 font-medium text-lg mb-2">Crear un ingreso</p>
          <form class="flex flex-col max-w-sm" @submit.prevent="handleIncome">
            <input
              v-model="source"
              placeholder="Nombre del ingreso"
              class="mb-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <label v-if="error.source" class="text-red-600 text-sm mb-2">
              {{ error.source }}
            </label>
            <input
              v-model.number="quantity"
              type="number"
              step="0.01"
              class="flex-1 mb-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <label v-if="error.quantity" class="text-red-600 text-sm mb-2">
              {{ error.quantity }}
            </label>
            <select
              v-model="frequency"
              class="mb-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option disabled value="0">Selecciona una frecuencia</option>
              <option value="MONTHLY">Mensual</option>
              <option value="WEEKLY">Semanal</option>
            </select>
            <label v-if="error.frequency" class="text-red-600 text-sm mb-2">
              {{ error.frequency }}
            </label>
            <button
              type="submit pointer"
              class="px-4 py-1 cursor-pointer rounded-lg transition-colors bg-blue-600 hover:bg-blue-700 text-white font-medium"
            >
              Crear
            </button>
          </form>
        </div>
        <div class="flex-auto bg-white rounded-lg p-2">
          <p class="text-gray-900 font-medium text-lg mb-2">Ingresos</p>
          <ul>
            <li v-for="inc in incomesStore.incomes" :key="inc.id">
              <span class="font-medium text-gray-500 font-bold">{{ inc.source }}</span> -
              {{ inc.frequency }} -
              <span class="text-red-600 font-medium">
                {{ incomesStore.formatingCurrency(inc.qt) }}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
