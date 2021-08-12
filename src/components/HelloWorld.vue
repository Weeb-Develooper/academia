<template>
  <div>
    <v-img
      src="@/assets/620955908.jpg"
      gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
      height="400"
    >
      <v-container>
        <v-row>
          <v-col cols="12" lg="6" md="6" sm="12" class="mx-auto">
            <v-container class="text-center">
              <h1 class="display-2 white--text font-weight-regular mt-5">
                Become an
              </h1>
              <p class="display-4 font-weight-medium blue--text">
                Academian
              </p>
              <p class="white--text">
                Take your learning to the next level. Complete courses, take
                tests and get your scores immediately. Click one of the button
                below to register as...
              </p>
              <v-btn
                class="text-capitalize"
                color="blue darken-3"
                to="/student/login"
                text
                dark
              >
                Student
              </v-btn>
              <v-btn
                class="ml-3 text-capitalize"
                color="blue darken-3"
                to="/lecturer/login"
                tile
                depressed
                dark
              >
                Lecturer
              </v-btn>
            </v-container>
          </v-col>
        </v-row>
      </v-container>
    </v-img>

    <div style="background-color: rgba(173, 216, 230, 0.5);">
      <v-container>
        <v-row>
          <v-col
            v-show="$store.state.menu == false"
            cols="12"
            lg="7"
            md="7"
            sm="7"
          >
            <v-img
              src="@/assets/Asset 1.svg"
              aspect-ratio="2.3"
              contain
            ></v-img>
          </v-col>
          <v-col cols="12" lg="5" md="5" sm="5">
            <div class="my-12 px-2 mx-9">
              <h2 class="pt-3 text-h3">Best Features</h2>
              <p class="mt-2 text-subtitle-1">
                But I must explain to you how all this mistaken idea of
                denouncing pleasure and praising pain was born and I will give
                you a complete account of the system, and expound the actual
                teachings of the great explorer of the truth, the master builder
                of human happiness. No one rejects, dislikes or avoids.
              </p>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <v-container>
      <v-row>
        <v-col v-for="(col3, c) in row3" :key="c" cols="12" md="4" class="mt-2">
          <v-lazy
            v-model="isActive"
            :options="{
              threshold: 0.5,
            }"
            transition="fade-transition"
          >
            <v-card class="mx-auto" outlined>
              <v-img :src="col3.img" height="200" class="white--text align-end">
                <v-card-title>{{ col3.txt }}</v-card-title>
              </v-img>
              <v-card-text class="text--primary">
                <!-- <div>Whitehaven Beach</div> -->

                <div>
                  But I must explain to you how all this mistaken idea of
                  denouncing pleasure and praising pain was born and I will give
                  you a complete account of the system,
                </div>
              </v-card-text>
            </v-card>
          </v-lazy>
        </v-col>
      </v-row>
    </v-container>
    <div style="background-color: #1565C0;">
      <v-container>
        <v-row>
          <v-col cols="12" lg="6" md="6" sm="6" class="mx-auto">
            <div class="text-center white--text">
              <div class="text-h4 transition-swing mt-12">
                Search a Department
              </div>
              <div class="text-subtitle-1 transition-swing my-2 mx-2">
                Enroll today in any course of your choice and get above your
                peers. Better yourself today and help your career. Better
                yourself with Academia.
              </div>
              <div class="mx auto mx-8 mt-6 mb-12">
                <v-text-field
                  label="Search Department"
                  append-icon="mdi-magnify"
                  background-color="white"
                  color="grey"
                  single-line
                  outlined
                ></v-text-field>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",

  data: () => ({
    isActive: false,
    row3: [
      {
        img:
          "https://unsplash.com/photos/MAGAXAYq_NE/download?force=true&w=1920",
        txt: "Read Online",
      },
      {
        img:
          "https://unsplash.com/photos/-2vD8lIhdnw/download?force=true&w=1920",
        txt: "Online Lectures",
      },
      {
        img:
          "https://unsplash.com/photos/2FPjlAyMQTA/download?force=true&w=1920",
        txt: "Community",
      },
    ],
  }),
};
</script>

<style scoped>
.unclear {
  background-color: rgba(37, 37, 139, 0.45);
}

.v-img--offset {
  bottom: -36px;
  position: relative;
}
</style>
