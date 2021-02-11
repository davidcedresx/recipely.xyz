import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    { path: '/', name: 'home', component: () => import('./pages/Home.vue') },
    { path: '/init', name: 'init', component: () => import('./pages/Init.vue') }, 
    { path: '/recipes', name: 'recipes', component: () => import('./pages/Recipes.vue') },
    { path: '/settings', name: 'settings', component: () => import('./pages/Settings.vue') },
    { path: '/ingredients', name: 'ingredients', component: () => import('./pages/Ingredients.vue') },
]

const router = createRouter({
    // Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHashHistory(),
    routes,
})

export default router
