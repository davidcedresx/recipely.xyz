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
      <router-link class="navbar-item" to="/recipes">
        <img src="/logo.svg" width="56" />
      </router-link>
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
          <i class="fa fa-cookie pr-2" />
          Recetas
        </router-link>
        <router-link
          class="navbar-item"
          :class="{ 'is-active': routeIs('ingredients') }"
          to="/ingredients"
        >
          <i class="fa fa-egg pr-2" />
          Ingredientes
        </router-link>
        <router-link
          class="navbar-item"
          :class="{ 'is-active': routeIs('utensils') }"
          to="/utensils"
        >
          <i class="fa fa-birthday-cake pr-2" />
          Utensilios
        </router-link>
      </div>

      <div class="navbar-end">
        <router-link to="/settings" class="is-primary navbar-item navbar-item">
          <strong>
            <i class="fa fa-cog mr-1" />
            Ajustes
          </strong>
        </router-link>
        <router-link
          to="/"
          class="is-light navbar-item has-text-danger"
          @click="logout"
        >
          <strong>
            <i class="fa fa-sign-out-alt mr-1" />
            Salir
          </strong>
        </router-link>
      </div>
    </div>
  </nav>
</template>
