<template>
  <v-container fluid fill-height>
    <div class="text-body-1 font-weight-medium">Dashboard</div>
    <v-row class="mt-2" align="center">
      <v-col cols="12" lg="3" md="6">
        <v-card class="mx-auto" outlined hover>
          <v-list-item two-line>
            <v-list-item-content>
              <div class="text-overline grey--text">
                Courses
              </div>
              <v-list-item-title class="text-h5">
                4
              </v-list-item-title>
            </v-list-item-content>
            <v-list-item-avatar tile size="80">
              <v-img src="@/assets/class.gif"></v-img
            ></v-list-item-avatar>
          </v-list-item>
        </v-card>
      </v-col>
      <v-col cols="12" lg="3" md="6">
        <v-card class="mx-auto" outlined hover>
          <v-list-item two-line>
            <v-list-item-content>
              <div class="text-overline grey--text">
                Files
              </div>
              <v-list-item-title class="text-h5">
                14
              </v-list-item-title>
            </v-list-item-content>
            <v-list-item-avatar tile size="80"
              ><v-img src="@/assets/files.gif"></v-img
            ></v-list-item-avatar>
          </v-list-item>
        </v-card>
      </v-col>
      <v-col cols="12" lg="3" md="6">
        <v-card class="mx-auto" outlined hover>
          <v-list-item two-line>
            <v-list-item-content>
              <div class="text-overline grey--text">
                Classes
              </div>
              <v-list-item-title class="text-h5">
                9
              </v-list-item-title>
            </v-list-item-content>
            <v-list-item-avatar tile size="80">
              <v-img src="@/assets/classes.gif"></v-img>
            </v-list-item-avatar>
          </v-list-item>
        </v-card>
      </v-col>
      <v-col cols="12" lg="3" md="6">
        <v-card class="mx-auto" outlined hover>
          <v-list-item two-line>
            <v-list-item-content>
              <div class="text-overline grey--text">
                Messages
              </div>
              <v-list-item-title class="text-h5">
                15
              </v-list-item-title>
            </v-list-item-content>
            <v-list-item-avatar tile size="80"
              ><v-img src="@/assets/messages.gif"></v-img
            ></v-list-item-avatar>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-2" align="center">
      <v-col cols="12" lg="6">
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
      <v-col cols="12" lg="6">
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">
                  S/N
                </th>
                <th class="text-left">
                  Title
                </th>
                <th class="text-left">
                  Course
                </th>
                <th class="text-left">
                  Lecturer
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in files" :key="item.name">
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
export default {
  name: "TeacherDashboard",
  data() {
    return {
      courses: [],
      files: [],
    };
  },
  methods: {
    async getCourses() {
      this.loading = true;
      let url = `${process.env.VUE_APP_API_BASE_URL}/courses?teachers_in=${this.$store.state.user.id}`;
      try {
        let res = await fetch(url);
        return await res.json();
      } catch (err) {
        console.log(err);
      }
    },
    async getFiles() {
      let courses = await this.getCourses();
      this.courses = courses;
      this.loading = true;
      let url = `${process.env.VUE_APP_API_BASE_URL}/materials?_sort=created_at:DESC&&teacher=${this.$store.state.user.id}`;
      try {
        let res = await fetch(url);
        return await res.json();
      } catch (err) {
        console.log(err);
      }
    },
    async renderAll() {
      let files = await this.getFiles();
      this.files = files;
    },
  },
  mounted() {
    this.renderAll();
  },
};
</script>
