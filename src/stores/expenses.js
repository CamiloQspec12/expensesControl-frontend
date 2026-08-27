import api from '@/services/api'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useExpensesStore = defineStore('expenses', () => {
  const expenses = ref([])

  async function fetchExpenses() {
    try {
      const response = await api.get('/expenses')
      expenses.value = response.data
      console.log(expenses)
    } catch (e) {
      expenses.value = []
      console.log(e, 'Errror fetching the data')
    }
  }

  async function createExpense(data) {
    try {
      const { type, value, category } = data
      const response = await api.post('/expenses', {
        type: type,
        value: value,
        categoryId: category,
      })
    } catch (e) {
      console.log(e, 'Errror fetching the data')
    }
  }
  return { createExpense, fetchExpenses, expenses }
})
