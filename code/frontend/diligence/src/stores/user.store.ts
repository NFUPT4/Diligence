/*
 * Copyright (c) 2026 NFUPT4. All rights reserved.
 * This source code is licensed under the CC BY-NC-SA
 * (Creative Commons Attribution-NonCommercial-NoDerivatives) License.
 * This software is protected by copyright law. Reproduction, distribution, or use for commercial
 * purposes is prohibited without the organization's permission. If you have any questions or require
 * permission, please contact NFUPT4 https://gitee.com/nfupt4.
 */

/**
 * @file user.store.ts
 * @author edocsitahw
 * @version 1.1
 * @date 2026/04/14 22:35
 * @desc 用户信息相关的状态管理
 * @copyrigh-t CC BY-NC-SA 2026. All rights reserved.
 * */
import { computed, ref, type Ref, type WritableComputedRef } from "vue";
import type { Nullable, UserInfo } from "@/types/common";
import { defineStore } from "pinia";


export const useUserStore = defineStore("user", () => {

    /* state */

    // 用户信息
    const innerUserInfo: Ref<Nullable<UserInfo>> = ref(null);

    /* computed */

    const userInfo = computed({
        get: () => {
            if (innerUserInfo.value)
                return innerUserInfo.value;

            return null;
        },
        set: (value: UserInfo) => innerUserInfo. value= value
    }) as WritableComputedRef<UserInfo, UserInfo>;

    /* methods */

    // 重置用户信息
    const reset = () => {
        innerUserInfo.value = null;
    };

    return {
        userInfo,
        reset
    };
});


export default useUserStore;
