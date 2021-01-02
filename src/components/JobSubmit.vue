<template>
  <v-container fluid app>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="fullname"
        :rules="nameRules"
        label="Full Name"
        required
      ></v-text-field>
      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        required
      ></v-text-field>
      <v-text-field
        v-model="country"
        :rules="CountryRules"
        label="Country"
        required
      ></v-text-field>
      <v-text-field
        v-model="number"
        :rules="NumberRules"
        label="Phone Number"
        required
        type="number"
      ></v-text-field>
      <v-textarea
        label="Paragraph"
        v-model="Paragraph"
        :rules="ParagraphRules"
        placeholder="Why did you choose this company ? and what's motivates you ? "
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
import { mapActions, mapGetters } from "vuex";
export default {
  //props : ['joboffer_id'],
  data: () => ({
    valid: true,
    fullname: "",
    nameRules: [v => !!v || "Full Name is required"],
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ],
    country: "",
    CountryRules: [v => !!v || "Country is required"],
    number: "",
    NumberRules: [
      v => !!v || "Phone number is required"
      /*v=>(v && v.type!="Number") || "Please Inter Numbers only in this field"*/
    ],
    Paragraph: "",
    ParagraphRules: [
      v => !!v || "Paragraph is required",
      v =>
        (v && v.length >= 20) || "Paragraph must be less at least 20 characters"
    ],
    select: null,
    joboffer_id: null,
    checkbox: false
  }),
  computed: {
    ...mapGetters("auth", ["user"])
  },
  methods: {
    ...mapActions("submitions", ["SubmitCandidate"]),
    ...mapActions("offers", ["AddCandidate"]),
    validate() {
      this.$refs.form.validate();
      if (this.valid) {
        this.SubmitCandidate({
          fullname: this.fullname,
          email: this.email,
          country: this.country,
          phonenumber: this.number,
          Description: this.Paragraph,
          user_id: this.user.id,
          joboffer_id: this.joboffer_id
        });
        this.AddCandidate({
          fullname: this.fullname,
          email: this.email,
          country: this.country,
          phonenumber: this.number,
          Description: this.Paragraph,
          user_id: this.user.id,
          joboffer_id: this.joboffer_id
        });
        this.$refs.form.reset();
        this.$router.push("/offers");
      }
    },
    reset() {
      this.$refs.form.reset();
    }
  },
  created() {
    this.joboffer_id = this.$route.params.id;
  }
};
</script>
<style scoped></style>
