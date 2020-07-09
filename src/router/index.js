import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import error from "../views/error.vue";
import Login from "../views/student/Login.vue";
import Register from "../views/student/Register.vue";

Vue.use(VueRouter);

const routes = [{
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/about",
        name: "About",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ "../views/About.vue"),
    },
    {
        path: "/student/login",
        name: "Login",
        component: Login,
    },
    {
        path: "/student/register",
        name: "Register",
        component: Register,
    },
    {
        path: "*",
        name: "404",
        component: error,
    },
];

const router = new VueRouter({
    mode: "history",
    routes,
});

export default router;
