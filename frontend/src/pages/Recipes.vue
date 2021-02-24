<script>
import { reactive, ref, computed, watchEffect } from "vue"
import { useStore } from "../store"
import Navbar from "../components/Navbar.vue"
import RecipeCard from "../components/RecipeCard.vue"
import RecipeModal from "../components/RecipeModal.vue"

export default {
  name: "recipes",
  components: { Navbar, RecipeCard, RecipeModal },
  setup() {
    const modal = reactive({
      action: "add",
      modal: false,
      selected: {}
    })
    const keyword = ref("")
    const store = useStore()

    const recipes = computed(() =>
      Object.values(store.recipes)
        .sort((a, b) => (a.name > b.name ? 1 : -1))
        .filter(recipe => recipe.name.toLowerCase().includes(keyword.value.toLowerCase()))
        // .filter(recipe => recipe.name.search(new RegExp(keyword.value, "i") !== -1))
    )

    watchEffect(() => {
      console.log('bro', recipes.value, keyword.value, Object.values(store.recipes).map(a => a.name))
    })

    function add() {
      modal.action = "add"
      modal.selected = {}
      modal.modal = true
    }

    function select(recipe) {
      modal.selected = recipe
      modal.action = "edit"
      modal.modal = true
    }

    return { modal, select, add, recipes, keyword }
  }
}
</script>

<template>
  <div>
    <navbar />

    <div class="container px-4 pt-6">
      <div class="is-flex is-justify-content-space-between">
        <div class="title is-1 pb-4">Recetas</div>
        <button class="button is-primary" @click="add">
          <i class="fa fa-plus" />
        </button>
      </div>

      <div class="columns is-multiline">
          <div class="column is-12">
          <input
            type="text"
            placeholder="Buscar receta"
            class="input"
            v-model="keyword"
          />
        </div>
        <div
          class="column is-3"
          v-for="recipe in recipes"
          :key="recipe.name"
        >
          <recipe-card :recipe="recipe" @click="select(recipe)" />
        </div>
      </div>

      <p class="subtitle" v-if="!Object.keys(recipes).length">
        No tienes recetas aún
      </p>
    </div>

    <recipe-modal
      v-if="modal.modal"
      @close="modal.modal = false"
      :recipe="modal.selected"
      :action="modal.action"
    />
  </div>
</template>
