<template>
  <v-card color="blue-grey darken-1" dark :loading="isUpdating">
    <template v-slot:progress>
      <v-progress-linear
        absolute
        color="green lighten-3"
        height="4"
        indeterminate
      ></v-progress-linear>
    </template>
    <v-img
      height="400"
      src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg"
      gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
    >
      <v-row align="end" class="fill-height">
        <v-col align-self="start" class="text-center" cols="12">
          <v-flex class="mb-4">
            <!--v-avatar-uploader :url="url" :request="request" /-->
            <avatar-picker
              :disabled="isUpdating"
              v-model="showAvatarPicker"
              :current-avatar="form.coverPhoto"
              @selected="selectAvatar"
            ></avatar-picker>
          </v-flex>
        </v-col>
        <v-col class="text-center">
          <h3 class="headline">{{ form.companyname }}</h3>
          <span class="grey--text text--lighten-1">{{
            form.company_field
          }}</span>
        </v-col>
      </v-row>
    </v-img>
    <v-form @submit.prevent="postProfile">
      <v-container>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="form.companyname"
              :disabled="isUpdating"
              filled
              color="blue-grey lighten-2"
              label="Company Name"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="form.ceoname"
              :disabled="isUpdating"
              filled
              color="blue-grey lighten-2"
              label="CEO's Name"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="form.company_field"
              :disabled="isUpdating"
              filled
              color="blue-grey lighten-2"
              label="The Company's main field"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="form.company_seniority"
              :disabled="isUpdating"
              type="number"
              filled
              color="blue-grey lighten-2"
              label="The company's seniority"
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-textarea
              :disabled="isUpdating"
              name="input-7-1"
              v-model="form.company_description"
              label="About the company"
              hint="Description"
              filled
            ></v-textarea>
          </v-col>

          <v-col cols="12" md="6">
            <v-autocomplete
              v-model="form.commlanguages"
              :disabled="isUpdating"
              :items="languages"
              filled
              chips
              color="blue-grey lighten-2"
              label="Communication Languages used in the company"
              item-text="Language"
              item-value="language"
              multiple
              deletable-chips
            ></v-autocomplete>
          </v-col>

          <v-col cols="12" md="6">
            <v-autocomplete
              v-model="form.company_departments"
              :disabled="isUpdating"
              :items="departements"
              filled
              chips
              color="blue-grey lighten-2"
              label="Different Names of the departments within the company"
              multiple
              deletable-chips
            ></v-autocomplete>
          </v-col>
          <v-col col="12" md="6">
            <v-subheader>Company annual total income</v-subheader>
            <v-card-text>
              <v-slider
                :disabled="isUpdating"
                v-model="form.total_income"
                :tick-labels="level"
                :max="3"
                step="1"
                ticks="always"
                tick-size="4"
              ></v-slider>
            </v-card-text>
          </v-col>
          <v-col col="12" md="6">
            <v-subheader
              >The company ranking among it's competitors</v-subheader
            >
            <v-card-text>
              <v-slider
                :disabled="isUpdating"
                v-model="form.ranking"
                :tick-labels="level"
                :max="3"
                step="1"
                ticks="always"
                tick-size="4"
              ></v-slider>
            </v-card-text>
          </v-col>
          <v-col cols="12">
            <v-textarea
              :disabled="isUpdating"
              name="input-7-1"
              v-model="form.company_accomplishment"
              label="What are the company's accomplishments"
              hint="Jobs , projects ...etc"
              filled
            ></v-textarea>
          </v-col>
          <v-col cols="12">
            <div v-if="form.message">
              <v-alert border="top" color="green lighten-2" dark>
                {{ form.message }}
              </v-alert>
            </div>
            <v-divider></v-divider>
            <div v-for="error in errors" :key="error">
              <v-alert border="top" color="red lighten-2" dark>
                {{ error.toString() }}
              </v-alert>
            </div>
          </v-col>

          <v-col col="12">
            <v-card-actions>
              <div v-if="!isUpdating">
                <div v-if="alreadyHasProfile">
                  <v-btn
                    type="submit"
                    :loading="isUpdating"
                    color="blue-grey darken-3"
                    depressed
                  >
                    <v-icon left> mdi-update </v-icon>
                    Update Now
                  </v-btn>
                </div>
                <div v-else>
                  <button type="submit" class="btn btn-primary">
                    Create Profile
                  </button>
                </div>
              </div>
            </v-card-actions>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import Axios from "axios";

import AvatarPicker from "@/components/AvatarPicker.vue";
import jsonLang from "@/JSON/languages.json";
import jsonDep from "@/JSON/departements.json";

export default {
  pageTitle: "My Profile",
  components: { AvatarPicker },
  data() {
    return {
      form: {
        companyname: "Loading",
        ceoname: "patience",
        company_field: "waiting is good",
        company_seniority: 20,
        company_description: "Loading....................................",
        coverPhoto: "LOGIN.png",
        commlanguages: null,
        total_income: null,
        ranking: null,
        company_departments: null,
        company_accomplishment: null,
        user_id: null,
        id: null,
        message: null
      },
      showAvatarPicker: false,
      languages: ["French", "English", "German", "Arabic", "Spanish"],
      departements: [
        "Electrical",
        "Embedded",
        "Software Engineering",
        "Telecomunication",
        "Social",
        "Maintenance"
      ],
      level: ["Average", "Good", "Excellent", "Rank 1"],
      isUpdating: false,
      jsonDepartement: jsonDep,
      jsonLanguage: jsonLang,
      errors: [],
      alreadyHasProfile: false
    };
  },

  watch: {
    isUpdating(val) {
      if (val) {
        setTimeout(() => (this.isUpdating = false), 15000);
        console.log(val);
      }
    }
  },
  computed: {
    ...mapGetters({
      authenticated: "auth/authenticated",
      user: "auth/user"
    })
  },
  methods: {
    openAvatarPicker() {
      this.showAvatarPicker = true;
    },

    selectAvatar(photo) {
      this.form.coverPhoto = photo;
    },

    postProfile() {
      this.isUpdating = true;
      if (this.alreadyHasProfile) {
        this.updateProfile();
      } else {
        this.createProfile();
      }
    },

    createProfile() {
      this.errors = [];
      let data = this.form;
      console.log(data);
      Axios.post("/profile/createemployerprofile", data)
        .then(Response => {
          console.log("RESPONSE RECEIVED : ", Response);
          this.alreadyHasProfile = true;
          this.isUpdating = false;
        })
        .catch(errors => {
          Object.values(errors.response.data.errors).forEach(element => {
            this.isUpdating = false;

            console.log(element.toString());

            this.errors.push(element.toString());
          });
        });
    },

    updateProfile() {
      this.errors = [];
      let data = this.form;
      console.log("DATA: ", data);

      Axios.post("/profile/updateemployerprofile/" + this.form.id, data)
        .then(Response => {
          console.log("RESPONSE RECEIVED  Updated : ", Response.data.profile);
          if (Response.data.message) {
            this.form.message = Response.data.message;
            this.isUpdating = false;
            console.log("Message RECEIVED  ", this.form.message);
          }
          this.isUpdating = false;
        })
        .catch(errors => {
          Object.values(errors.response.data.errors).forEach(element => {
            console.log(element);
            this.errors.push(element.toString());
            this.isUpdating = false;
          });
        });
    },

    getProfile() {
      this.form.message = null;
      this.isUpdating = true;
      this.errors = [];
      Axios.get("/profile/getuserprofile/" + this.form.user_id)
        .then(Response => {
          console.log("RESPONSE RECEIVED : ", Response.data.profile[0]);
          if (Response.data.profile[0]) {
            this.form = Response.data.profile[0];
            console.log("Response profile id : ", Response.data.profile[0].id);
            console.log("Form profile id : ", this.form.id);
            console.log("Form data: ", this.form);
            this.alreadyHasProfile = true;
          } else {
            this.alreadyHasProfile = false;
          }
          this.isUpdating = false;
        })
        .catch(errors => {
          Object.values(errors.response.data.errors).forEach(element => {
            console.log(element);
            this.errors.push(element.toString());
          });
          this.alreadyHasProfile = false;
          this.isUpdating = false;
        });
    }
  },

  mounted() {
    console.log(this.user.id);
    this.form.user_id = this.user.id;
    this.getProfile();
    Object.values(this.jsonLanguage).forEach(element => {
      this.languages.push(element.name);
    });
    this.jsonDepartement.forEach(element => {
      this.departements.push(element);
    });
  }
};
</script>
