<script>
import { reactive } from 'vue'
import Navbar from '../components/Navbar.vue'
import RecipeCard from '../components/RecipeCard.vue'
import RecipeModal from '../components/RecipeModal.vue'
import { useStore } from '../store'

export default {
    name: 'recipes',
    components: { Navbar, RecipeCard, RecipeModal },
    setup() {
        const modal = reactive({
            action: 'add',
            modal: false,
            selected: {},
        })
        const store = useStore()

        function add() {
            modal.action = 'add'
            modal.selected = {}
            modal.modal = true
        }

        function select(recipe) {
            modal.selected = recipe
            modal.action = 'edit'
            modal.modal = true
        }

        return { modal, select, add, store }
    },
}
</script>

<template>
    <div>
        <navbar />

        <div class="container px-4 pt-6">
            <div class="is-flex is-justify-content-space-between">
                <div class="title is-1 pb-4">Recipes</div>
                <button class="button is-primary is-primary" @click="add">
                    <i class="fa fa-plus" />
                </button>
            </div>

            <div class="columns is-multiline">
                <div
                    class="column is-3"
                    v-for="recipe in store.recipes"
                    :key="recipe.name"
                >
                    <recipe-card :recipe="recipe" @click="select(recipe)" />
                </div>
            </div>

            <p class="subtitle" v-if="!Object.keys(store.recipes).length">
                Such empty. You don't have any recipes yet
            </p>
        </div>

        <recipe-modal
            v-if="modal.modal"
            @close="modal.modal = false"
            :recipe="modal.selected"
            :action="modal.action"
        />
    </div>
</template>
