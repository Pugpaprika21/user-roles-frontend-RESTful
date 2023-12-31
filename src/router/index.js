import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(
        import.meta.env.BASE_URL),
    routes: [{
            path: "/",
            name: "home",
            component: () =>
                import ("../views/HomeView.vue"),
        },
        {
            path: "/roles-setting",
            name: "roles-setting",
            component: () =>
                import ("../views/RoleSettingView.vue"),
        },
    ],
});

export default router;