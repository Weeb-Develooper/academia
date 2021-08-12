import Vue from "vue";
import Vuex from "vuex";
import router from "@/router";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        menu: null,
        user: null,
        jwt: "",
    },
    mutations: {
        SET_MENU(state, menu) {
            state.menu = menu;
        },
        SET_USER_STATE(state, user) {
            state.user = user;
        },
        SET_USER_TOKEN(state, jwt) {
            state.jwt = jwt;
        },
        CLEAR_USER_DATA(state) {
            localStorage.clear();
            state.user = null;
            router.push("/auth/login");
        },
    },
    actions: {
        device({ commit }, menu) {
            commit("SET_MENU", menu);
        },
        logout({ commit }) {
            commit("CLEAR_USER_DATA");
            router.push("/auth/login");
            return;
        },
    },
    getters: {
        getDevice: (state) => {
            return state.menu;
        },
        loggedIn(state) {
            return !!state.user;
        },
    },
});