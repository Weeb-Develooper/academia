<template>
  <v-container fluid v-resize="getMenu">
    <v-row class="fill-height d-flex flex-row justify-center align-center mx-8">
      <v-col cols="12" lg="5" md="5" sm="10" class="text-center mx-auto">
        <v-form v-model="valid">
          <v-avatar size="150" v-show="getMenu == true">
            <img src="@/assets/nerd-amico.png" alt="user" />
          </v-avatar>
          <h2 class="text-subtitle my-5">Enter Academia</h2>
          <v-text-field
            :rules="[rules.required, rules.reg, rules.max]"
            color="text"
            counter="11"
            label="Matric Number"
          />
          <v-text-field
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show1 ? 'text' : 'password'"
            :rules="[rules.required, rules.min]"
            color="text"
            counter="10"
            label="Password"
            @click:append="show1 = !show1"
          />
          <span class="text-caption float-left">Forgot password?</span>
          <v-row class="d-flex my-5 flex-row justify-center align-center mx-5">
            <v-col cols="12" md="7">
              <v-btn depressed block color="cyan darken-3" class="my-3" dark
                >Login</v-btn
              >
              <span class="text-subtitle-1">
                Don't have an account? Sign up
              </span>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Login",

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
