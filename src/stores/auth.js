import { defineStore } from 'pinia'
import api from '@/services/api'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const token = ref('')
  const user = ref([])

  async function login(email, password) {
    try {
      const response = await api.post('/login', {
        email: email,
        password: password,
      })
      token.value = response.data.token
      localStorage.setItem('token', token)
    } catch (e) {
      console.log(e)
    }
  }

  function logout() {
    token.value = ''
    localStorage.removeItem('token')
  }

  function loadFromStorage() {
    token.value = localStorage.getItem('token') || ''
  }

  return { token, user, login, logout, loadFromStorage }
})
