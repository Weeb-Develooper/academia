import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import StudentLogin from "../views/student/Login.vue";
import StudentRegister from "../views/student/Register.vue";
import StudentDashboard from "../views/student/admin/dashboard.vue";
import StudentCourses from "../views/student/admin/courses.vue";
import StudentCourse from "../views/student/admin/course.vue";
import StudentClasses from "../views/student/admin/classes.vue";
import Feedback from "../views/student/admin/feedback.vue";
import TeacherRegister from "../views/lecturer/Register.vue";
import TeacherLogin from "../views/lecturer/Login.vue";
import TeacherDashboard from "../views/lecturer/admin/dashboard.vue";
import TeacherCourses from "../views/lecturer/admin/courses.vue";
import TeacherLectures from "../views/lecturer/admin/lectures.vue";
import TeacherFiles from "../views/lecturer/admin/files.vue";
import Feedbacks from "../views/lecturer/admin/feedbacks.vue";

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
        path: "/student/dashboard",
        name: "StudentDashboard",
        component: StudentDashboard,
        meta: {
            requiresAuth: true,
            layout: "student",
        },
    },
    {
        path: "/student/courses",
        name: "StudentCourses",
        component: StudentCourses,
        meta: {
            requiresAuth: true,
            layout: "student",
        },
    },
    {
        path: "/student/courses/:id",
        name: "StudentCourse",
        component: StudentCourse,
        meta: {
            requiresAuth: true,
            layout: "student",
        },
    },
    {
        path: "/student/lectures",
        name: "StudentClasses",
        component: StudentClasses,
        meta: {
            requiresAuth: true,
            layout: "student",
        },
    },
    {
        path: "/feedback",
        name: "Feedback",
        component: Feedback,
        meta: {
            requiresAuth: true,
            layout: "student",
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
    {
        path: "/teacher/dashboard",
        name: "TeacherDashboard",
        component: TeacherDashboard,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: "/teacher/courses",
        name: "TeacherCourses",
        component: TeacherCourses,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: "/teacher/lecture/:id",
        name: "TeacherLectures",
        component: TeacherLectures,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: "/teacher/files",
        name: "TeacherFiles",
        component: TeacherFiles,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: "/feedbacks",
        name: "Feedbacks",
        component: Feedbacks,
        meta: {
            requiresAuth: true,
        },
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;