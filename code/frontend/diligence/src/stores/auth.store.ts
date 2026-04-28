/*
 * Copyright (c) 2026 NFUPT4. All rights reserved.
 * This source code is licensed under the CC BY-NC-SA
 * (Creative Commons Attribution-NonCommercial-NoDerivatives) License.
 * This software is protected by copyright law. Reproduction, distribution, or use for commercial
 * purposes is prohibited without the organization's permission. If you have any questions or require
 * permission, please contact NFUPT4 https://gitee.com/nfupt4.
 */

/**
 * @file authStore.ts
 * @author edocsitahw
 * @version 1.1
 * @date 2026/04/03 16:28
 * @desc 登录与认证相关的状态管理
 * @copyrigh-t CC BY-NC-SA 2026. All rights reserved.
 * */
import { DG_TOKEN_KEY, DG_REMEMBER_KEY } from "@/utils/constant";
import { useUserStore } from "@/stores/user.store";
import { computed, ref, type Ref } from "vue";
import { authApi } from "@/api";
import { defineStore } from "pinia";


export const useAuthStore = defineStore("auth", () => {
    /* state */
    const userStore = useUserStore();

    /* computed */

    // 是否已认证
    const authenticated = computed(() => token.value.length > 0);

    // 是否记住用户（视图）
    const remember = computed({
        get: () => localStorage.getItem(DG_REMEMBER_KEY) === "true",
        set: (v: boolean) => localStorage.setItem(DG_REMEMBER_KEY, v.toString())
    });

    /* state */

    // 响应式令牌
    const token: Ref<string> = ref((remember.value ? localStorage : sessionStorage).getItem(DG_TOKEN_KEY) || "");

    /* methods */

    // 登录
    const login = async (...data: Parameters<typeof authApi.login>) => {
        return authApi.login(...data).then(resp => {
            token.value = resp.token;

            (remember.value ? localStorage : sessionStorage).setItem(DG_TOKEN_KEY, resp.token);

            userStore.userInfo = resp.userInfo;

            return resp;
        });
    };

    // 登出
    const logout = () => {
        token.value = "";

        // 清除token
        (remember.value ? localStorage : sessionStorage).removeItem(DG_TOKEN_KEY);

        userStore.reset();
    };

    return {
        token,
        authenticated,
        login,
        remember,
        logout
    };
});

export default useAuthStore;
