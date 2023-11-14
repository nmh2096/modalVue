import Vue from "vue";
import VueRouter from "vue-router";
import { authRouter } from "./authRouter";
import { mainRouter } from "./mainRouter";

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    scrollBehavior() {  
        return { x: 0, y: 0, behavior: 'smooth' };
    },
    routes: [
        {
            path: "/",
            redirect: "/auth/login",
        },
        {
            path: "/auth",
            component: () => import("@/layout/AuthLayout.vue"),
            children: [...authRouter],
        },
        {
            path: "/",
            component: () => import("@/layout/MainLayout.vue"),
            children: [...mainRouter],
        },
    ]
});
export default router;