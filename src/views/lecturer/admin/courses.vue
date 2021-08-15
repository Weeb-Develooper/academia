<template>
  <v-container fluid fill-height>
    <div class="text-body-1 font-weight-medium">Courses</div>
    <div class="ms-auto">
      <v-btn
        color="blue-grey"
        class="text-capitalize"
        plain
        text
        :ripple="false"
        @click="courseDialog = true"
      >
        <span
          class="iconify mr-2"
          data-icon="majesticons:applications-add-line"
          data-width="20"
          data-height="20"
        ></span>
        New Course
      </v-btn>
    </div>

    <v-row class="mt-2" align="center" justify="center">
      <v-col cols="12" lg="10">
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">
                  Code
                </th>
                <th class="text-left">
                  Title
                </th>
                <th class="text-left">
                  Unit
                </th>
                <th class="text-left">
                  Lecturers
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, id) in courses" :key="id">
                <td>{{ item.code }}</td>
                <td>{{ item.title }}</td>
                <td>{{ item.units }}</td>
                <td>{{ item.teachers.length }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" hide-overlay persistent width="300">
      <v-card color="blue darken-1" class="pt-2" dark>
        <v-card-text>
          {{ modalMsg }}
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="courseDialog"
      transition="slide-y-transition"
      max-width="700"
    >
      <v-card>
        <v-form ref="courseform" v-model="valid" lazy-validation>
          <v-toolbar color="blue darken-1" class="subtitle-1" dark>
            Create a Course
            <v-icon
              class="ml-auto mx-3"
              plain
              :ripple="false"
              text
              @click="courseDialog = false"
            >
              mdi-close
            </v-icon>
          </v-toolbar>
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="title"
                  :rules="formRules"
                  color="text"
                  label="Course Title"
                  outlined
                  dense
                  required
                ></v-text-field>
                <v-text-field
                  v-model="code"
                  :rules="formRules"
                  color="text"
                  label="Course Code"
                  outlined
                  dense
                  required
                ></v-text-field>
                <v-text-field
                  v-model="unit"
                  :rules="formRules"
                  color="text"
                  label="Credit Unit"
                  outlined
                  dense
                  required
                ></v-text-field>
                <v-btn @click="validate" block :ripple="false" color="blue" dark
                  >Create</v-btn
                >
              </v-col>
            </v-row>
          </v-card-text>
        </v-form>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "TeacherCourses",
  data() {
    return {
      courses: [],
      files: [],
      valid: true,
      dialog: false,
      courseDialog: false,
      modalMsg: "",
      code: "",
      title: "",
      unit: "",
      formRules: [(v) => !!v || "Required field"],
    };
  },
  methods: {
    validate() {
      if (this.$refs.courseform.validate()) {
        this.createCourse();
      }
    },
    getCourses() {
      this.loading = true;
      axios
        .get(
          `${
            process.env.VUE_APP_API_BASE_URL
          }/courses?department=${this.$store.state.user.teacher.department.toString()}`
        )
        .then((response) => {
          // Handle success.
          this.loading = false;
          this.courses = response.data;
        })
        .catch((error) => {
          // Handle error.
          this.loading = false;
          console.log("An error occurred:", error.response);
        });
    },
    createCourse() {
      this.modalMsg = "Creating course...";
      this.dialog = true;
      this.loading = true;
      axios
        .post(`${process.env.VUE_APP_API_BASE_URL}/courses`, {
          title: this.title,
          units: parseInt(this.unit),
          code: this.code,
          department: this.$store.state.user.teacher.department.toString(),
          teachers: [`${this.$store.state.user.teacher.id.toString()}`],
        })
        .then(() => {
          // Handle success.
          this.dialog = false;
          this.loading = false;
          this.courseDialog = false;
          this.getCourses();
        })
        .catch((error) => {
          // Handle error.
          this.dialog = false;
          this.loading = false;
          console.log("An error occurred:", error.response);
        });
    },
  },
  mounted() {
    this.getCourses();
  },
};
</script>
