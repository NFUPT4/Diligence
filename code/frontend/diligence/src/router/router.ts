/*
 * Copyright (c) 2026 NFUPT4. All rights reserved.
 * This source code is licensed under the CC BY-NC-SA
 * (Creative Commons Attribution-NonCommercial-NoDerivatives) License.
 * This software is protected by copyright law. Reproduction, distribution, or use for commercial
 * purposes is prohibited without the organization's permission. If you have any questions or require
 * permission, please contact NFUPT4 https://gitee.com/nfupt4.
 */

import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth.store";
import { useUserStore } from "@/stores/user.store";
import DgAuth from "@/views/authentication/DgAuth.vue";


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: () => import(/* webpackPrefetch: true */ "@/views/home/DgHome.vue"),
            meta: { requiresAuth: true }
        },
        {
            path: "/auth",
            name: "auth",
            component: DgAuth,
            meta: { requiresAuth: false }
        }
    ]
});


router.beforeEach((to, from) => {
    const authStore = useAuthStore();
    const userStore = useUserStore();

    // 需要认证的路由
    if (to.meta.requiresAuth) {
        // 已登录
        if (authStore.authenticated && userStore.userInfo)
            return true;

        else
            return "/auth";
    }

    // 游客访问路由
    else
        return true;
});


export default router;
