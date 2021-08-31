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
      <v-col cols="12">
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
                <th class="text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, d) in courses" :key="d">
                <td>{{ item.code }}</td>
                <td>{{ item.title }}</td>
                <td>{{ item.units }}</td>
                <td>{{ item.teachers.length }}</td>
                <td class="text-right">
                  <v-menu transition="slide-x-transition" bottom right>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn icon v-bind="attrs" v-on="on">
                        <v-icon>mdi-dots-vertical</v-icon>
                      </v-btn>
                    </template>

                    <v-list dense>
                      <v-list-item link @click="lecture(item.id)">
                        <v-list-item-title>Fix Class</v-list-item-title>
                      </v-list-item>
                      <v-list-item
                        link
                        @click="
                          setEdit(item.code, item.title, item.units, item.id)
                        "
                      >
                        <v-list-item-title>Edit</v-list-item-title>
                      </v-list-item>
                      <v-list-item link @click="remove(item.id)">
                        <v-list-item-title>Delete</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </td>
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
    <v-dialog
      v-model="editDialog"
      transition="slide-y-transition"
      max-width="700"
    >
      <v-card>
        <v-form ref="editcourseform" v-model="valid" lazy-validation>
          <v-toolbar color="blue darken-1" class="subtitle-1" dark>
            Edit a Course
            <v-icon
              class="ml-auto mx-3"
              plain
              :ripple="false"
              text
              @click="editDialog = false"
            >
              mdi-close
            </v-icon>
          </v-toolbar>
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="editTitle"
                  :rules="formRules"
                  color="text"
                  label="Course Title"
                  outlined
                  dense
                  required
                ></v-text-field>
                <v-text-field
                  v-model="editCode"
                  :rules="formRules"
                  color="text"
                  label="Course Code"
                  outlined
                  dense
                  required
                ></v-text-field>
                <v-text-field
                  v-model="editUnit"
                  :rules="formRules"
                  color="text"
                  label="Credit Unit"
                  outlined
                  dense
                  required
                ></v-text-field>
                <v-btn
                  @click="editValidate"
                  block
                  :ripple="false"
                  color="blue"
                  dark
                  >Edit</v-btn
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
      editDialog: false,
      modalMsg: "",
      code: "",
      title: "",
      unit: "",
      editCode: "",
      editTitle: "",
      editUnit: "",
      editId: "",
      formRules: [(v) => !!v || "Required field"],
    };
  },
  methods: {
    validate() {
      if (this.$refs.courseform.validate()) {
        this.createCourse();
      }
    },
    editValidate() {
      if (this.$refs.editcourseform.validate()) {
        this.edit();
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
    edit() {
      this.modalMsg = "Editing course...";
      this.dialog = true;
      this.loading = true;
      axios
        .put(`${process.env.VUE_APP_API_BASE_URL}/courses/${this.editId}`, {
          title: this.editTitle,
          units: parseInt(this.editUnit),
          code: this.editCode,
          department: this.$store.state.user.teacher.department.toString(),
          teachers: [`${this.$store.state.user.teacher.id.toString()}`],
        })
        .then(() => {
          // Handle success.
          this.getCourses();
          this.dialog = false;
          this.loading = false;
          this.editDialog = false;
        })
        .catch((error) => {
          // Handle error.
          this.dialog = false;
          this.loading = false;
          console.log("An error occurred:", error.response);
        });
    },
    remove(id) {
      axios
        .delete(`${process.env.VUE_APP_API_BASE_URL}/courses/${id}`)
        .then(() => {
          // Handle success.
          this.getCourses();
        })
        .catch((error) => {
          // Handle error.
          console.log("An error occurred:", error.response);
        });
    },
    setEdit(code, name, unit, id) {
      this.editCode = code;
      this.editTitle = name;
      this.editUnit = unit;
      this.editId = id;
      this.editDialog = true;
    },
    lecture(id) {
      this.$router.push(`/teacher/lecture/${id}`);
    },
  },
  mounted() {
    this.getCourses();
  },
};
</script>
