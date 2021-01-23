<script>
export default {
    name: 'DeleteConfirmationModal',
    emits: ['confirmed'],
}
</script>

<template>
    <div class="modal is-active">
        <div class="modal-background"></div>
        <div class="modal-content">
            <div class="box">
                <h3 class="title is-3">Delete this item</h3>
                <div class="buttons">
                    <button
                        class="button is-danger"
                        @click="$emit('confirmed')"
                    >
                        Delete
                    </button>
                    <button class="button is-primary" @click="$emit('close')">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
        <button class="modal-close is-large" aria-label="close"></button>
    </div>
</template>
