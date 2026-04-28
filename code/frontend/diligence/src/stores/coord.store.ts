/*
 * Copyright (c) 2026 NFUPT4. All rights reserved.
 * This source code is licensed under the CC BY-NC-SA
 * (Creative Commons Attribution-NonCommercial-NoDerivatives) License.
 * This software is protected by copyright law. Reproduction, distribution, or use for commercial
 * purposes is prohibited without the organization's permission. If you have any questions or require
 * permission, please contact NFUPT4 https://gitee.com/nfupt4.
 */

/**
 * @file coord.store.ts
 * @author edocsitahw
 * @version 1.1
 * @date 2026/04/22 12:50
 * @desc 高德地图api相关的状态管理
 * @copyrigh-t CC BY-NC-SA 2026. All rights reserved.
 * */
import { COORD_API_KEY, COORD_SECURITIES_KEY } from "@/utils/constant";
import AMapLoader from "@amap/amap-jsapi-loader";
import type { Nullable } from "@/types/common";
import { useAsyncState } from "@vueuse/core";
import { defineStore } from "pinia";
import { computed } from "vue";


(window as any)._AMapSecurityConfig = {
    securityJsCode: COORD_SECURITIES_KEY
};

export const useCoordStore = defineStore("coord", () => {
    /* state */


    const { state: AMap /* 高德地图实例 */ } = useAsyncState(
        async () =>
            await AMapLoader.load({
                key: COORD_API_KEY,
                version: "2.0",
                plugins: ["AMap.Geocoder"]
            }),
        null,
        { immediate: true }
    );

    /* computed */

    // 地理编码器
    const Geocoder = computed(() => AMap.value ? new AMap.value.Geocoder : null);

    /* methods */

    // 获取地址
    const getAddress = async (longitude: number, latitude: number): Promise<Nullable<string>> => {
        const dgAddressKey = `DG_${longitude}_${latitude}_KEY`;

        // 持久化，避免重复请求
        if (localStorage.getItem(dgAddressKey))
            return localStorage.getItem(dgAddressKey) as string;

        if (!Geocoder.value) return null;

        return await new Promise((resolve, reject) => {
            Geocoder.value.getAddress([longitude, latitude], (status: string, result: any) => {
                if (status === "complete" && result.info === "OK")
                    resolve(result.regeocode.formattedAddress);

                else
                    reject(status);
            });
        });
    };

    return {
        AMap,
        Geocoder,
        getAddress
    };
});


export default useCoordStore;
