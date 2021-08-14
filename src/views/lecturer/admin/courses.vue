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
                  Department
                </th>
                <th class="text-left">
                  Lecturers
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in courses" :key="item.name">
                <td>{{ item.name }}</td>
                <td>{{ item.calories }}</td>
                <td>{{ item.calories }}</td>
                <td>{{ item.calories }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
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
    };
  },
  methods: {
    getCourses() {
      this.loading = true;
      axios
        .get(
          `${process.env.VUE_APP_API_BASE_URL}/courses?department=${this.$store.state.user.teacher.department}`
        )
        .then((response) => {
          // Handle success.
          this.loading = false;
          console.log(response.data);
        })
        .catch((error) => {
          // Handle error.
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
