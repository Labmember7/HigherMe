<template>
  <div v-if="profileType === ''"><h1 class="text-center">LOADING</h1></div>
  <div v-else-if="profileType === 'employee'">
    <employee-profile></employee-profile>
  </div>
  <div v-else-if="profileType === 'employer'">
    <employer-profile></employer-profile>
  </div>
  <div v-else><v-alert>Error!!</v-alert></div>
</template>

<script>
import employeeProfile from "@/components/EmployeeProfile.vue";
import employerProfile from "@/components/EmployerProfile.vue";
import { mapGetters } from "vuex";

export default {
  pageTitle: "My Profile",
  components: { employerProfile, employeeProfile },
  data() {
    return {
      profileType: "employer"
    };
  },
  computed: {
    ...mapGetters({
      authenticated: "auth/authenticated",
      user: "auth/user"
    })
  },
  mounted: function() {
    if (this.user) {
      this.loadByProfileType(); //loadByProfileType will execute at pageload
    } else {
      this.$router.push("/");
    }
  },
  methods: {
    loadByProfileType() {
      this.profileType = this.user.role;
      console.log(this.profileType);
    }
  }
};
</script>
