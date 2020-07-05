<template>
  <v-container fluid>
    <v-row class="fill-height d-flex flex-row justify-center align-center">
      <v-col cols="12" lg="8" md="9" sm="10" class="text-center mx-auto">
        <v-form v-model="valid">
          <v-avatar size="150">
            <img src="../assets/no-img.png" alt="user" />
          </v-avatar>
          <h1 class="text-subtitle">Enter Academia</h1>
          <v-text-field
            type="number"
            color="text"
            counter="11"
            label="Matric Number"
          />
          <v-text-field
            type="password"
            color="text"
            counter="10"
            label="Password"
          />
          <span class="text-caption float-right">Forgot password?</span>
          <v-row class="d-flex my-5 flex-row justify-center align-center mx-5">
            <v-col cols="12" md="4">
              <v-btn
                depressed
                class="text-capitalize"
                color="cyan darken-3"
                dark
                >Login</v-btn
              >
            </v-col>
          </v-row>
          <span class="text-subtitle-1">Connect with</span>
          <div>
            <v-btn class="ma-2" text icon color="blue">
              <v-icon>mdi-facebook</v-icon>
            </v-btn>

            <v-btn class="ma-2" text icon color="red">
              <v-icon>mdi-google</v-icon>
            </v-btn>
          </div>
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
    };
  },
};
</script>
