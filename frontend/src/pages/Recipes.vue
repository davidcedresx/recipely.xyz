<script>
import { onMounted, reactive } from 'vue'
import { Recipes } from '../api'
import Navbar from '../components/Navbar.vue'
import RecipeCard from '../components/RecipeCard.vue'
import RecipeModal from '../components/RecipeModal.vue'

export default {
    name: 'recipes',
    components: { Navbar, RecipeCard, RecipeModal },
    setup() {
        const state = reactive({
            recipes: [],
            loading: false,
            error: null,
            action: null, // add or edit
            modal: false,
            selected: {},
        })

        onMounted(async () => {
            try {
                state.loading = true
                state.recipes = await Recipes.get()
            } catch (error) {
                state.error = error.message
            }

            state.loading = false
        })

        function add() {
            state.action = 'add'
            state.selected = {}
            state.modal = true
        }

        function select(recipe) {
            state.selected = recipe
            state.action = 'edit'
            state.modal = true
        }

        return { state, select, add }
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

            <p v-if="state.loading" class="subtitle">Fetching</p>
            <p v-if="state.error" class="subtitle">
                Something went wrong: {{ state.error }}
            </p>

            <div class="columns is-multiline">
                <div
                    class="column is-3"
                    v-for="recipe in state.recipes"
                    :key="recipe.name"
                >
                    <recipe-card :recipe="recipe" @click="select(recipe)" />
                </div>
            </div>

            <p class="subtitle" v-if="!state.recipes.length">
                Such empty. You don't have any recipes yet
            </p>
        </div>

        <recipe-modal
            v-if="state.modal"
            @close="state.modal = false"
            :recipe="state.selected"
            :action="state.action"
        />
    </div>
</template>
