import {createRouter, createWebHashHistory, Router, RouteRecordRaw, RouterOptions} from "vue-router";


const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "Main",
        component: () => import("@/view/components/Main.vue"),
        redirect: "/home",
        children: [
            {
                path: "/home",
                name: "Home",
                component: () => import("@/view/components/Home.vue")
            },
            {
                path: "/user",
                name: "User",
                component: () => import("@/view/components/userDashboard/UserDashboardView.vue")
            },
            {
                path: "/system-design",
                name: "SystemDesign",
                component: () => import("@/view/components/SystemDesign.vue")
            },
            {
                path: "/contact",
                name: "Contact",
                component: () => import("@/view/components/Contact.vue")
            }
        ]
    },
    {
        path: "/login",
        name: "Login",
        component: () => import("@/view/components/Login.vue")
    },
    {
        path: "/register",
        name: "Register",
        component: () => import("@/view/components/Register.vue")
    },
    {
        path: "/link-stat",
        name: "LinkStat",
        component: () => import("@/view/components/userLinkInfoStat/UserLinkInfoStatView.vue")
    }
];

// RouterOptions
const options: RouterOptions = {
    history: createWebHashHistory(),
    routes,
}
const router: Router = createRouter(options)
export default router
