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
      categories.value = []
      throw e
    }
  }

  async function createCategories(name, category) {
    try {
      await api.post('/categories', {
        name: name,
        category: category,
      })
      await fetchCategories()
    } catch (e) {
      throw e
    }
  }

  return { fetchCategories, categories, createCategories }
})
