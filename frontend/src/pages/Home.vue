<script>
import { reactive } from "vue";
import { useRouter } from 'vue-router'
import { Auth } from "../api";

export default {
  name: "Home",
  setup() {
    const state = reactive({
      username: "",
      password: "",
      loading: false,
      error: null,
    });

    const router = useRouter()

    async function submit(e) {
      e.preventDefault();
      state.error = null;
      state.loading = true;

      try {
        const { token } = await Auth.login(state.username, state.password);
        router.push('/recipes')

      } catch (error) {
        state.error = error.message;
      }

      state.loading = false;
    }

    return { state, submit };
  },
};
</script>

<template>
  <div class="container px-4 mt-6">
    <h1 class="title is-1">Recipely</h1>
    <form @submit.prevent="submit">
      <div class="field">
        <label class="label">username</label>
        <div class="control">
          <input
            class="input"
            type="text"
            placeholder="username"
            v-model="state.username"
            required
          />
        </div>
      </div>
      <div class="field">
        <label class="label">password</label>
        <div class="control">
          <input
            class="input"
            type="password"
            placeholder="password"
            v-model="state.password"
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
            Submit
          </button>
        </div>
      </div>

      <p v-if="state.error" class="has-text-danger">{{ state.error }}</p>
    </form>
  </div>
</template>