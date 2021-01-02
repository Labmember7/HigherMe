<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="center">
      <v-col col="12" md="6">
        <v-card>
          <v-card-title>
            <h2>Create new account</h2>
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="createAccount">
              <v-text-field
                counter
                hint="At least 8 characters"
                :rules="[rules.required, rules.min]"
                v-model="name"
                label="Username"
              ></v-text-field>
              <v-text-field
                counter
                hint="At least 8 characters"
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
              <v-radio-group v-model="role" :rules="[rules.required]">
                <template v-slot:label>
                  <div>Choose your account <strong>type</strong></div>
                </template>
                <v-radio value="employee" label="green" color="green">
                  <template v-slot:label>
                    <div>
                      I am looking for a job so i choose
                      <strong class="success--text">Employee account</strong>
                    </div>
                  </template>
                </v-radio>
                <v-radio value="employer">
                  <template v-slot:label>
                    <div>
                      I am looking for employees so i choose
                      <strong class="primary--text">Employer account</strong>
                    </div>
                  </template>
                </v-radio>
              </v-radio-group>

              <v-divider></v-divider>
              <div v-for="error in errors" :key="error">
                <v-alert border="top" color="red lighten-2" dark>
                  {{ error.toString() }}
                </v-alert>
              </div>

              <button type="submit" class="btn btn-primary">Submit</button>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Axios from "axios";
export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      role: "",
      errors: [],
      show: false,
      rules: {
        required: value => !!value || "Required.",
        min: v => v.length >= 8 || "Min 8 characters"
      }
    };
  },

  methods: {
    createAccount() {
      this.errors = [];
      let data = {
        name: this.name,
        email: this.email,
        password: this.password,
        role: this.role
      };
      Axios.post("/auth/register", data)
        .then(Response => {
          console.log("RESPONSE RECEIVED : ", Response);
          this.$router.push({ path: "/login", params: { sign_up: "success" } });
        })
        .catch(errors => {
          Object.values(errors.response.data.errors).forEach(element => {
            console.log(element);
            this.errors.push(element.toString());
          });
        });
    }
  }
};
</script>

<style></style>
