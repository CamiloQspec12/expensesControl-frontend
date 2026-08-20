import { defineStore } from 'pinia'
import axios from 'axios'
export const auth = defineStore('auth', () => {
  const token = ref('')
  const user = ref([])

  async function login(email, password) {
    try {
      const response = await axios.post('/login', {
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
