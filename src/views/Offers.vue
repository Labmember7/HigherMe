<template>
  <v-container app>
    <v-text-field placeholder="Search Offer" v-model="Search"></v-text-field>
    <v-row dense>
      <v-col v-for="(item, i) in AllOffers" :key="i" cols="12">
        <v-card class="mx-auto" outlined>
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-list-item three-line>
                <v-list-item-content>
                  <div class="overline mb-4">
                    {{ item.jobtitle }}
                  </div>
                  <v-list-item-title class="headline mb-1">
                    {{ item.companyname }}
                  </v-list-item-title>
                  <v-list-item-subtitle
                    >Country: {{ item.country }}</v-list-item-subtitle
                  >
                  <v-list-item-subtitle
                    >City: {{ item.city }}</v-list-item-subtitle
                  >
                  <v-list-item-subtitle
                    >salary: {{ item.job_salary }}</v-list-item-subtitle
                  >
                  <v-list-item-subtitle
                    >description: {{ item.Paragraph }}</v-list-item-subtitle
                  >
                </v-list-item-content>
              </v-list-item>
              <v-card-actions>
                <v-btn
                  v-if="authenticated"
                  class="ml-2 mt-5"
                  outlined
                  rounded
                  small
                  @click="
                    $router.push({ name: 'JobSubmit', params: { id: item.id } })
                  "
                >
                  Submit Candidature
                </v-btn>
                <v-btn
                  v-else
                  class="ml-2 mt-5"
                  outlined
                  rounded
                  small
                  @click="$router.push('/login')"
                >
                  Submit Candidature
                </v-btn>
                <v-btn
                  class="ml-2 mt-5"
                  outlined
                  rounded
                  small
                  @click="
                    $router.push({
                      name: 'Candidates',
                      params: { data: item.postes }
                    })
                  "
                >
                  All Candidates
                </v-btn>
                <v-btn
                  v-if="user && user.email == item.email"
                  class="ml-2 mt-5"
                  outlined
                  rounded
                  small
                  @click="DeleteOffer(item.id)"
                >
                  Delete
                </v-btn>
                <v-btn
                  v-if="user && user.email == item.email"
                  class="ml-2 mt-5"
                  outlined
                  rounded
                  warning
                  small
                  @click="
                    $router.push({
                      name: 'JobOffer',
                      params: { update: true, id: item.id }
                    })
                  "
                >
                  Update Offer
                </v-btn>
              </v-card-actions>
            </div>

            <v-avatar class="ma-3" size="125" tile>
              <v-img :src="item.src"></v-img>
            </v-avatar>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      Search: ""
      //AllOffers : [],
    };
  },
  computed: {
    ...mapGetters({
      AllOffers: "offers/AllOffers",
      user: "auth/user",
      authenticated: "auth/authenticated"
    }),
    filteredOffers: function() {
      return this.AllOffers.filter(offer => {
        return offer.title.match(this.Search);
      });
    }
  },
  methods: {
    ...mapActions("offers", ["DeleteOffer"])
  }
};
</script>
<style scoped></style>
