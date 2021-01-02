<template>
  <div class="hello">
    <nav class="navbar navbar-dark bg-dark navbar-expand-lg">
      <a class="navbar-brand" href="#">HigherMe</a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarText"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link to="/">Home </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/about">About</router-link>
          </li>

          <template v-if="authenticated">
            <li class="nav-item">
              <router-link to="/">{{ user.name }}</router-link>
            </li>
            <li class="nav-item" @click.prevent="logout">
              <router-link to="#">Log out</router-link>
            </li>
          </template>

          <template v-else>
            <li class="nav-item">
              <router-link to="/login">Log In</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/register">Register</router-link>
            </li>
          </template>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters({
      authenticated: "auth/authenticated",
      user: "auth/user"
    })
  },
  methods: {
    ...mapActions({
      logoutAction: "auth/logout"
    }),
    logout() {
      this.logoutAction().then(() => {
        this.$router.replace({
          name: "Home"
        });
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
