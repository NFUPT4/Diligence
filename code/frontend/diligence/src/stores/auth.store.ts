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
 * @desc
 * @copyrigh-t CC BY-NC-SA 2026. All rights reserved.
 * */
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { DG_TOKEN_KEY, DG_REMEMBER_KEY } from "@/utils/constant";
import { authApi } from "@/api/auth";


export const useAuthStore = defineStore("auth", () => {
    /* state */

    // 令牌
    const token = ref<string>(localStorage.getItem(DG_TOKEN_KEY) || "");
    // 是否记住密码
    const remember = ref<boolean>(localStorage.getItem(DG_REMEMBER_KEY) === "true");

    /* computed */

    // 是否已认证
    const authenticated = computed(() => token.value.length > 0);

    /* methods */
    const setToken = (t: string) => {
        token.value = t;

        localStorage.setItem(DG_TOKEN_KEY, token.value);
    };

    const login = async (...data: Parameters<typeof authApi.login>) => {
        return authApi.login(...data).then(resp => {
            console.log(resp);
            setToken(resp.token);

            return resp;
        });
    };

    return {
        token,
        authenticated,
        setToken,
        login,
        remember
    };
});

export default useAuthStore;
