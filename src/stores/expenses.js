import api from '@/services/api'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useExpensesStore = defineStore('expenses', () => {
  const expenses = ref([])

  async function fetchExpenses() {
    try {
      const response = await api.get('/expenses')
      expenses.value = response.data
    } catch (e) {
      expenses.value = []
      console.log(e, 'Errror fetching the data')
    }
  }

  async function createExpense(type, value, categoryId) {
    try {
      await api.post('/expenses', {
        type: type,
        value: value,
        categoryId: categoryId,
      })
    } catch (e) {
      console.log(e, 'Error fetching the data')
    }
  }
  return { createExpense, fetchExpenses, expenses }
})
