<script>
import { reactive, onMounted } from "vue";
import { Ingredients } from "../api";

export default {
  name: "RecipeModal",
  props: { recipe: Object },
  emits: ["close"],
  setup(props, context) {
    const state = reactive({
      recipe: {
        name: props.recipe.name,
        ingredients: [],
      },
      ingredients: {},
      loading: false,
      error: null,
    });

    onMounted(async () => {
      state.error = null;
      state.loading = true;

      try {
        const ingredients = await Ingredients.get();

        ingredients.forEach((ing) => {
          state.ingredients[ing.id] = ing;
        });
      } catch (error) {
        state.error = error.message;
        console.log("something went wrong", error);
      }

      state.loading = false;
    });

    function close() {
      context.emit("close");
    }

    function addIngredient(event) {
      const id = event.target.value;

      if (!state.recipe.ingredients.includes(id)) {
        state.recipe.ingredients.push(id);
      }
    }

    function removeIngredient(event) {
      const target_id = event.target.value;
      state.recipe.ingredients = state.recipe.ingredients.filter(
        (id) => id !== target_id
      );
    }

    return {
      state,
      close,
      addIngredient,
      removeIngredient,
    };
  },
};
</script>

<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Create recipe</p>
        <button class="delete" aria-label="close" @click="close"></button>
      </header>
      <section class="modal-card-body">
        <form @submit.prevent="submit">
          <div class="field">
            <label class="label">Name</label>
            <div class="control">
              <input
                class="input"
                type="text"
                placeholder="name"
                v-model="state.recipe.name"
                required
              />
            </div>
          </div>
          <div class="field">
            <label class="label">Ingredients</label>
            <p v-if="state.loading">Loading</p>
            <div v-else class="control">
              <div class="select">
                <select @change="addIngredient">
                  <option
                    v-for="(ingredient, id) in state.ingredients"
                    :key="id"
                    :value="id"
                  >
                    {{ ingredient.name }}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div class="tags">
            <span
              v-for="ingredientId in state.recipe.ingredients"
              :key="ingredientId"
              class="tag is-medium"
            >
              {{ state.ingredients[ingredientId].name }}
              <button
                class="delete is-small"
                @click="removeIngredient"
                :value="ingredientId"
              ></button>
            </span>
          </div>
          <!-- <p v-if="state.error" class="has-text-danger">{{ state.error }}</p> -->
        </form>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-primary">Save</button>
      </footer>
    </div>
  </div>
</template>