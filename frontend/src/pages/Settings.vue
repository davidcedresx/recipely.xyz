<script>
import Navbar from "../components/Navbar.vue"
import { reactive } from "vue"
import { User } from "../api"
import { useStore } from '../store'

export default {
  name: "Ingredients",
  components: { Navbar },
  setup() {
    const store = useStore()
    const state = reactive({ password: "", profit: store.user.profit })

    async function onSave() {
      state.loading = true
      store.user = await User.update({ profit: state.profit })
      state.loading = false
    }

    return {
      state,
      onSave
    }
  }
}
</script>

<template>
  <navbar />

  <div class="container px-4 pt-6">
    <div class="title is-1">Settings</div>

    <div class="columns">
      <form @submit.prevent="onSave" class="column is-3">
        <!-- <div class="field">
          <label class="label">Update password</label>
          <div class="control">
            <input
              class="input"
              type="password"
              placeholder="New password"
              v-model="state.password"
            />
          </div>
        </div> -->

        <div class="field">
          <label class="label">Profit</label>
          <div class="control">
            <input
              class="input"
              type="text"
              placeholder="New password"
              v-model.number="state.profit"
            />
          </div>
        </div>

        <div class="field">
          <div class="control">
            <button
              class="button is-primary"
              :class="{ 'is-loading': state.loading }"
              type="submit"
            >
              Save
            </button>
          </div>
        </div>

        <p v-if="state.error" class="has-text-danger">{{ state.error }}</p>
      </form>
    </div>
  </div>
</template>
