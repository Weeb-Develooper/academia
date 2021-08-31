<template>
  <v-container fluid fill-height>
    <div class="text-body-1 font-weight-medium">Online Classes</div>

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
                  Start
                </th>
                <th class="text-left">
                  Lecturer
                </th>
                <th class="text-right">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, d) in classes" :key="d">
                <td>{{ item.course.code }}</td>
                <td>{{ item.title }}</td>
                <td>{{ item.start }}</td>
                <td>{{ item.teacher.firstName }} {{ item.teacher.lastName }}</td>
                <td class="text-right">
                    <v-btn icon :href="item.url" target="_blank" >
                        <v-icon>mdi-video-plus</v-icon>
                    </v-btn>
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
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "StudentCourse",
  layout: "student",
  data() {
    return {
      classes: [],
      dialog: false,
      modalMsg: "",
    };
  },
  methods: {
    getCourses() {
      this.modalMsg = 'Getting online lectures...'
      this.dialog = true
      axios
        .get(
          `${
            process.env.VUE_APP_API_BASE_URL
          }/events?course.department=${this.$store.state.user.student.department.toString()}`
        )
        .then((response) => {
          // Handle success.
          this.dialog = false;
          this.classes = response.data;
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
