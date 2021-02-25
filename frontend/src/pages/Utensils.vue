<script>
import Navbar from "../components/Navbar.vue"

export default {
  name: "Utensils",
  components: { Navbar },
  setup() {
    return { add: null, keyword: "" }
  }
}
</script>

<template>
  <div>
    <navbar />

    <div class="container px-4 pt-6">
      <div class="is-flex is-justify-content-space-between">
        <div class="title is-1 pb-4">Utensilios</div>
        <button class="button is-primary has-text-white" @click="add">
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
        <!-- <div
          class="column is-3"
          v-for="recipe in recipes"
          :key="recipe.name"
        >
          <recipe-card :recipe="recipe" @click="select(recipe)" />
        </div> -->
      </div>

      <!-- <p class="subtitle" v-if="!Object.keys(recipes).length">
        No tienes recetas aún
      </p> -->
    </div>
  </div>
</template>