import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: "#ffffff",
                secondary: "#1e1e1e",
            },
            dark: {
                primary: "#1e1e1e",
                secondary: "#ffffff",
            },
        },
    },
});