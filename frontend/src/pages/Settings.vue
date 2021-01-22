<script>
import Navbar from "../components/Navbar.vue";

import { reactive } from "vue";

export default {
  name: "Ingredients",
  components: { Navbar },
  setup() {
    const state = reactive({ password: "", profit: "" });

    function onSave() {
      console.log("savin bro");
    }

    return {
      state,
      onSave,
    };
  },
};
</script>

<template>
  <navbar />

  <div class="container px-4 pt-6">
    <div class="title is-1">Settings</div>
    <form @submit.prevent="onSave">
      <div class="field">
        <label class="label">Update password</label>
        <div class="control">
          <input
            class="input"
            type="password"
            placeholder="New password"
            v-model="state.password"
            required
          />
        </div>
      </div>

      <div class="field">
        <label class="label">Profit</label>
        <div class="control">
          <input
            class="input"
            type="text"
            placeholder="New password"
            v-model.number="state.profit"
            required
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
</template>
