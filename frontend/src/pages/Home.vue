<script>
import { reactive } from "vue"
import { useRouter } from "vue-router"
import { Auth } from "../api"

export default {
  name: "Home",
  setup() {
    const state = reactive({
      username: "",
      password: "",
      loading: false,
      error: null,
      action: "login"
    })

    const router = useRouter()

    async function submit(e) {
      e.preventDefault()
      state.error = null
      state.loading = true

      const api = state.action === "login" ? Auth.login : Auth.register

      try {
        const { token } = await api(state.username, state.password)
        localStorage.setItem("token", token)
        router.push("/init")
      } catch (error) {
        state.error = error.message
      }

      state.loading = false
    }

    function selectAction(action) {
      state.error = null
      state.action = action
    }

    return { state, submit, selectAction }
  }
}
</script>

<template>
  <div class="container px-4 mt-6">
    <div class="columns is-centered">
      <div class="column is-5-tablet is-4-desktop is-3-widescreen">
        <h1 class="title is-1 has-text-centered">Recipely</h1>
        <div class="box p-5">
          <div class="tabs is-centered">
            <ul>
              <li
                :class="{ 'is-active': state.action === 'login' }"
                @click="selectAction('login')"
              >
                <a>Login</a>
              </li>
              <li
                :class="{ 'is-active': state.action === 'register' }"
                @click="selectAction('register')"
              >
                <a>Register</a>
              </li>
            </ul>
          </div>
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
            <div v-if="state.action === 'register'" class="field">
              <div class="control">
                <label class="checkbox">
                  <input type="checkbox" required />
                  I like donuts
                </label>
              </div>
            </div>
            <div class="field">
              <div class="control">
                <button
                  class="button is-primary is-fullwidth"
                  :class="{ 'is-loading': state.loading }"
                  type="submit"
                >
                  {{ state.action === "register" ? "Join" : "Enter" }}
                </button>
              </div>
            </div>

            <p v-if="state.error" class="has-text-danger">{{ state.error }}</p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
