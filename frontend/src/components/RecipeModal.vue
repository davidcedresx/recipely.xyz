<script>
import { reactive, onMounted } from "vue";
import { Ingredients } from "../api";
import DeleteConfimationModal from "./DeleteConfimationModal.vue";

export default {
  components: { DeleteConfimationModal },
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
      _delete: false,
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

    function confirmateDelete() {
      state._delete = true;
    }

    function closeConfirmateDelete() {
      state._delete = false;
    }

    function deleteRecipe() {
      console.log("deleting recipe", state.selected, "talk to API here");
    }

    return {
      state,
      close,
      addIngredient,
      removeIngredient,
      closeConfirmateDelete,
      deleteRecipe,
    };
  },
};
</script>

<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Recipe</p>
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
          <p v-if="state.error" class="has-text-danger">{{ state.error }}</p>
        </form>
      </section>
      <footer class="modal-card-foot">
        <div class="is-flex is-justify-content-space-between">
          <button class="button is-primary">
            <i class="fa fa-save mr-2" /> Save
          </button>
          <button class="button is-warning" @click="confirmateDelete">
            <i class="fa fa-trash mr-2" /> Delete
          </button>
        </div>
      </footer>
    </div>
  </div>

  <delete-confimation-modal
    v-if="state._delete"
    @confirmed="deleteRecipe"
    @close="closeConfirmateDelete"
  />
</template>
