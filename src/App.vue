<template>
  <v-app>
    <v-app-bar app color="primary" v-resize="method1">
      <v-app-bar-nav-icon
        @click="drawer = true"
        color="teal"
        v-show="menu == true"
      >
      </v-app-bar-nav-icon>

      <!-- Nav Drawer -->
      <v-navigation-drawer app v-model="drawer" absolute temporary>
        <v-subheader>PAGES</v-subheader>
        <v-list nav dense shaped>
          <v-list-item-group
            v-model="group"
            active-class="cyan--text text--accent-4"
          >
            <v-list-item :to="list.to" v-for="list in lists" :key="list">
              <v-list-item-title>{{ list.name }}</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
        <v-divider></v-divider>
        <v-list dense>
          <v-list-group
            v-for="item in items"
            :key="item.title"
            v-model="item.active"
            active-class="cyan--text"
          >
            <template v-slot:activator>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </template>

            <v-list-item
              v-for="subItem in item.items"
              :key="subItem.title"
              :to="subItem.to"
              active-class="cyan--text text--accent-4"
            >
              <v-list-item-title v-text="subItem.title"></v-list-item-title>
            </v-list-item>
          </v-list-group>
        </v-list>
      </v-navigation-drawer>

      <v-img
        src="@/assets/academia.png"
        class="px-2"
        max-height="40"
        max-width="40"
        contain
        v-show="menu == false"
      ></v-img>
      <div :class="`${tClass} me`">
        <v-toolbar-title>Academia</v-toolbar-title>
      </div>
      <v-btn
        text
        small
        class="link text-capitalize font-weight-light px-2 mx-1 text--text"
        v-for="list in lists"
        :key="list"
        v-show="menu == false"
        :href="list.to"
        >{{ list.name }}</v-btn
      >

      <v-spacer v-show="menu == false"></v-spacer>

      <div class="text-center" v-show="menu == false">
        <v-btn
          small
          class="ma-2 text-capitalize"
          tile
          outlined
          color="secondary"
        >
          Login
        </v-btn>
        <v-btn
          small
          class="ma-2 text-capitalize"
          tile
          depressed
          color="blue accent-3"
          dark
          >Sign Up</v-btn
        >
      </div>

      <v-badge
        bordered
        :content="messages"
        :value="messages"
        color="error"
        overlap
        v-show="menu == true"
      >
        <v-btn small color="teal" icon>
          <v-icon> mdi-bell</v-icon>
        </v-btn>
      </v-badge>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "App",

  data: () => ({
    menu: null,
    drawer: false,
    group: null,
    messages: 3,
    tClass: "",
    items: [
      {
        title: "Student",
        active: false,
        items: [
          { title: "Login", to: "/student/login" },
          { title: "Sign Up", to: "/student/register" },
        ],
      },
      {
        title: "Lecturer",
        active: false,
        items: [{ title: "Login" }, { title: "Sign Up" }],
      },
    ],
    lists: [
      {
        to: "/",
        name: "Home",
      },
      {
        to: "",
        name: "Instructors",
      },
      {
        to: "",
        name: "Courses",
      },
      {
        to: "/about",
        name: "About",
      },
    ],
  }),
  mounted: function() {
    //this.autoTheme(); //autoTheme will execute at pageload
    //this.method1(); //method1 will execute at pageload
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
        this.$store.dispatch("device", this.menu);
      } else {
        this.menu = false;
        this.tClass = "d-flex align-center";
        this.$store.dispatch("device", this.menu);
      }
    },
    ...mapState("device"),
  },
  watch: {
    group() {
      this.drawer = false;
    },
  },
};
</script>

<style scoped>
.link {
  text-decoration-line: none;
}
.me {
  font-family: "Fondamento", cursive;
}
</style>
