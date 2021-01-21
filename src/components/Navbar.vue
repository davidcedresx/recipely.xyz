<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="/recipes">
        <img src="/logo.svg" width="112" height="28" />
      </a>
      <a
        role="button"
        class="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <router-link class="navbar-item" to="/recipes">Recipes</router-link>
        <router-link class="navbar-item" to="/ingredients"
          >Ingredients</router-link
        >
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <router-link to="/settings" class="button is-primary">
              <strong>Settings</strong>
            </router-link>
            <router-link to="/" class="button is-light">Logout</router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>