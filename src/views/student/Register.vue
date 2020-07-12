<template>
  <div>
    <div class="text-left" v-show="this.$store.getters.getDevice == true">
      <v-sheet color="light-blue lighten-5" height="150">
        <h2 class="text-subtitle px-12 pt-8">
          Join Academia
        </h2>
        <p class="px-12">
          Get the best as a student from Acedemia. Search faster, learn better.
        </p>
      </v-sheet>
    </div>
    <v-container fluid>
      <v-row
        class="fill-height d-flex flex-row justify-center align-center mx-1"
      >
        <v-col cols="12" lg="5" md="9" sm="10" class="text-center mx-auto">
          <v-form v-model="valid">
            <v-avatar
              size="150"
              v-show="this.$store.getters.getDevice == false"
            >
              <img src="@/assets/nerd-amico.png" alt="user" />
            </v-avatar>
            <h2
              class="text-subtitle my-5"
              v-show="this.$store.getters.getDevice == false"
            >
              Join Academia
            </h2>
            <v-text-field
              :rules="[rules.required]"
              color="text"
              label="First Name"
              outlined
            />
            <v-text-field
              :rules="[rules.required]"
              color="text"
              label="Last Name"
              outlined
            />
            <v-select
              v-model="select"
              :hint="`${select.state}, ${select.abbr}`"
              :items="items"
              item-text="state"
              item-color="text"
              color="text"
              item-value="state"
              label="Department, School"
              persistent-hint
              return-object
              outlined
            ></v-select>
            <v-text-field
              :rules="[rules.required, rules.reg, rules.max]"
              color="text"
              counter="11"
              label="Matric Number"
              outlined
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
            />
            <v-text-field
              :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show2 ? 'text' : 'password'"
              :rules="[rules.required, rules.min]"
              color="text"
              counter="10"
              label="Confrim Password"
              @click:append="show2 = !show2"
              outlined
            />
            <v-row
              class="d-flex mt-5 flex-row justify-center align-center mx-5"
            >
              <v-col cols="12" md="7">
                <v-btn depressed block color="cyan darken-3" dark
                  >Register</v-btn
                >
              </v-col>
            </v-row>
            <span class="text-subtitle-1">
              Already have an account?
              <router-link class="cyan--text darken-3" to="/student/login">Login</router-link>
            </span>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Register",

  data() {
    return {
      valid: false,
      show1: false,
      show2: false,
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
  methods: {
    ...mapState("device"),
  },
};
</script>
