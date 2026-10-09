<script setup>
import { useIncomesStore } from '@/stores/incomes'
import { onMounted, ref } from 'vue'
import { Plus } from 'lucide-vue-next'

const incomesStore = useIncomesStore()
const source = ref('')
const quantity = ref(0.0)
const frequency = ref('0')
const error = ref({})
const isLoading = ref(false)

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

onMounted(async () => {
  isLoading.value = true

  try {
    await incomesStore.fetchIncomes()
  } catch (e) {
    console.error(e)
  } finally {
    isLoading.value = false
  }
})

async function handleIncome() {
  if (!validate()) return
  isLoading.value = true
  try {
    await incomesStore.createIncomes(source.value, quantity.value, frequency.value)
    quantity.value = '0'
    frequency.value = '0'
    source.value = ''
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
    <p class="text-2xl font-bold text-gray-900 mb-4">Ingresos</p>
    <div class="flex flex-col md:flex-row gap-4 flex-1 min-h-0">
      <div class="bg-white rounded-lg shadow-sm p-4 md:p-6 w-full md:w-1/3">
        <p class="text-lg font-medium text-gray-900 mb-3">Crear un ingreso</p>
        <form class="flex flex-col" @submit.prevent="handleIncome">
          <input
            v-model="source"
            placeholder="Nombre del ingreso"
            class="flex-1 w-full mb-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <label v-if="error.source" class="text-red-600 text-sm">
            {{ error.source }}
          </label>
          <input
            v-model.number="quantity"
            type="number"
            step="0.01"
            class="flex-1 w-full mb-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <label v-if="error.quantity" class="text-red-600 text-sm">
            {{ error.quantity }}
          </label>
          <select
            v-model="frequency"
            class="flex-1 w-full mb-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option disabled value="0">Selecciona una frecuencia</option>
            <option value="MONTHLY">Mensual</option>
            <option value="WEEKLY">Semanal</option>
          </select>
          <label v-if="error.frequency" class="text-red-600 text-sm">
            {{ error.frequency }}
          </label>
          <label
            v-if="error.general"
            class="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-3 py-2 mb-2"
          >
            {{ error.general }}
          </label>
          <button
            type="submit"
            :disabled="isLoading"
            class="px-4 flex items-center gap-2 leading-none justify-center py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ isLoading ? ' Creando ' : 'Crear' }}
            <Plus class="w-4 h-4 shrink-0 translate-y-px" :stroke-width="2.5" />
          </button>
        </form>
      </div>
      <div class="bg-white rounded-lg shadow-sm flex flex-col min-h-0 p-4 md:p-6 w-full md:w-2/3">
        <p class="text-lg font-medium text-gray-900 mb-3">Ingresos</p>
        <p v-if="isLoading" class="text-gray-900 mt-4 font-large font-bold text-center">
          Cargando...
        </p>
        <ul class="overflow-y-auto flex-1" v-else>
          <li
            v-for="inc in incomesStore.incomes"
            :key="inc.id"
            class="flex items-center justify-between py-2 border-b border-gray-100"
          >
            <div>
              <p class="text-gray-900">{{ inc.frequency }}</p>
              <span class="text-xs font-medium px-2 py-1 bg-gray-100 text-gray-600 rounded-full">{{
                inc.source
              }}</span>
            </div>
            <span class="text-red-600 font-medium">
              {{ incomesStore.formatingCurrency(inc.qt) }}
            </span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
