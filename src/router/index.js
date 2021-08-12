import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import StudentLogin from "../views/student/Login.vue";
import StudentRegister from "../views/student/Register.vue";
import TeacherLogin from "../views/lecturer/Login.vue";
import TeacherRegister from "../views/lecturer/Register.vue";

Vue.use(VueRouter);

const routes = [{
        path: "/",
        name: "Home",
        component: Home,
        meta: {
            layout: "landing",
        },
    },
    {
        path: "/about",
        name: "About",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ "../views/About.vue"),
        meta: {
            layout: "landing",
        },
    },
    {
        path: "/student/login",
        name: "StudentLogin",
        component: StudentLogin,
        meta: {
            layout: "landing",
        },
    },
    {
        path: "/student/register",
        name: "StudentRegister",
        component: StudentRegister,
        meta: {
            layout: "landing",
        },
    },
    {
        path: "/teacher/login",
        name: "TeacherLogin",
        component: TeacherLogin,
        meta: {
            layout: "landing",
        },
    },
    {
        path: "/teacher/register",
        name: "TeacherRegister",
        component: TeacherRegister,
        meta: {
            layout: "landing",
        },
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;