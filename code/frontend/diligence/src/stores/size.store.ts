/*
 * Copyright (c) 2026 NFUPT4. All rights reserved.
 * This source code is licensed under the CC BY-NC-SA
 * (Creative Commons Attribution-NonCommercial-NoDerivatives) License.
 * This software is protected by copyright law. Reproduction, distribution, or use for commercial
 * purposes is prohibited without the organization's permission. If you have any questions or require
 * permission, please contact NFUPT4 https://gitee.com/nfupt4.
 */

/**
 * @file size.store.ts
 * @author edocsitahw
 * @version 1.1
 * @date 2026/04/26 18:46
 * @desc 尺寸统一管理
 * @copyrigh-t CC BY-NC-SA 2026. All rights reserved.
 * */
import { MEDIA_SIZE, DG_SIZE_STORE_FUNC_KEY } from "@/utils/constant";
import { computed, reactive, ref, watch } from "vue";
import { useEventStore } from "@/stores/event.store";
import type { MediaTypes } from "@/types/store";
import { getFunctionUniqueId } from "@/utils";
import { defineStore } from "pinia";

type MediaCallbacks = {
    [K in MediaTypes]?: () => void;
};

export const useSizeStore = defineStore("size", () => {
    // data
    const width = ref<number>(window.innerWidth);
    const height = ref<number>(window.innerHeight);

    const mediaCallbacks = reactive<Record<MediaTypes, Map<symbol, () => void>>>({
        phone: new Map(),
        tablet: new Map(),
        desktop: new Map()
    });

    const eventStore = useEventStore();

    // computed
    const readonlyWidth = computed(() => width.value);
    const readonlyHeight = computed(() => height.value);

    const mediaQuery = computed((): MediaTypes => {
        if (readonlyWidth.value <= MEDIA_SIZE["phone-tablet"]) return "phone";
        else if (readonlyWidth.value <= MEDIA_SIZE["tablet-desktop"]) return "tablet";

        return "desktop";
    });

    // methods
    const setWidth = (w: number) => {
        width.value = w;
    };

    const setHeight = (h: number) => {
        height.value = h;
    };

    const handleResize = () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
    };

    const init = () => {
        eventStore.add("resize", handleResize, window);
    };

    const mediaHandle = (callback: MediaCallbacks) => {
        for (const [key, value] of Object.entries(callback).filter(([, value]) => value)) {
            const uniqueId = getFunctionUniqueId(value, DG_SIZE_STORE_FUNC_KEY);

            if (!mediaCallbacks[key as MediaTypes].has(uniqueId))
                mediaCallbacks[key as MediaTypes].set(uniqueId, value);
        }
    };

    const removeMediaHandle = (callback: MediaCallbacks) => {
        for (const [key, value] of Object.entries(callback).filter(([, value]) => value)) {
            const uniqueId = getFunctionUniqueId(value, DG_SIZE_STORE_FUNC_KEY);

            if (mediaCallbacks[key as MediaTypes].has(uniqueId)) mediaCallbacks[key as MediaTypes].delete(uniqueId);
        }
    };

    // watch
    watch(mediaQuery, newType => mediaCallbacks[newType].forEach(cb => cb()), { immediate: true });

    return {
        width: readonlyWidth,
        height: readonlyHeight,
        mediaQuery,
        setWidth,
        setHeight,
        mediaHandle,
        removeMediaHandle,
        init
    };
});

export default useSizeStore;

declare module "@/utils" {
    interface IFunctionId {
        [DG_SIZE_STORE_FUNC_KEY]: true;
    }
}
