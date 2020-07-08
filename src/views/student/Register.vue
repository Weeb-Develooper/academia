<template>
  <v-container fluid>
    <v-row class="fill-height d-flex flex-row justify-center align-center mx-1">
      <v-col cols="12" lg="5" md="9" sm="10" class="text-center mx-auto">
        <v-form v-model="valid">
          <v-avatar size="150">
            <img src="@/assets/nerd-amico.png" alt="user" />
          </v-avatar>
          <h2 class="text-subtitle my-5">Join Academia</h2>
          <v-text-field
            :rules="[rules.required]"
            color="text"
            label="First Name"
          />
          <v-text-field
            :rules="[rules.required]"
            color="text"
            label="Last Name"
          />
          <v-select
            v-model="select"
            :hint="`${select.state}, ${select.abbr}`"
            :items="items"
            item-text="state"
            item-color="text"
            color="text"
            item-value="state"
            label="Select"
            persistent-hint
            return-object
            single-line
          ></v-select>
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
          <v-row class="d-flex my-5 flex-row justify-center align-center mx-5">
            <v-col cols="12" md="7">
              <v-btn depressed block color="cyan darken-3" class="my-3" dark
                >Register</v-btn
              >
              <span class="text-subtitle-1">
                Already have an account? Login
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
  name: "Register",

  data() {
    return {
      valid: false,
      show1: false,
      select: { state: "Department", abbr: "School" },
      items: [
        { state: "Computer Science", abbr: "SCIT" },
        { state: "Mechanical Engineering", abbr: "SEET" },
        { state: "Crop Science", abbr: "SAAT" },
        { state: "Physics", abbr: "SOPS" },
        { state: "Chemistry", abbr: "SOPS" },
        { state: "Biotechnology", abbr: "SOBS" },
        { state: "Petroleum Engineering", abbr: "SEET" },
        { state: "Chemical Engineering", abbr: "SEET" },
        { state: "Environmental Science", abbr: "SOES" },
        { state: "Microbiology", abbr: "SOBS" },
        { state: "Mechatronics", abbr: "SEET" },
        { state: "Forestry & Wildlife", abbr: "SEET" },
      ],
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
        max: (v) => v.length == 11 || "Matric number should be 11 digits!",
        reg: (val) =>
          isNaN(val) == false || "Matric number should have only digits!",
      },
    };
  },
};
</script>
