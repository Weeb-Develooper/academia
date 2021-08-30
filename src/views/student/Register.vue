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
              :rules="[rules.required]"
              color="text"
              label="First Name" v-model="fname"
              outlined
              dense
            />
            <v-text-field
              :rules="[rules.required]"
              color="text"
              label="Middle Name" v-model="mname"
              outlined
              dense
            />
            <v-text-field
              :rules="[rules.required]"
              color="text"
              label="Last Name" v-model="lname"
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
            ></v-select>
            <v-text-field
              :rules="[rules.required, rules.reg, rules.max]"
              color="text"
              counter="11"
              label="Matric Number" v-model="regNo"
              outlined
              dense
            />
            <v-text-field
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show1 ? 'text' : 'password'"
              :rules="[rules.required]"
              color="text"
              label="Password" v-model="password"
              @click:append="show1 = !show1"
              outlined
              dense
            />
            <v-btn
              depressed
              block
              color="blue darken-3"
              class="my-2"
              dark
              :loading="loading" @click="validate"
              >Register</v-btn
            >
            <span class="text-subtitle-1">
              Already have an account?
              <router-link class="blue--text darken-3" to="/student/login"
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
  name: "StudentRegister",
  layout: "landing",
  data() {
    return {
      valid: true,
      loading: false,
      show1: false,
      select: { name: "Department", faculty: { code: "School" } },
      departments: [],
      fname: '',
      mname: '',
      lname: '',
      regNo: '',
      email: "",
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      password: "",
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
        max: (v) => v.length == 11 || "Matric number should be 11 digits!",
        reg: (val) =>
          isNaN(val) == false || "Matric number should have only digits!",
      },
    };
  },
  mounted() {
    this.getDepartments();
  },
  methods: {
    validate() {
      if (this.$refs.registerform.validate()) {
        this.createUser();
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
    createStudent(sId) {
      delete axios.defaults.headers.common.Authorization;

      this.loading = true;
      axios
        .post(`${process.env.VUE_APP_API_BASE_URL}/students`, {
          firstName: this.fname,
          lastName: this.lname,
          middleName: this.mname,
          department: this.select.id,
          regNo: parseInt(this.regNo),
          user: sId.toString()
        })
        .then(() => {
          // Handle success.
          // this.createUser(response.data.id);
          this.$router.push("/student/login");
        })
        .catch((error) => {
          // Handle error.
          this.loading = false;
          console.log("An error occurred:", error.response);
        });
    },
    createUser() {
      axios
        .post(`${process.env.VUE_APP_API_BASE_URL}/auth/local/register`, {
          username: this.fname + " " + this.mname + " " + this.lname,
          email: this.email,
          password: this.password,
          isTeacher: false,
        })
        .then((response) => {
          // Handle success.
          this.loading = false;
          this.createStudent(response.data.user.id);
        })
        .catch((error) => {
          // Handle error.
          this.loading = false;
          console.log("An error occurred:", error.response);
        });
    },

  }
};
</script>
