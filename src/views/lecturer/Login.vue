<template>
  <v-container fluid fill-height>
    <v-row align-content="center" justify="center">
      <v-col cols="12" lg="5" md="5" sm="10" class="text-center mx-auto">
        <v-form ref="loginform" v-model="valid" lazy-validation>
          <v-avatar size="150">
            <img src="@/assets/nerd-amico.png" alt="user" />
          </v-avatar>
          <h2 class="text-subtitle my-5">Start Teaching</h2>
          <v-text-field
            v-model="email"
            :rules="emailRules"
            color="text"
            label="Email"
            outlined
            dense
          />
          <v-text-field
            v-model="password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show1 ? 'text' : 'password'"
            :rules="reqRules"
            color="text"
            label="Password"
            @click:append="show1 = !show1"
            outlined
            dense
          />
          <span class="text-caption float-left red--text darken-3 mt-n5"
            >Forgot password?</span
          >
          <v-btn
            :loading="loading"
            depressed
            block
            color="blue darken-3"
            class="my-2"
            dark
            @click="validate"
            >Login</v-btn
          >

          <span class="text-subtitle-1">
            Don't have an account?
            <router-link class="blue--text text-darken-3" to="/teacher/register"
              ><strong>Sign up</strong></router-link
            >
          </span>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "TeacherLogin",
  layout: "landing",
  data() {
    return {
      valid: true,
      show1: false,
      loading: false,
      email: "",
      password: "",
      reqRules: [(v) => !!v || "Required field"],
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
    };
  },
  computed: {
    getMenu() {
      return this.$store.getters.getDevice;
    },
  },
  methods: {
    validate() {
      if (this.$refs.loginform.validate()) {
        this.loginTeacher();
      }
    },
    loginTeacher() {
      this.loading = true;
      axios
        .post(`${process.env.VUE_APP_API_BASE_URL}/auth/local`, {
          identifier: this.email,
          password: this.password,
        })
        .then((response) => {
          // Handle success.
          this.loading = false;
          let jwt = response.data.jwt;
          let user = response.data.user;
          this.$store.commit("SET_USER_STATE", user);
          this.$store.commit("SET_USER_TOKEN", jwt);
          this.$router.push("/teacher/dashboard");
        })
        .catch((error) => {
          // Handle error.
          this.loading = false;
          console.log("An error occurred:", error.response);
        });
    },
  },
};
</script>

<style>
a {
  text-decoration-line: none;
}
</style>
