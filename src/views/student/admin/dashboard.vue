<template>
  <v-container fluid fill-height>
    <div class="text-body-1 font-weight-regular"><strong>Continue</strong> Learning</div>
    <v-row class="my-2" align="center">
      <v-col v-for="(course, c) in courses" :key="c" cols="12" lg="3" md="6">
        <v-card class="mx-auto rounded-xl" :to="`/student/courses/${course.id}`" hover>
            <v-img src="@/assets/3D-2.png" class="white--text">
                <v-card-text style="height: 100%;">
                    <div class="text-right">2hrs remaining</div>
                    <div class="d-flex pb-4" style="height: inherit;">
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
    <div class="text-body-1 font-weight-regular"><strong>Top</strong> Lecturers</div>
    <v-row class="my-2" align="center">
        <v-chip v-for="(teacher, t) in teachers" :key="t" class="ma-2 text-capitalize" color="purple" text-color="black" outlined>
            <v-avatar left>
              <v-img src="https://cdn.dribbble.com/users/230875/screenshots/12078079/media/7ba8ec4a42b529dcbbc695ce0dd07a4a.jpg?compress=1&resize=400x300"></v-img>
            </v-avatar>
            {{teacher.firstName}} {{teacher.lastName}}
        </v-chip>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: "StudentDashboard",
  layout: "student",
  data() {
    return {
      courses: [],
      teachers: [],
    };
  },
  methods: {
    async getCourses() {
      this.loading = true;
      let url = `${
        process.env.VUE_APP_API_BASE_URL
      }/courses?department=${this.$store.state.user.student.department.toString()}`;
      try {
        let res = await fetch(url);
        return await res.json();
      } catch (err) {
        console.log(err);
      }
    },
    async getTeachers() {
      let courses = await this.getCourses();
      this.courses = courses;
      this.loading = true;
      let url = `${
        process.env.VUE_APP_API_BASE_URL
      }/teachers?department=${this.$store.state.user.student.department.toString()}`;
      try {
        let res = await fetch(url);
        return await res.json();
      } catch (err) {
        console.log(err);
      }
    },
    async renderAll() {
      let teachers = await this.getTeachers();
      this.teachers = teachers;
    },
    randomSelect() {
        var arr = [1, 2, 3];
        var wallet = arr[
          Math.floor(Math.random() * arr.length)
        ];
        return wallet;
    }
  },
  mounted() {
    this.renderAll();
  },
};
</script>
