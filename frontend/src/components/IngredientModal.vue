<script>
import { reactive } from 'vue'
import { Ingredients } from '../api'
import DeleteConfimationModal from './DeleteConfimationModal.vue'

export default {
    components: { DeleteConfimationModal },
    name: 'IngredientModal',
    props: { ingredient: Object, action: String },
    emits: ['close'],
    setup(props, context) {
        const state = reactive({
            ingredient: {
                name: props.ingredient.name,
                price: props.ingredient.price
            },
            loading: false,
            delete: false,
            error: null,
            action: props.action,
        })

        function close() {
            context.emit('close')
        }

        function showDeleteModal() {
            state.delete = true
        }

        function closeDeleteModal() {
            state.delete = false
        }

        async function onCreate() {
            // register the new ingredient
            await Ingredients.create({ name: state.ingredient.name, price: state.ingredient.price })
        }

        async function onEdit() {
            await Ingredients.update(props.ingredient._id, {
                name: state.ingredient.name,
                price: state.ingredient.price
            })
        }

        async function onDelete() {
            await Ingredients.delete(props.ingredient._id)
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
            showDeleteModal,
            closeDeleteModal,
            onDelete,
            onSave,
        }
    },
}
</script>

<template>
    <div class="modal is-active">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Ingredient</p>
                <button
                    class="delete"
                    aria-label="close"
                    @click="close"
                ></button>
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
                                v-model="state.ingredient.name"
                                required
                            />
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Price</label>
                        <div class="control">
                            <input
                                class="input"
                                type="text"
                                placeholder="price"
                                v-model.number="state.ingredient.price"
                                required
                            />
                        </div>
                    </div>
                </form>

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
                        v-if="state.action === 'edit'"
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
