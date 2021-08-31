<template>
    <v-container fluid fill-height>
    <div class="text-body-1 font-weight-medium">Leave a Review</div>
            <v-row align="center" justify="center">
              <v-col cols="12" md="6">
                <v-form ref="fileform" v-model="valid" lazy-validation>
                        <v-select
                        v-model="select"
                        :rules="formRules"
                        :hint="`${select.code}, ${select.title}`"
                        :items="courses"
                        item-text="code"
                        item-color="text"
                        color="text"
                        :item-value="`${select.id}`"
                        label="Course"
                        persistent-hint
                        return-object
                        outlined
                        dense
                        :disable="loading"
                        ></v-select>
                        <v-textarea
                        v-model="text"
                        :rules="formRules"
                        color="text"
                        label="Message"
                        outlined
                        dense
                        required
                        ></v-textarea>
                        <v-btn @click="send" block :ripple="false" color="blue" dark
                        >Send</v-btn
                        >
                </v-form>
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
  name: "Feedback",
  data() {
      return {
        courses: [],
        select: { code: "Course Code", title: "Course Title" },
        loading: false,
        valid: true,
        formRules: [(v) => !!v || "Required field"],
        text: '',
      }
  },
  methods: {
    getCourses() {
      this.loading = true;
      axios
        .get(
          `${
            process.env.VUE_APP_API_BASE_URL
          }/courses?department=${this.$store.state.user.student.department.toString()}`
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
    send() {
      this.modalMsg = "Sending...";
      this.dialog = true;
      this.loading = true;
      axios
        .post(`${process.env.VUE_APP_API_BASE_URL}/reviews`, {
          text: this.text,
          course: this.select.id.toString()
        })
        .then(() => {
          // Handle success.
      this.dialog = false;
          this.loading = false;
        })
        .catch((error) => {
          // Handle error.
          this.loading = false;
      this.dialog = false;
          console.log("An error occurred:", error.response);
        });
    },
  },
  mounted() {
      this.getCourses();
  },
}
</script>

<style>

</style>