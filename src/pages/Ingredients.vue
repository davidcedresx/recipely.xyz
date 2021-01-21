<script>
import { Ingredients } from "../api";
import { onMounted, reactive } from "vue";
import IngredientCard from "../components/IngredientCard.vue";
import Navbar from "../components/Navbar.vue";

export default {
  name: "Ingredients",
  components: { Navbar, IngredientCard },
  setup() {
    const state = reactive({ ingredients: [], loading: false, error: null });

    onMounted(async () => {
      try {
        state.loading = true;
        state.ingredients = await Ingredients.get();
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

  <div class="container px-4 pt-6">
    <div class="is-flex is-justify-content-space-between">
      <div class="title is-1 pb-4">Ingredients</div>
      <button class="button is-primary"><i class="fa fa-plus" /></button>
    </div>

    <p v-if="state.loading" class="subtitle">Fetching</p>
    <p v-if="state.error" class="subtitle">Something went wrong: {{ state.error }}</p>

    <div class="columns is-multiline">
      <div
        class="column is-3"
        v-for="ingredient in state.ingredients"
        :key="ingredient.name"
      >
        <ingredient-card :ingredient="ingredient" />
      </div>
    </div>
  </div>
</template>