<template>
  <v-container fluid fill-height>
    <div class="text-body-1 font-weight-medium">My Courses</div>

    <v-row class="my-2" align="center">
      <v-col v-for="(course, c) in courses" :key="c" cols="12" lg="3" md="6">
        <v-card class="mx-auto rounded-xl" :to="`/student/courses/${course.id}`" hover>
            <v-img src="@/assets/3D-3.png" class="white--text">
                <v-card-text style="height: 100%;">
                    <div class="d-flex" style="height: inherit;">
                        <div class="align-self-end white--text">
                            <strong>{{course.code}}: {{course.title.toUpperCase()}} </strong>
                            <div class=""><span
              class="iconify"
              data-icon="majesticons:user-circle-line"
              data-width="20"
              data-height="20"
            ></span>{{course.teachers[0].lastName }}</div>  
                        </div>
                    </div>
                </v-card-text>
            </v-img>
        </v-card>
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
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "StudentCourses",
  layout: "student",
  data() {
    return {
      courses: [],
      files: [],
      dialog: false,
      modalMsg: "",
    };
  },
  methods: {
    getCourses() {
      this.modalMsg = 'Fetching courses...'
      this.dialog = true
      axios
        .get(
          `${
            process.env.VUE_APP_API_BASE_URL
          }/courses?department=${this.$store.state.user.student.department.toString()}`
        )
        .then((response) => {
          // Handle success.
          this.dialog = false;
          this.courses = response.data;
        })
        .catch((error) => {
          // Handle error.
          this.dialog = false;
          console.log("An error occurred:", error.response);
        });
    },
  },
  mounted() {
    this.getCourses();
  },
};
</script>
