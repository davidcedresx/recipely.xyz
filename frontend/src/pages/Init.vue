<script>
import { onMounted, ref } from 'vue'
import { useStore, resetStore } from '../store'
import { useRouter } from 'vue-router'
import * as api from '../api'
import Loader from "../components/Loader.vue"

export default {
  name: "Init",
  components: { Loader },
  setup() {
    const msg = ref('')
    const store = useStore()
    const router = useRouter()

    onMounted(async () => {
        try {
            resetStore()

            msg.value = 'Fetching usages'
            const usages = await api.Usages.get()
            usages.forEach(usage => store.usages[usage._id] = usage)

            msg.value = 'Fetching ingredients'
            const ingredients = await api.Ingredients.get()
            ingredients.forEach(ingredient => store.ingredients[ingredient._id] = ingredient)

            msg.value = 'Fetching recipes'
            const recipes = await api.Recipes.get()
            recipes.forEach(recipe => store.recipes[recipe._id] = recipe)

            msg.value = 'Fetching your preferenes'
            const user = await api.User.get()
            store.user = user

            router.push('/recipes')
        }
        catch(error){
            console.log(error)
        }
    })

    return { msg }
  }
}
</script>

<template>
  <div class="hero is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <loader />
        <p class="subtitle">{{ msg }}</p>
      </div>
    </div>
  </div>
</template>
