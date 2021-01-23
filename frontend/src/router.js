import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './pages/Home.vue'
import Recipes from './pages/Recipes.vue'
import Ingredients from './pages/Ingredients.vue'
import Settings from './pages/Settings.vue'

const routes = [
    { path: '/', component: Home },
    { path: '/recipes', component: Recipes },
    { path: '/settings', component: Settings },
    { path: '/ingredients', component: Ingredients },
]

const router = createRouter({
    // Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHashHistory(),
    routes,
})

export default router
