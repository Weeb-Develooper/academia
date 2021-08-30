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
                {{ files.length }}
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

    <v-row class="mt-2">
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
                <th class="text-right">
                  Lecturers
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in courses" :key="item.id">
                <td>{{ item.code }}</td>
                <td>{{ item.title }}</td>
                <td>{{ item.units }}</td>
                <td class="text-right">{{ item.teachers.length }}</td>
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
                  Title
                </th>
                <th class="text-left">
                  Course
                </th>
                <th class="text-left">
                  File Type
                </th>
                <th class="text-right">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in files" :key="item.name">
                <td>{{ !item.title ? "NULL" : item.title }}</td>
                <td>{{ item.course.code }}</td>
                <td>{{ item.file[0].mime }}</td>
                <td class="text-right">
                  <v-btn icon :href="item.file[0].url" target="blank">
                    <v-icon>mdi-eye mdi-18px</v-icon>
                  </v-btn>
                </td>
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
  layout: "student",
  data() {
    return {
      courses: [],
      files: [],
    };
  },
  methods: {
    async getCourses() {
      this.loading = true;
      let url = `${
        process.env.VUE_APP_API_BASE_URL
      }/courses?teachers=${this.$store.state.user.teacher.id.toString()}`;
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
      let url = `${
        process.env.VUE_APP_API_BASE_URL
      }/materials?teacher=${this.$store.state.user.teacher.id.toString()}`;
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
