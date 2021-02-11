<script>
import { reactive } from "vue"
import { useStore } from "../store"
import IngredientCard from "../components/IngredientCard.vue"
import IngredientModal from "../components/IngredientModal.vue"
import Navbar from "../components/Navbar.vue"

export default {
  name: "Ingredients",
  components: { Navbar, IngredientCard, IngredientModal },
  setup() {
    const modal = reactive({ open: false, action: "add", selected: {} })
    const store = useStore()

    function add() {
      modal.action = "add"
      modal.selected = {}
      modal.open = true
    }

    function select(ingredient) {
      modal.selected = ingredient
      modal.action = "edit"
      modal.open = true
    }

    return { modal, add, select, store }
  }
}
</script>

<template>
  <div>
    <navbar />

    <div class="container px-4 pt-6">
      <div class="is-flex is-justify-content-space-between">
        <div class="title is-1 pb-4">Ingredients</div>
        <button class="button is-primary" @click="add">
          <i class="fa fa-plus" />
        </button>
      </div>

      <div class="columns is-multiline">
        <div
          class="column is-3"
          v-for="ingredient in store.ingredients"
          :key="ingredient.name"
        >
          <ingredient-card
            :ingredient="ingredient"
            @click="select(ingredient)"
          />
        </div>
      </div>

      <p class="subtitle" v-if="!Object.keys(store.ingredients).length">
        Bip. Bup. Bup. You don't have any ingredients
      </p>

      <ingredient-modal
        v-if="modal.open"
        @close="modal.open = false"
        :ingredient="modal.selected"
        :action="modal.action"
      />
    </div>
  </div>
</template>
