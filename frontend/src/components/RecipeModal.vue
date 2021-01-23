<script>
import { copy } from "../utils"
import { units } from "../constants"
import { reactive, onMounted, computed } from "vue"
import { Recipes, Ingredients, Usages } from "../api"
import DeleteConfimationModal from "./DeleteConfimationModal.vue"

export default {
  components: { DeleteConfimationModal },
  name: "RecipeModal",
  props: { recipe: Object, action: String },
  emits: ["close"],
  setup(props, context) {
    const state = reactive({
      recipe: copy(props.recipe),
      usagesBackup: [],
      ingredients: [],
      loading: false,
      delete: false,
      error: null
    })

    onMounted(async () => {
      try {
        state.ingredients = await Ingredients.get()
      } catch (error) {
        state.error = error
      }
      
      // backup to delete them later
      if (props.action === 'edit') {
        state.usagesBackup = copy(state.recipe.usages)
      }
    })

    function close() {
      context.emit("close")
    }

    function addUsage() {
      if (!state.recipe.usages) state.recipe.usages = []

      state.recipe.usages.push({})
    }

    function removeUsage(index) {
      state.recipe.usages.splice(index, 1)
    }

    function showDeleteModal() {
      state.delete = true
    }

    function closeDeleteModal() {
      state.delete = false
    }

    async function onCreate() {
      // usages it's cut of from state cause that will go to another api endpoint
      const usages = copy(state.recipe.usages)
      delete state.recipe.usages

      // register the recipe
      const { _id } = await Recipes.create(copy(state.recipe))

      // register all usages
      await Promise.all(
        usages.map((usage) => {
          usage.recipe = _id
          return Usages.create(usage)
        })
      )
    }

    async function onEdit() {
      // usages it's cut of from state cause that will go to another api endpoint
      const usages = copy(state.recipe.usages)
      delete state.recipe.usages

      // update the recipe
      const { _id } = await Recipes.update(props.recipe._id, copy(state.recipe))

      console.log(state.usagesBackup)
      // remove previous usages
      await Promise.all(state.usagesBackup.map(usage => Usages.delete(usage._id)))

      // register new usages
      await Promise.all(usages.map(usage => {
        usage.recipe = _id
        Usages.create(usage)
      }))
    }

    async function onDelete() {
      await Recipes.delete(props.recipe._id)
      close()
    }

    async function onSave() {
      if (props.action === "edit") await onEdit()
      if (props.action === "add") await onCreate()
      close()
    }

    const unusedIngredients = computed(() => {
      return state.ingredients.filter(
        (ingredient) =>
          !state.recipe.usages.some(
            (usage) => usage.ingredient === ingredient._id
          )
      )
    })

    return {
      state,
      close,
      addUsage,
      removeUsage,
      showDeleteModal,
      closeDeleteModal,
      onDelete,
      onSave,
      unusedIngredients,
      units
    }
  }
}
</script>

<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">
          {{ action === "add" ? "Create" : "Edit" }} Recipe
        </p>
        <button class="delete" aria-label="close" @click="close"></button>
      </header>
      <section class="modal-card-body">
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
          <label class="label">Usages</label>
          <div
            class="field is-horizontal"
            v-for="(presentation, index) in state.recipe.usages"
            :key="index"
          >
            <div class="field-body">
              <div class="field">
                <div class="control is-expanded">
                  <div class="select">
                    <select v-model="state.recipe.usages[index].ingredient">
                      <option
                        v-for="(ingredient, index) in state.ingredients"
                        :key="index"
                        :value="ingredient._id"
                      >
                        {{ ingredient.name }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="field">
                <p class="control is-expanded">
                  <input
                    class="input"
                    type="text"
                    placeholder="amount"
                    v-model="state.recipe.usages[index].amount"
                  />
                </p>
              </div>
              <div class="field">
                <div class="control is-expanded">
                  <div class="select">
                    <select v-model="state.recipe.usages[index].unit">
                      <option
                        v-for="(unit, index) in units"
                        :key="index"
                        :value="unit"
                      >
                        {{ unit }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="field">
                <p class="control is-expanded">
                  <button class="button is-danger" @click="removeUsage(index)">
                    <span class="icon">
                      <i class="fas fa-trash"></i>
                    </span>
                  </button>
                </p>
              </div>
            </div>
          </div>
          <div class="control">
            <button class="button" @click="addUsage">Add</button>
          </div>
        </div>

        <p v-if="state.error" class="has-text-danger">
          {{ state.error }}
        </p>
      </section>
      <footer class="modal-card-foot">
        <div class="is-flex is-justify-content-space-between">
          <button class="button is-primary" @click="onSave">
            <i class="fa fa-save mr-2" /> Save
          </button>
          <button
            class="button is-warning"
            v-if="action === 'edit'"
            @click="showDeleteModal"
          >
            <i class="fa fa-trash mr-2" /> Delete
          </button>
        </div>
      </footer>
    </div>

    <delete-confimation-modal
      v-if="state.delete"
      @confirmed="onDelete"
      @close="closeDeleteModal"
    />
  </div>
</template>
