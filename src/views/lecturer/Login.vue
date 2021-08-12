<template>
  <v-container fluid fill-height>
    <v-row align-content="center" justify="center">
      <v-col cols="12" lg="5" md="5" sm="10" class="text-center mx-auto">
        <v-form v-model="valid">
          <v-avatar size="150">
            <img src="@/assets/nerd-amico.png" alt="user" />
          </v-avatar>
          <h2 class="text-subtitle my-5">Start Teaching</h2>
          <v-text-field
            :rules="[rules.required, rules.reg, rules.max]"
            color="text"
            counter="11"
            label="Email"
            outlined
            dense
          />
          <v-text-field
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show1 ? 'text' : 'password'"
            :rules="[rules.required, rules.min]"
            color="text"
            counter="10"
            label="Password"
            @click:append="show1 = !show1"
            outlined
            dense
          />
          <span class="text-caption float-left red--text darken-3 mt-n5"
            >Forgot password?</span
          >
          <v-btn depressed block color="blue darken-3" class="my-2" dark
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
export default {
  name: "TeacherLogin",

  data() {
    return {
      valid: false,
      show1: false,
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
        max: (v) => v.length == 11 || "Matric number should be 11 digits!",
        reg: (val) =>
          isNaN(val) == false || "Matric number should have only digits!",
      },
    };
  },
  computed: {
    getMenu() {
      return this.$store.getters.getDevice;
    },
  },
};
</script>

<style>
a {
  text-decoration-line: none;
}
</style>
