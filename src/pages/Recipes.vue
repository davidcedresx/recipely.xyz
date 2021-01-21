<script>
import { Recipes } from "../api";
import { onMounted, reactive } from "vue";
import IngredientCard from "../components/IngredientCard.vue";
import Navbar from "../components/Navbar.vue";

export default {
  name: "recipes",
  components: { Navbar, IngredientCard },
  setup() {
    const state = reactive({ recipes: [], loading: false, error: null });

    onMounted(async () => {
      try {
        state.loading = true;
        state.recipes = await Recipes.get();
      } catch (error) {
        state.error = error.message;
      }

      state.loading = false;
    });

    return { state };
  },
};
</script>

<template>
  <navbar />

  <div class="container pt-6">
    <div class="title is-1 pb-4">Recipes</div>

    <p v-if="state.loading" class="subtitle">Fetching</p>
    <p v-if="state.error" class="subtitle">Something went wrong: {{ state.error }}</p>

    <div class="columns is-multiline">
      <div
        class="column"
        v-for="recipe in state.recipes"
        :key="recipe.name"
      >
        <ingredient-card :ingredient="recipe" />
      </div>
    </div>
  </div>
</template>