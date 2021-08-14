<template>
  <div>
    <v-app-bar app color="primary" v-resize="method1" elevation="3" dense>
      <v-app-bar-nav-icon
        @click="drawer = !drawer"
        class="d-lg-none d-xl-flex d-xl-none"
      >
      </v-app-bar-nav-icon>
      <v-img
        src="@/assets/academia.png"
        class="px-2"
        max-height="40"
        max-width="40"
        contain
        v-show="$store.state.menu == false"
      ></v-img>
      <div :class="`${tClass}`">
        <v-toolbar-title>Academia</v-toolbar-title>
      </div>

      <v-spacer v-show="$store.state.menu == false"></v-spacer>

      <div class="text-center d-none d-lg-flex d-xl-none d-xl-flex">
        <v-btn
          text
          plain
          class="link text-capitalize font-weight-medium mr-2"
          v-for="(list, l) in lists"
          :key="l"
          v-show="$store.state.menu == false"
          :href="list.to"
          >{{ list.name }}</v-btn
        >
      </div>
    </v-app-bar>
    <!-- Nav Drawer -->
    <v-navigation-drawer v-model="drawer" app>
      <v-subheader>PAGES</v-subheader>
      <v-list nav dense shaped>
        <v-list-item-group v-model="group" active-class="blue--text">
          <v-list-item :to="list.to" v-for="(list, n) in lists" :key="n">
            <v-list-item-title>{{ list.name }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <v-divider v-if="$store.getters.loggedIn == false"></v-divider>
      <v-list dense v-if="$store.getters.loggedIn == false">
        <v-list-group
          v-for="item in items"
          :key="item.title"
          v-model="item.active"
          active-class="blue--text"
        >
          <template v-slot:activator>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </template>

          <v-list-item
            v-for="subItem in item.items"
            :key="subItem.title"
            :to="subItem.to"
            active-class="blue--text"
          >
            <v-list-item-title v-text="subItem.title"></v-list-item-title>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view></router-view>
    </v-main>
    <v-footer app absolute inset class="pa-0 mb-auto">
      <v-card flat tile width="100%" color="#1d2024">
        <v-card-text class="grey--text text-center">
          © {{ new Date().getFullYear() }} —
          <strong class="blue--text">Academia</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </div>
</template>

<script>
export default {
  data: () => ({
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
        items: [
          { title: "Login", to: "/teacher/login" },
          { title: "Sign Up", to: "/teacher/register" },
        ],
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
    this.method1(); //method1 will execute at pageload
  },
  methods: {
    method1() {
      var menu = null;
      var isMobile = /iPhone|iPod|Android/i.test(navigator.userAgent);
      if (isMobile) {
        menu = true;
        this.tClass = "mx-auto";
        this.$store.dispatch("device", menu);
      } else {
        menu = false;
        this.tClass = "d-flex align-center";
        this.$store.dispatch("device", menu);
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

<style scoped>
.link {
  text-decoration-line: none;
}
</style>
