import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    { path: '/', component: () => import('./pages/Home.vue') },
    { path: '/init', component: () => import('./pages/Init.vue') }, 
    { path: '/recipes', component: () => import('./pages/Recipes.vue') },
    { path: '/settings', component: () => import('./pages/Settings.vue') },
    { path: '/ingredients', component: () => import('./pages/Ingredients.vue') },
]

const router = createRouter({
    // Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHashHistory(),
    routes,
})

export default router
