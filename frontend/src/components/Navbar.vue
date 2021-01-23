<script>
export default {
    name: 'Navbar',
    setup() {
        function logout() {
            localStorage.removeItem('token')
        }

        return { logout }
    },
}
</script>

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
                data-target="navbar"
            >
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>

        <div id="navbar" class="navbar-menu">
            <div class="navbar-start">
                <router-link class="navbar-item mr-4" to="/recipes"
                    ><i class="fa fa-book pr-2" /> Recipes</router-link
                >
                <router-link class="navbar-item" to="/ingredients">
                    <i class="fa fa-bread-slice pr-2" />
                    Ingredients</router-link
                >
            </div>

            <div class="navbar-end">
                <div class="navbar-item">
                    <div class="buttons">
                        <router-link to="/settings" class="button is-primary">
                            <strong><i class="fa fa-cog" /> Settings</strong>
                        </router-link>
                        <router-link
                            to="/"
                            class="button is-light"
                            @click="logout"
                            ><i class="fa fa-sign-out-alt"
                        /></router-link>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>
