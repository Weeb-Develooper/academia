<template>
  <div>
    <v-container fluid>
      <v-row
        class="fill-height d-flex flex-row justify-center align-center mx-1"
      >
        <v-col cols="12" lg="5" md="9" sm="10" class="text-center mx-auto">
          <v-form ref="registerform" v-model="valid" lazy-validation>
            <v-avatar size="150">
              <img src="@/assets/nerd-amico.png" alt="user" />
            </v-avatar>
            <h2 class="text-subtitle my-5">
              Join Academia
            </h2>
            <v-text-field
              v-model="fname"
              :rules="nameRules"
              color="text"
              label="First Name"
              outlined
              dense
            />
            <v-text-field
              v-model="lname"
              :rules="nameRules"
              color="text"
              label="Last Name"
              outlined
              dense
            />
            <v-text-field
              v-model="email"
              :rules="emailRules"
              color="text"
              label="Email"
              outlined
              dense
            />
            <v-select
              v-model="select"
              :rules="nameRules"
              :hint="`${select.name}, ${select.faculty.code}`"
              :items="departments"
              item-text="name"
              item-color="text"
              color="text"
              :item-value="`${select.id}`"
              label="Department, School"
              persistent-hint
              return-object
              outlined
              dense
              :disable="loading"
            ></v-select>
            <v-text-field
              v-model="password"
              :rules="nameRules"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show1 ? 'text' : 'password'"
              color="text"
              counter="10"
              label="Password"
              @click:append="show1 = !show1"
              outlined
              dense
            />
            <v-btn
              :disabled="!valid"
              :loading="loading"
              depressed
              block
              color="blue darken-3"
              class="my-2"
              dark
              @click="validate"
              >Register</v-btn
            >
            <span class="text-subtitle-1">
              Already have an account?
              <router-link class="blue--text darken-3" to="/teacher/login"
                ><strong>Login</strong></router-link
              >
            </span>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "TeacherRegister",
  layout: "landing",
  data() {
    return {
      valid: true,
      loading: false,
      show1: false,
      fname: "",
      lname: "",
      email: "",
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      password: "",
      select: { name: "Department", faculty: { code: "School" } },
      nameRules: [(v) => !!v || "Required field"],
      departments: [],
    };
  },
  mounted() {
    this.getDepartments();
  },
  methods: {
    validate() {
      if (this.$refs.registerform.validate()) {
        this.createTeacher();
      }
    },
    getDepartments() {
      this.loading = true;
      axios
        .get(`${process.env.VUE_APP_API_BASE_URL}/departments`)
        .then((response) => {
          // Handle success.
          this.loading = false;
          this.departments = response.data;
          // this.$router.push("/auth/login");
        })
        .catch((error) => {
          // Handle error.
          this.loading = false;
          console.log("An error occurred:", error.response);
        });
    },
    createTeacher() {
      this.loading = true;
      axios
        .post(`${process.env.VUE_APP_API_BASE_URL}/teachers`, {
          firstName: this.fname,
          lastName: this.lname,
          department: this.select.id,
        })
        .then((response) => {
          // Handle success.
          this.createUser(response.data.id);
        })
        .catch((error) => {
          // Handle error.
          this.loading = false;
          console.log("An error occurred:", error.response);
        });
    },
    createUser(tId) {
      axios
        .post(`${process.env.VUE_APP_API_BASE_URL}/auth/local/register`, {
          username: this.fname + " " + this.lname,
          email: this.email,
          password: this.password,
          isTeacher: true,
          teacher: tId.toString(),
        })
        .then((response) => {
          // Handle success.
          this.loading = false;
          console.log(response.data);
          this.$router.push("/teacher/login");
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
