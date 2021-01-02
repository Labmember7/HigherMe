<template>
  <div>
    <link
      href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900"
      rel="stylesheet"
    />
    <link
      href="https://cdn.jsdelivr.net/npm/@mdi/font@4.x/css/materialdesignicons.min.css"
      rel="stylesheet"
    />
    <div>
      <v-app-bar
        dark
        src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
      >
        <!--v-app-bar-nav-icon></v-app-bar-nav-icon-->

        <v-toolbar-title>HigherMe</v-toolbar-title>

        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down" v-if="authenticated">
          <v-btn class="btn" @click="$router.push('/')">Home</v-btn>
          <v-btn class="btn" @click="$router.push('about')">AboutUs</v-btn>
          <v-btn class="btn" @click="$router.push('offers')">Offers</v-btn>
          <v-btn
            v-if="user.role == 'employer'"
            class="btn"
            @click="
              $router.push({ name: 'JobOffer', params: { update: false } })
            "
            >JobOffer</v-btn
          >
          <v-btn class="btn" @click="$router.push('/profile')">{{
            user.name
          }}</v-btn>
          <v-btn class="btn" @click.prevent="logout">logout</v-btn>
        </v-toolbar-items>
        <v-toolbar-items class="hidden-sm-and-down" v-else>
          <v-btn class="btn" @click="$router.push('/')">Home</v-btn>
          <v-btn class="btn" @click="$router.push('/offers')">Offers</v-btn>
          <v-btn class="btn" @click="$router.push('/about')">AboutUs</v-btn>
          <v-btn class="btn" @click="$router.push('/register')">SignUp</v-btn>
          <v-btn class="btn" @click="$router.push('/login')">Login</v-btn>
        </v-toolbar-items>
        <!--v-btn icon>
          <v-icon>mdi-export</v-icon>
        </v-btn-->
      </v-app-bar>
    </div>
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
<style scoped>
.sticky {
  position: fixed;
  top: 0;
  width: 100%;
}
.navbar {
  position: fixed !important;
  width: 100% !important;
  top: 0 !important;
  left: 0 !important;
  margin-bottom: 20px !important;
}
.btn {
  background: none !important;
}
</style>
