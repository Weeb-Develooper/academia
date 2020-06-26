<template>
  <v-app>
    <v-app-bar app color="primary" dark v-resize="method1">
      <v-app-bar-nav-icon
        @click="drawer = true"
        color="teal"
        v-show="menu == true"
      ></v-app-bar-nav-icon>

      <!-- Nav Drawer -->
      <v-navigation-drawer app v-model="drawer" absolute temporary>
        <v-list nav dense>
          <v-list-item-group
            v-model="group"
            active-class="deep-purple--text text--accent-4"
          >
            <v-list-item v-for="list in lists" :key="list">
              <v-list-item-title>{{ list }}</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>

      <div :class="`${tClass}`">
        <v-toolbar-title>Academia</v-toolbar-title>
      </div>

      <v-spacer v-show="menu == false"></v-spacer>

      <div class="text-center" v-show="menu == false">
        <span class="ma-2" v-for="list in lists" :key="list">{{ list }}</span>
        <v-btn small class="ma-2" tile outlined color="secondary">
          Login
        </v-btn>
        <v-btn small class="ma-2" tile color="teal" dark>Sign Up</v-btn>
        <v-btn small class="ma-2" tile large color="teal" icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </div>

      <v-btn small tile large color="teal" icon v-show="menu == true">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    menu: null,
    drawer: false,
    group: null,
    tClass: "",
    lists: ["Home", "School", "Courses", "About"],
  }),
  mounted: function() {
    this.autoTheme(); //autoTheme will execute at pageload
    this.method1(); //method1 will execute at pageload
  },
  methods: {
    //changes theme manually
    changeState() {
      if (
        this.theme == "mdi-white-balance-sunny" &&
        this.$vuetify.theme.dark == true
      ) {
        this.theme = "mdi-moon-waxing-crescent";
        this.$vuetify.theme.dark = false;
      } else {
        this.theme = "mdi-white-balance-sunny";
        this.$vuetify.theme.dark = true;
      }
    },
    autoTheme() {
      const hours = new Date().getHours();
      if (hours <= 6 || hours >= 18) {
        this.$vuetify.theme.dark = true;
        this.theme = "mdi-white-balance-sunny";
      } else {
        this.$vuetify.theme.dark = false;
        this.theme = "mdi-moon-waxing-crescent";
      }
    },
    method1() {
      var isMobile = /iPhone|iPod|Android/i.test(navigator.userAgent);
      if (isMobile) {
        this.menu = true;
        this.tClass = "mx-auto";
      } else {
        this.menu = false;
        this.tClass = "d-flex align-center";
      }
    },
  },
  watch: {
    group() {
      this.drawer = false;
    },
  },
};
</script>
