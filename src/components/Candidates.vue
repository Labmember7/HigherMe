<template>
  <v-container app>
    <v-row dense>
      <v-col v-for="(item, i) in postes" :key="i" cols="12">
        <v-card class="mx-auto" outlined>
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-list-item three-line>
                <v-list-item-content>
                  <div class="overline mb-4">
                    {{ item.fullname }}
                  </div>
                  <v-list-item-title class="headline mb-1">
                    {{ item.email }}
                  </v-list-item-title>
                  <v-list-item-subtitle
                    >Country: {{ item.country }}</v-list-item-subtitle
                  >
                  <v-list-item-subtitle
                    >Phone Number: {{ item.phonenumber }}</v-list-item-subtitle
                  >
                  <v-list-item-subtitle
                    >Description: {{ item.Description }}</v-list-item-subtitle
                  >
                </v-list-item-content>
              </v-list-item>
              <v-card-actions>
                <!--v-btn
                      v-if="user && user.email==item.email"
                      class="ml-2 mt-5"
                      outlined
                      rounded
                      small
                      @click="DeletePost(item.id)"
                    >
                     Delete 
                    </v-btn-->
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
      postes: []
    };
  },
  methods: {
    ...mapActions("offers", ["FetchOffers"]),
    ...mapActions("offers", ["DeletePost"])
  },
  computed: {
    ...mapGetters("offers", ["AllOffers"]),
    ...mapGetters("auth", ["user"])
  },
  created() {
    this.postes = this.$route.params.data;
    console.log(this.postes);
    /*this.FetchOffers()
        .then(()=>{
            console.log('offer id',this.$route.params.id);
            for (var offer in this.AllOffers){
                console.log(offer.id);
                if (offer.id==this.$route.params.id)
                {
                    console.log("Offer Found",offer);
                        this.postes=offer.postes;
                }
      }
        })*/
  },
  mounted() {}
};
</script>
<style scoped></style>
