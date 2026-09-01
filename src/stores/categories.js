import api from '@/services/api'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCategoriesStore = defineStore('categories', () => {
  const categories = ref([])

  async function fetchCategories() {
    try {
      const response = await api.get('/categories')
      categories.value = response.data
    } catch (e) {
      console.log(e)
      categories.value = []
    }
  }

  async function createCategories(name, category) {
    try {
      const response = await api.post('/categories', {
        name: name,
        category: category,
      })
    } catch (e) {
      console.log(e)
    }
  }

  return { fetchCategories, categories }
})
