/*
 * Copyright (c) 2026 NFUPT4. All rights reserved.
 * This source code is licensed under the CC BY-NC-SA
 * (Creative Commons Attribution-NonCommercial-NoDerivatives) License.
 * This software is protected by copyright law. Reproduction, distribution, or use for commercial
 * purposes is prohibited without the organization's permission. If you have any questions or require
 * permission, please contact NFUPT4 https://gitee.com/nfupt4.
 */

/**
 * @file location.store.ts
 * @author edocsitahw
 * @version 1.1
 * @date 2026/04/28 21:12
 * @desc
 * @copyright CC BY-NC-SA 2026. All rights reserved.
 * */

import useCoordStore from "@/stores/coord.store";
import { useAsyncState } from "@vueuse/core";
import { defineStore } from "pinia";
import { watch } from "vue";


export const useLocationStore = defineStore("location", () => {
    /* state */
    const coordStore = useCoordStore();

    // 坐标信息
    const {
        state: position,
        isLoading: positionLoading,
        error: positionError
    } = useAsyncState(
        () => {
            return new Promise<GeolocationPosition>((resolve, reject) =>
                navigator.geolocation.getCurrentPosition(resolve, reject)
            );
        },
        null,
        { immediate: true }
    );

    // 当前地址信息
    const {
        state: address,
        isLoading: addressLoading,
        error: addressError,
        execute: addressExecute
    } = useAsyncState(
        async () => {
            if (!position.value) return null;

            // 通过高度获取逆地理编码
            return await coordStore.getAddress(position.value.coords.longitude, position.value.coords.latitude);
        },
        null,
        { immediate: true }
    );

    /* watch */
    watch(
        () => position.value?.coords,
        () => addressExecute()
    );

    return {
        position,
        positionLoading,
        positionError,
        address,
        addressLoading,
        addressError,
        addressExecute
    };
});

export default useLocationStore;
