import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VueMeta from "vue-meta";

Vue.use(VueMeta, {
    // optional pluginOptions
    refreshOnceOnNavigation: true,
});

Vue.config.productionTip = false;

//global variable

new Vue({
    router,
    store,
    beforeCreate() {
        let userString = localStorage.getItem("user");
        let userToken = localStorage.getItem("jwt");
        if (userString) {
            this.$store.commit("SET_USER_STATE", JSON.parse(userString));
            this.$store.commit("SET_USER_TOKEN", userToken);
        }
    },
    vuetify,
    render: (h) => h(App),
}).$mount("#app");