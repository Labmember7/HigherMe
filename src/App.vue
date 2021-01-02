<template>
  <v-app>
    <app-nav app></app-nav>
    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
    <app-footer app></app-footer>
  </v-app>
</template>
<script>
export default {};
</script>

<script>
import Navbar from "./views/Navbar";
import Footer from "./views/Footer";
import { mapActions } from "vuex";
export default {
  name: "App",
  components: {
    "app-nav": Navbar,
    "app-footer": Footer
  },
  data: () => ({
    //
  }),
  methods: {
    ...mapActions("offers", ["FetchOffers"])
  },
  created() {
    this.FetchOffers();
  }
};
</script>
