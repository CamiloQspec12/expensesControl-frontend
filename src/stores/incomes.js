import api from '@/services/api'
import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useIncomesStore = defineStore('incomes', () => {
  const incomes = ref([])

  async function fetchIncomes() {
    try {
      const response = await api.get('/incomes')
      incomes.value = response.data
    } catch (e) {
      incomes.value = []
      throw e
    }
  }

  async function createIncomes(source, quantity, frequency) {
    try {
      await api.post('/incomes', {
        source: source,
        qt: quantity,
        frequency: frequency,
      })
      await fetchIncomes()
    } catch (e) {
      throw e
    }
  }

  function formatingCurrency(value) {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
    }).format(value)
  }

  return { fetchIncomes, createIncomes, incomes, formatingCurrency }
})
