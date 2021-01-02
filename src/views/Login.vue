<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="center">
      <v-col col="12" md="6">
        <v-card>
          <v-card-title>
            <h2>Login</h2>
          </v-card-title>
          <div v-if="$route.params.sign_up" v-on:click="close">
            <v-alert dense dismissible text type="success"
              >Your account has been created successfully</v-alert
            >
          </div>
          <v-card-text>
            <v-form @submit.prevent="submitForm">
              <v-text-field
                counter
                :rules="[rules.required, rules.min]"
                v-model="email"
                label="Email"
              ></v-text-field>
              <v-text-field
                v-model="password"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.min]"
                :type="show ? 'text' : 'password'"
                name="password"
                label="Password"
                hint="At least 8 characters"
                counter
                @click:append="show = !show"
              ></v-text-field>
              <v-checkbox label="Remember me"></v-checkbox>
              <v-spacer></v-spacer>
              <a
                href="#"
                class="forget-pwd"
                @click="$router.push('/forgetpassword')"
                >Do you forget your password?</a
              >
              <!--v-btn
              class="ma-2"
              :loading="loading"
              :disabled="loading"
              color="success"
              @click="loader = 'loading'"
              type="submit"
            >
              Login
              <template v-slot:loader>
                <span class="custom-loader">
                  <v-icon light>mdi-cached</v-icon>
                </span>
              </template>
            </v-btn-->
              <v-divider></v-divider>
              <div v-if="errors.length">
                <div v-for="error in errors" :key="error">
                  <v-alert border="top" color="red lighten-2" dark>
                    {{ error.toString() }}
                  </v-alert>
                </div>
              </div>

              <button type="submit" class="btn btn-primary">Login</button>
            </v-form>
          </v-card-text>
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
      email: "",
      password: "",
      loader: null,
      loading: false,
      errors: [],
      show: false,
      rules: {
        required: value => !!value || "Required.",
        min: v => v.length >= 8 || "Min 8 characters"
      }
    };
  },
  computed: {
    ...mapGetters({
      authenticated: "auth/authenticated",
      user: "auth/user"
    })
  },
  mounted() {
    if (this.user) {
      this.$router.push("/");
    }
  },
  methods: {
    ...mapActions({
      login: "auth/login"
    }),
    submitForm() {
      let data = {
        email: this.email,
        password: this.password
      };
      this.errors = [];

      this.login(data)
        .then(() => {
          this.$router.push("/");
        })
        .catch(errors => {
          if (errors.response.data.errors) {
            Object.values(errors.response.data.errors).forEach(element => {
              console.log(element);
              this.errors.push(element.toString());
            });
          } else {
            console.log(errors.response.data.error);
            this.errors.push(errors.response.data.error.toString());
          }
        });
    },
    close() {
      console.log(this.$route.params);
    }
  },
  watch: {
    loader() {
      const l = this.loader;
      this[l] = !this[l];

      setTimeout(() => (this[l] = false), 3000);

      this.loader = null;
    }
  }
};
</script>

<style></style>
