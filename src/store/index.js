import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        menu: null,
    },
    mutations: {
        SET_MENU(state, menu) {
            state.menu = menu;
        },
    },
    actions: {
        device({ commit }, menu) {
            commit("SET_MENU", menu);
        },
    },
    modules: {},
    getters: {
        getDevice: (state) => {
            return state.menu;
        },
    },
});