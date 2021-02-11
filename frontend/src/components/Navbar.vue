<script>
import { reactive } from "vue"
import { useRoute } from "vue-router"

export default {
  name: "Navbar",
  setup() {
    const state = reactive({ open: false })
    const route = useRoute()

    function logout() {
      localStorage.removeItem("token")
    }

    function toggleOpen() {
      state.open = !state.open
    }

    function routeIs(name) {
      console.log(route.name)
      return route.name === name
    }

    return { state, logout, toggleOpen, routeIs }
  }
}
</script>

<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="/recipes">
        <img src="/logo.svg" width="56" />
      </a>
      <a
        role="button"
        class="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbar"
        :class="{ 'is-active': state.open }"
        @click="toggleOpen"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbar" class="navbar-menu" :class="{ 'is-active': state.open }">
      <div class="navbar-start">
        <router-link
          class="navbar-item mr-4"
          :class="{ 'is-active': routeIs('recipes') }"
          to="/recipes"
        >
          <i class="fa fa-book pr-2" />
          Recipes
        </router-link>
        <router-link
          class="navbar-item"
          :class="{ 'is-active': routeIs('ingredients') }"
          to="/ingredients"
        >
          <i class="fa fa-bread-slice pr-2" />
          Ingredients
        </router-link>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <router-link to="/settings" class="button is-primary">
              <strong>
                <i class="fa fa-cog mr-1" />
                Settings
              </strong>
            </router-link>
            <router-link to="/" class="button is-light" @click="logout">
              <strong>
                <i class="fa fa-sign-out-alt mr-1" />
                Logout
              </strong>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
