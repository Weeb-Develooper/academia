<template>
  <v-container>
    <v-row>
      <v-col cols="12" lg="6" md="6" sm="6">
        <v-lazy v-model="isActive" transition="scroll-x-transition">
          <div>
            <h1 class="display-2 font-weight-bold mt-5">
              Learn with
            </h1>
            <p class="display-4 font-weight-regular cyan--text accent-2">
              Academia.
            </p>
            <p class="text-justify">
              Take your learning to the next level. Complete courses, take tests
              and get your scores immediately. Click one of the button below to
              register as...
            </p>
            <v-btn class="text-capitalize" color="blue accent-3" dark>
              Student
            </v-btn>
            <v-btn class="ml-3 text-capitalize" text color="blue accent-3" dark>
              Lecturer
            </v-btn>
          </div>
        </v-lazy>
      </v-col>

      <v-col cols="12" lg="6" md="6" sm="6">
        <v-img
          src="../assets/3777639.jpg"
          class="my-3 text-center align-center"
          contain
          >Hahah</v-img
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "HelloWorld",

  data: () => ({
    isActive: false,
  }),
};
</script>
