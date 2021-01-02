<template>
  <div class="footer">
    <v-footer dark padless absolute app>
      <v-card flat tile class="indigo lighten-1 white--text text-center">
        <v-card-text>
          <v-btn
            v-for="icon in icons"
            :key="icon"
            class="mx-4 white--text"
            icon
          >
            <v-icon size="24px">
              {{ icon }}
            </v-icon>
          </v-btn>
        </v-card-text>

        <v-card-text class="white--text pt-0">
          This Web Site Is Created And Developped by INSAT students for a SCRUM
          project the developpers are :Koutaiba Msadaa Mohammed Said Oussema
          Zarai Bacem for more info please contact us on social media or you can
          click the about us page and look for our emails
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="white--text">
          {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </div>
</template>

<script>
export default {
  name: "Footer",
  data: () => ({
    icons: ["mdi-home", "mdi-email", "mdi-calendar", "mdi-delete"]
  }),
  components: {}
};
</script>
<style scoped></style>
