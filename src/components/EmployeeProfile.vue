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
          <v-avatar class="profile" color="grey" size="164" rounded>
            <!--v-img :src="'../assets/avatars/' + form.avatar.toLowerCase()" alt="Avatar">{{
              form.avatar.toLowerCase()
            }}</v-img-->
            <v-img
              src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"
            ></v-img>
          </v-avatar>
          <br />
          <v-flex class="mb-4">
            <!--v-avatar-uploader :url="url" :request="request" /-->
            <avatar-picker
              :disabled="isUpdating"
              v-model="showAvatarPicker"
              :current-avatar="form.avatar"
              @selected="selectAvatar"
            ></avatar-picker>
          </v-flex>
        </v-col>
        <v-col class="text-center">
          <h3 class="headline">{{ form.firstname }} {{ form.lastname }}</h3>
          <span class="grey--text text--lighten-1">{{ form.title }}</span>
        </v-col>
      </v-row>
    </v-img>
    <v-form @submit.prevent="postProfile">
      <v-container>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="form.firstname"
              :disabled="isUpdating"
              filled
              color="blue-grey lighten-2"
              label="First Name"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="form.lastname"
              :disabled="isUpdating"
              filled
              color="blue-grey lighten-2"
              label="Last Name"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="form.title"
              :disabled="isUpdating"
              filled
              color="blue-grey lighten-2"
              label="Title"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="form.age"
              :disabled="isUpdating"
              type="number"
              filled
              color="blue-grey lighten-2"
              label="Age"
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-textarea
              :disabled="isUpdating"
              name="input-7-1"
              v-model="form.aboutme"
              label="About me"
              hint="Bio"
              filled
            ></v-textarea>
          </v-col>

          <v-col cols="12" md="6">
            <v-autocomplete
              v-model="form.languages"
              :disabled="isUpdating"
              :items="languages"
              filled
              chips
              color="blue-grey lighten-2"
              label="Languages"
              item-text="Language"
              item-value="language"
              multiple
              deletable-chips
            ></v-autocomplete>
          </v-col>

          <v-col cols="12" md="6">
            <v-autocomplete
              v-model="form.programming_languages"
              :disabled="isUpdating"
              :items="progLanguages"
              filled
              chips
              color="blue-grey lighten-2"
              label="Programming Languages"
              multiple
              deletable-chips
            ></v-autocomplete>
          </v-col>
          <v-col col="12" md="6">
            <v-subheader>Progamming skills</v-subheader>
            <v-card-text>
              <v-slider
                :disabled="isUpdating"
                v-model="form.programming_skills"
                :tick-labels="level"
                :max="3"
                step="1"
                ticks="always"
                tick-size="4"
              ></v-slider>
            </v-card-text>
          </v-col>
          <v-col col="12" md="6">
            <v-subheader>Communication skills</v-subheader>
            <v-card-text>
              <v-slider
                :disabled="isUpdating"
                v-model="form.communication_skills"
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
              v-model="form.experience"
              label="My Experiences"
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

import AvatarPicker from "@/components/AvatarPicker.vue";
import jsonLang from "@/JSON/languages.json";
import jsonProg from "@/JSON/progLanguages.json";
import Axios from "axios";
export default {
  pageTitle: "My Profile",
  components: { AvatarPicker },
  data() {
    return {
      form: {
        firstname: "Loading ",
        lastname: "Please patient",
        title: "Loading",
        age: 20,
        aboutme: "Loading....................................",
        avatar: "LOGIN.png",
        languages: null,
        programming_languages: null,
        programming_skills: null,
        communication_skills: null,
        experience: "Loading....................................",
        user_id: null,
        id: null,
        message: null
      },
      showAvatarPicker: false,
      languages: ["French", "English", "German", "Arabic"],
      progLanguages: ["C", "C++", "C#", "Matlab"],
      level: ["Average", "Good", "Excellent", "Expert"],
      isUpdating: false,
      jsonLanguage: jsonLang,
      jsonProgLanguages: jsonProg,
      errors: [],
      alreadyHasProfile: false
    };
  },

  watch: {
    isUpdating(val) {
      if (val) {
        setTimeout(() => (this.isUpdating = false), 15000);
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

    selectAvatar(avatar) {
      this.form.avatar = avatar;
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
      Axios.post("/profile/createemployeeprofile", data)
        .then(Response => {
          console.log("RESPONSE RECEIVED : ", Response);
          this.alreadyHasProfile = true;
          this.isUpdating = false;
        })
        .catch(errors => {
          Object.values(errors.response.data.errors).forEach(element => {
            this.isUpdating = false;
            console.log(element);
            this.errors.push(element.toString());
          });
        });
    },

    updateProfile() {
      this.errors = [];
      let data = this.form;
      console.log("DATA: ", data);

      Axios.post("/profile/updateemployeeprofile/" + this.form.id, data)
        .then(Response => {
          console.log("RESPONSE RECEIVED  Updated : ", Response.data.profile);
          if (Response.data.message) {
            this.form.message = Response.data.message;
            this.isUpdating = false;
            console.log("Message RECEIVED  ", this.form.message);
          }
        })
        .catch(errors => {
          Object.values(errors.response.data.errors).forEach(element => {
            console.log(element);
            this.errors.push(element.toString());
          });
          this.isUpdating = false;
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
          this.isUpdating = false;
          this.alreadyHasProfile = false;
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
    this.jsonProgLanguages.forEach(element => {
      this.progLanguages.push(element);
    });
  }
};
</script>
