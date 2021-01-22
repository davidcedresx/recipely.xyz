<script>
import { reactive, onMounted } from "vue";
import { Ingredients, Recipes } from "../api";
import DeleteConfimationModal from "./DeleteConfimationModal.vue";

export default {
  components: { DeleteConfimationModal },
  name: "RecipeModal",
  props: { recipe: Object, action: String },
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
      action: props.action
    });

    onMounted(async () => {
      state.error = null;
      state.loading = true;

      try {
        const ingredients = await Ingredients.get();

        ingredients.forEach((ing) => {
          state.ingredients[ing._id] = ing;
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

    function showDeleteModal() {
      state._delete = true;
    }

    function closeDeleteModal() {
      state._delete = false;
    }

    async function onCreate() {
      const recipe = await Recipes.create({ name: state.recipe.name })
      console.log('created ', recipe)
    }

    async function onEdit() {
      const recipe = await Recipes.update(props.recipe._id, { name: state.recipe.name })
      console.log('updated', recipe)
    }

    async function onDelete() {
      console.log('hola borando papu')
      await Recipes.delete(props.recipe._id)
      close()
    }

    async function onSave() {
      if (state.action === 'edit') await onEdit()
      if (state.action === 'add') await onCreate()
      close()
    }

    return {
      state,
      close,
      addIngredient,
      removeIngredient,
      closeDeleteModal,
      onDelete,
      showDeleteModal,
      onSave
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
          <button class="button is-primary" @click="onSave">
            <i class="fa fa-save mr-2" /> Save
          </button>
          <button class="button is-warning" v-if="state.action === 'edit'" @click="showDeleteModal">
            <i class="fa fa-trash mr-2" /> Delete
          </button>
        </div>
      </footer>
    </div>

    <delete-confimation-modal
      v-if="state._delete"
      @confirmed="onDelete"
      @close="closeDeleteModal"
    />
  </div>
</template>
