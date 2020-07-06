import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: "#ffffff",
                secondary: "#1e1e1e",
                text: "#000000",
                error: "#b71c1c",
                bground: "#ffffff",
                btnprim: "#3F51B5",
            },
            dark: {
                primary: "#1e1e1e",
                secondary: "#ffffff",
                text: "#ffffff",
                error: "#b71c1c",
                bground: "#e3e3e3",
                btnprim: "#7986CB",
            },
        },
    },
});