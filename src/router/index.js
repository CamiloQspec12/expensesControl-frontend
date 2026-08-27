import CategoriesView from '@/views/categoriesView.vue'
import Dashboard from '@/views/dashboard.vue'
import ExpensesView from '@/views/expensesView.vue'
import IncomesView from '@/views/incomesView.vue'
import LoginView from '@/views/loginView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      component: LoginView,
    },
    {
      path: '/dashboard',
      component: Dashboard,
      meta: { requiresAuth: true },
    },
    {
      path: '/expenses',
      component: ExpensesView,
      meta: { requiresAuth: true },
    },
    {
      path: '/incomes',
      component: IncomesView,
      meta: { requiresAuth: true },
    },
    {
      path: '/categories',
      component: CategoriesView,
      meta: { requiresAuth: true },
    },
  ],
})

router.beforeEach((to) => {
  const token = localStorage.getItem('token')
  if (to.meta.requiresAuth && !token) return '/login'
  if (to.path === '/login' && token) return '/dashboard'
})

export default router
