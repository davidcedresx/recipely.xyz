<script>
import { copy } from "../utils"
import { Ingredients } from "../api"
import { reactive } from "vue"
import { units } from "../constants"
import { useStore } from "../store"
import DeleteConfimationModal from "./DeleteConfimationModal.vue"

export default {
  components: { DeleteConfimationModal },
  name: "IngredientModal",
  props: { ingredient: Object, action: String },
  emits: ["close"],
  setup(props, context) {
    const store = useStore()
    const state = reactive({
      ingredient: copy(props.ingredient),
      delete: false,
      error: null
    })

    function close() {
      context.emit("close")
    }

    function addPresentation() {
      if (!state.ingredient.presentations) state.ingredient.presentations = []

      state.ingredient.presentations.push({})
    }

    function removePresentation(index) {
      state.ingredient.presentations.splice(index, 1)
    }

    function showDeleteModal() {
      state.delete = true
    }

    function closeDeleteModal() {
      state.delete = false
    }

    async function onCreate() {
      const ingredient = await Ingredients.create(copy(state.ingredient))

      store.ingredients[ingredient._id] = ingredient
      close()
    }

    async function onEdit() {
      const ingredient = await Ingredients.update(
        props.ingredient._id,
        copy(state.ingredient)
      )

      store.ingredients[ingredient._id] = ingredient
      close()
    }

    async function onDelete() {
      const ingredient = await Ingredients.delete(props.ingredient._id)

      delete store.ingredients[ingredient._id]
      close()
    }

    async function onSave() {
      if (props.action === "edit") await onEdit()
      if (props.action === "add") await onCreate()
    }

    return {
      state,
      close,
      addPresentation,
      removePresentation,
      showDeleteModal,
      closeDeleteModal,
      onDelete,
      onSave,
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
          {{ action === "add" ? "Create" : "Edit" }} Ingredient
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
              v-model="state.ingredient.name"
              required
            />
          </div>
        </div>
        <div class="field">
          <label class="label">Presentations</label>
          <div
            class="field is-horizontal"
            v-for="(presentation, index) in state.ingredient.presentations"
            :key="index"
          >
            <div class="field-body">
              <div class="field">
                <p class="control has-icons-left is-expanded">
                  <input
                    class="input"
                    type="text"
                    placeholder="price"
                    v-model.number="state.ingredient.presentations[index].price"
                  />
                  <span class="icon is-small is-left">
                    <i class="fa fa-dollar-sign"></i>
                  </span>
                </p>
              </div>
              <div class="field">
                <p class="control is-expanded">
                  <input
                    class="input"
                    type="text"
                    placeholder="amount"
                    v-model.number="
                      state.ingredient.presentations[index].amount
                    "
                  />
                </p>
              </div>
              <div class="field">
                <div class="control is-expanded">
                  <div class="select">
                    <select
                      v-model="state.ingredient.presentations[index].unit"
                    >
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
                  <button
                    class="button is-danger"
                    @click="removePresentation(index)"
                  >
                    <span class="icon">
                      <i class="fas fa-trash"></i>
                    </span>
                  </button>
                </p>
              </div>
            </div>
          </div>
          <div class="control">
            <button class="button" @click="addPresentation">Add</button>
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
