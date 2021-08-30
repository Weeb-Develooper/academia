<template>
  <v-container fluid fill-height>
    <div class="text-body-1 font-weight-regular"><strong>{{course.code}}:</strong> {{course.title.toUpperCase()}}</div>

    <v-row v-if="course.materials.length > 0" class="my-2">
      <v-col v-for="(mats, m) in course.materials" :key="m" cols="12" lg="3" md="6">
        <v-card class="mx-auto rounded-xl" min-height="150" :href="mats.file[0].url" target="_blank" outlined hover>
            <v-img
      height="150"
      :src="mats.file[0].url"
    ></v-img>
                <v-card-text style="height: 100%;">
                    <div class="d-flex" style="height: inherit;">
                        <div class="align-self-end black--text">
                            <strong>{{!mats.title ? 'NO TITLE' : mats.title}}</strong>
                        </div>
                    </div>
                </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row v-else class="my-2" justify="center" align="center">
        No materials available for this course yet.
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
  name: "StudentCourse",
  layout: "student",
  data() {
    return {
      course: '',
      dialog: false,
      modalMsg: "",
    };
  },
  methods: {
    getCourses() {
      this.modalMsg = 'Fetching course contents...'
      this.dialog = true
      axios
        .get(
          `${
            process.env.VUE_APP_API_BASE_URL
          }/courses/${this.$route.params.id}?department=${this.$store.state.user.student.department.toString()}`
        )
        .then((response) => {
          // Handle success.
          this.dialog = false;
          this.course = response.data;
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
