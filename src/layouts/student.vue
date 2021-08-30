<template>
  <div>
    <v-app-bar app color="primary" v-resize="method1" elevation="3">
      <v-app-bar-nav-icon @click="drawer = !drawer"> </v-app-bar-nav-icon>
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
                <v-chip
            
          >
            <v-avatar left>
              <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
            </v-avatar>
            <div class="font-weight-medium">Hi, {{$store.state.user.username}}</div>
                  <v-icon right>
        mdi-chevron-down
      </v-icon>
          </v-chip>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app>
      <v-subheader>PAGES</v-subheader>

      <v-list nav shaped dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.link"
          active-class="blue--text"
          link
        >
          <v-list-item-icon>
            <span
              class="iconify"
              :data-icon="`majesticons:${item.icon}`"
              data-width="20"
              data-height="20"
            ></span>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn text plain block color="red" @click="logout">
            Logout
          </v-btn>
        </div>
      </template>
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
  data() {
    return {
      tClass: "",
      drawer: false,
      items: [
        {
          title: "Dashboard",
          icon: "dashboard-line",
          link: "/student/dashboard",
        },
        { title: "Courses", icon: "book-open-line", link: "/student/courses" },
        { title: "Lectures", icon: "calendar-line", link: "/student/lectures" },
        { title: "Files", icon: "archive-line", link: "/student/files" },
        {
          title: "Quiz",
          icon: "question-mark-circle-line",
          link: "/dashboard",
        },
        { title: "Chat", icon: "chats-line", link: "/dashboard" },
        { title: "Feedbacks", icon: "message-line", link: "/dashboard" },
      ],
      mini: true,
    };
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
    logout() {
      this.$store.commit("CLEAR_USER_DATA");
    },
  },
  mounted() {
    this.method1();
  },
};
</script>
