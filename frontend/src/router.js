import { createRouter, createMemoryHistory } from 'vue-router'

const routes = [
    { path: '/', name: 'home', component: () => import('./pages/Home.vue') },
    { path: '/init', name: 'init', component: () => import('./pages/Init.vue') },
    { path: '/recipes', name: 'recipes', component: () => import('./pages/Recipes.vue') },
    { path: '/settings', name: 'settings', component: () => import('./pages/Settings.vue') },
    { path: '/ingredients', name: 'ingredients', component: () => import('./pages/Ingredients.vue') },
    { path: '/utensils', name: 'utensils', component: () => import('./pages/Utensils.vue') },
]

const router = createRouter({
    history: createMemoryHistory(),
    routes,
})

export default router
