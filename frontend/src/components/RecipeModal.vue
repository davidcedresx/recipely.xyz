<script>
import { copy } from "../utils"
import { reactive } from "vue"
import { Recipes, Usages } from "../api"
import { units } from "../constants"
import { useStore } from "../store"
import DeleteConfimationModal from "./DeleteConfimationModal.vue"

export default {
  components: { DeleteConfimationModal },
  name: "RecipeModal",
  props: { recipe: Object, action: String },
  emits: ["close"],
  setup(props, context) {
    const store = useStore()
    const state = reactive({
      recipe: copy(props.recipe),
      usages: Object.values(store.usages).filter(
        (usage) => usage.recipe === props.recipe._id
      ),
      loading: false,
      delete: false,
      error: null
    })

    function close() {
      context.emit("close")
    }

    function addUsage() {
      if (!state.usages) {
        state.usages = []
      }

      state.usages.push({ recipe: state.recipe._id })
    }

    function removeUsage(index) {
      state.usages.splice(index, 1)
    }

    function showDeleteModal() {
      state.delete = true
    }

    function closeDeleteModal() {
      state.delete = false
    }

    async function onCreate() {
      // register the recipe
      const recipe = await Recipes.create(state.recipe)

      // register all usages
      const new_usages = await Promise.all(
        state.usages.map((usage) => {
          usage.recipe = recipe._id
          return Usages.create(usage)
        })
      )
      new_usages?.forEach((usage) => {
        store.usages[usage._id] = usage
      })
      store.recipes[recipe._id] = recipe

      close()
    }

    async function onEdit() {
      // update the recipe
      const recipe = await Recipes.update(props.recipe._id, copy(state.recipe))
      store.recipes[recipe._id] = recipe

      // remove previous usages
      const deleted_usages = await Promise.all(
        Object.values(store.usages)
          .filter((usage) => usage.recipe === props.recipe._id)
          .map((usage) => Usages.delete(usage._id))
      )
      deleted_usages.forEach((usage) => delete store.usages[usage._id])

      // register new usages
      const new_usages = await Promise.all(
        state.usages.map((usage) => Usages.create(usage))
      )
      new_usages.forEach((usage) => {
        store.usages[usage._id] = usage
      })

      close()
    }

    async function onDelete() {
      const usages = await Promise.all(
        Object.values(store.usages)
          .filter((usage) => usage.recipe === props.recipe._id)
          .map((usage) => Usages.delete(usage._id))
      )
      usages.forEach((usage) => delete store.usages[usage._id])

      const recipe = await Recipes.delete(props.recipe._id)
      delete store.recipes[recipe._id]

      close()
    }

    async function onSave() {
      if (props.action === "edit") await onEdit()
      if (props.action === "add") await onCreate()
    }

    return {
      store,
      state,
      close,
      addUsage,
      removeUsage,
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
          {{ action === "add" ? "Añadir" : "Editar" }} Receta
        </p>
        <button class="delete" aria-label="close" @click="close"></button>
      </header>
      <section class="modal-card-body">
        <div class="field">
          <label class="label">Nombre</label>
          <div class="control">
            <input
              class="input"
              type="text"
              placeholder="nombre"
              v-model="state.recipe.name"
              required
            />
          </div>
        </div>
        <div class="field">
          <label class="label">Usos</label>
          <div
            class="field is-horizontal"
            v-for="(presentation, index) in state.usages"
            :key="index"
          >
            <div class="field-body">
              <div class="field">
                <div class="control is-expanded">
                  <div class="select">
                    <select v-model="state.usages[index].ingredient">
                      <option
                        v-for="(ingredient, index) in store.ingredients"
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
                    placeholder="cantidad"
                    v-model="state.usages[index].amount"
                  />
                </p>
              </div>
              <div class="field">
                <div class="control is-expanded">
                  <div class="select">
                    <select v-model="state.usages[index].unit">
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
            <button class="button" @click="addUsage">Añadir</button>
          </div>
        </div>

        <p v-if="state.error" class="has-text-danger">
          {{ state.error }}
        </p>
      </section>
      <footer class="modal-card-foot">
        <div class="is-flex is-justify-content-space-between">
          <button class="button is-primary" @click="onSave">
            <i class="fa fa-save mr-2" /> Guardar
          </button>
          <button
            class="button is-warning"
            v-if="action === 'edit'"
            @click="showDeleteModal"
          >
            <i class="fa fa-trash mr-2" /> Borrar
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
