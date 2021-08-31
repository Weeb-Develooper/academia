<template>
  <v-container fluid fill-height>
    <div class="text-body-1 font-weight-medium">Feedbacks</div>

    <v-row class="my-2" align="center">
      <v-col v-for="(review, r) in reviews" :key="r" cols="12" lg="3" md="6">
        <v-card class="mx-auto rounded-xl" outlined>
                <v-card-text style="height: 100%;">
                    {{review.text}}
                </v-card-text>
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
  name: "Feedbacks",
  data() {
    return {
      reviews: [],
      files: [],
      dialog: false,
      modalMsg: "",
    };
  },
  methods: {
    getFeedbacks() {
      this.modalMsg = 'Fetching reviews...'
      this.dialog = true
      axios
        .get(
          `${
            process.env.VUE_APP_API_BASE_URL
          }/reviews?course.department=${this.$store.state.user.teacher.department.toString()}`
        )
        .then((response) => {
          // Handle success.
          this.dialog = false;
          this.reviews = response.data;
        })
        .catch((error) => {
          // Handle error.
          this.dialog = false;
          console.log("An error occurred:", error.response);
        });
    },
  },
  mounted() {
    this.getFeedbacks();
  },
};
</script>
