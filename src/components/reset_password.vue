<template>
  <div class="container mt-5">
    <div class="alert alert-primary">
      <form @submit.prevent="sendToken">
        <div class="form-group">
          <label>Email</label>
          <input
            type="text"
            class="form-control"
            v-bind:class="{ 'is-invalid': errorEmail, 'is-valid': infoEmail }"
            placeholder="Enter Your Email"
            v-model="email"
          />
          <div class="invalid-feedback">{{ errorEmail }}</div>
          <div class="valid-feedback">{{ infoEmail }}</div>
        </div>
        <button class="btn btn-primary" type="submit">
          Send Token to Email
        </button>
      </form>
    </div>
    <div class="alert alert-secondary" v-if="tokenSent">
      <form @submit.prevent="validateToken">
        <div class="form-group">
          <label>Token</label>
          <input
            class="form-control"
            v-bind:class="{ 'is-invalid': errorToken, 'is-valid': tokenInfo }"
            placeholder="Enter the Token"
            v-model="token"
          />
          <div class="invalid-feedback">{{ errorToken }}</div>
          <div class="valid-feedback">{{ tokenInfo }}</div>
        </div>
        <button class="btn btn-secondary" type="submit">Validate Token</button>
      </form>
    </div>
    <div class="alert alert-success" v-if="tokenisValid">
      <form @submit.prevent="resetpassword">
        <div class="form-group">
          <label>New Password</label>
          <input
            class="form-control"
            type="password"
            v-bind:class="{ 'is-invalid': errorNewPassword }"
            placeholder="Enter new password"
            v-model="newpassword"
          />
          <div class="invalid-feedback">{{ errorNewPassword }}</div>
        </div>
        <div class="form-group">
          <label>New Password Again</label>
          <input
            class="form-control"
            v-bind:class="{ 'is-invalid': errorNewPasswordAgain }"
            placeholder="Enter new password again"
            v-model="newpasswordagain"
            type="password"
          />
          <div class="invalid-feedback">{{ errorNewPasswordAgain }}</div>
        </div>
        <button class="btn btn-success" type="submit">ResetPassword</button>
      </form>
    </div>
  </div>
</template>
<script>
import { sendToken } from "../Services/auth/auth.js";
import { validateToken } from "../Services/auth/auth.js";
import { resetPassword } from "../Services/auth/auth.js";
export default {
  data() {
    return {
      email: "",
      errorEmail: null,
      token: "",
      errorToken: null,
      newpassword: "",
      errorNewPassword: null,
      newpasswordagain: "",
      errorNewPasswordAgain: null,
      tokenisValid: false,
      infoEmail: "",
      tokenInfo: "",
      tokenSent: false,
      user: null
    };
  },
  methods: {
    sendToken() {
      this.errorEmail = null;
      if (!this.email) {
        this.errorEmail = "email is required";
      }
      if (!this.errorEmail) {
        const data = {
          email: this.email
        };
        sendToken(data)
          .then(response => {
            if (response) {
              this.infoEmail = "Token Sent Check your Email";
              this.tokenSent = true;
            }
          })
          .catch(error => {
            this.errorEmail = error.response.data.error;
          });
      }
    },
    validateToken() {
      this.errorToken = null;
      if (!this.token) {
        this.errorToken = "Token required";
      }
      if (!this.errorToken) {
        const data = {
          token: this.token
        };
        validateToken(data)
          .then(response => {
            if (response.data) {
              this.user = response.data;
              this.tokenInfo = "your Token is valid";
              this.tokenisValid = true;
            }
          })
          .catch(error => {
            this.errorToken = error.response.data.error;
          });
      }
    },
    resetpassword() {
      this.errorNewPassword = null;
      this.errorNewPasswordAgain = null;
      if (!this.newpassword) {
        this.errorNewPassword = "new password is required";
      }
      if (!this.newpasswordagain) {
        this.errorNewPasswordAgain = "new password is required";
      }
      if (this.newpasswordagain !== this.newpassword) {
        this.errorNewPassword = "password do not match";
      }

      if (!this.errorNewPassword && !this.errorNewPasswordAgain) {
        console.log(this.user.id);
        const data = {
          password: this.newpassword,
          user_id: this.user.id
        };
        resetPassword(data)
          .then(response => {
            console.log(response);
            this.$router.push("/login");
          })
          .catch(() => {});
      }
    }
  }
};
</script>
