<template>
    <v-container fluid app>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="companyname"
        :rules="NameRules"
        label="Company Name"
        required
      ></v-text-field>
      <v-text-field
        v-model="jobtitle"
        :rules="jobRules"
        label="Job Title"
        required
      ></v-text-field>
      <v-text-field
        v-model="country"
        :rules="CountryRules"
        label="Country"
        required
      ></v-text-field>
      <v-text-field
        v-model="city"
        :rules="CityRules"
        label="City"
        required
      ></v-text-field>
      <v-text-field
        v-model="salary"
        :rules="salaryRules"
        label="Salary"
        required
        type="number"
      ></v-text-field>
      <v-textarea
        label="Paragraph"
        v-model="Paragraph"
        :rules="ParagraphRules"
        placeholder="Job Description and Skills needed"
      ></v-textarea>
      <v-checkbox
        v-model="checkbox"
        :rules="[v => !!v || 'You must agree to continue!']"
        label="Do you agree?"
        required
      ></v-checkbox>

      <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate"
        >Validate</v-btn
      >

      <v-btn color="error" class="mr-4" @click="reset">Reset Form</v-btn>
    </v-form>
  </v-container>
</template>
<script>
//import axios from 'axios';
import { mapActions, mapGetters } from "vuex";
export default {
  data: () => ({
    valid: true,
    companyname: "",
    NameRules: [v => !!v || "Company Name is required"],
    jobtitle: "",
    jobRules: [v => !!v || "Job Title is required"],
    city: "",
    CityRules: [v => !!v || "City is required"],
    country: "",
    CountryRules: [v => !!v || "Country is required"],
    salary: "",
    salaryRules: [
      v => !!v || "Salary is required"
      /*v=>(v && v.type!="Number") || "Please Inter Numbers only in this field"*/
    ],
    Paragraph: "",
    ParagraphRules: [
      v => !!v || "Paragraph is required",
      v =>
        (v && v.length >= 20) || "Paragraph must be less at least 20 characters"
    ],
    select: null,
    checkbox: false,
    update: false,
    id: null
  }),
  computed: {
    ...mapGetters({
      user: "auth/user"
    })
  },
  methods: {
    ...mapActions("offers", ["AddOffer", "UpdateOffer"]),
    ...mapActions("offers", ["FetchOffers"]),
    validate() {
      this.$refs.form.validate();
      if (this.valid) {
        if (this.update == false) {
          this.AddOffer({
            companyname: this.companyname,
            jobtitle: this.jobtitle,
            country: this.country,
            city: this.city,
            job_salary: this.salary,
            Paragraph: this.Paragraph,
            user_id: this.user.id,
            email: this.user.email,
            fullname: this.user.name
          }).then(() => {
            this.$router.push("/offers");
          });
          this.$refs.form.reset();
          this.FetchOffers();
        } else {
          this.UpdateOffer({
            id: this.id,
            companyname: this.companyname,
            jobtitle: this.jobtitle,
            country: this.country,
            city: this.city,
            job_salary: this.salary,
            Paragraph: this.Paragraph,
            user_id: this.user.id,
            email: this.user.email,
            fullname: this.user.name
          }).then(() => {
            this.$router.push("/offers");
          });
          this.$refs.form.reset();
        }
      }
    },
    reset() {
      this.$refs.form.reset();
    }
  },
  created() {
    this.update = this.$route.params.update;
    this.id = this.$route.params.id;
  }
};
</script>
<style scoped></style>
