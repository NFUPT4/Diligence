/*
 * Copyright (c) 2026 NFUPT4. All rights reserved.
 * This source code is licensed under the CC BY-NC-SA
 * (Creative Commons Attribution-NonCommercial-NoDerivatives) License.
 * This software is protected by copyright law. Reproduction, distribution, or use for commercial
 * purposes is prohibited without the organization's permission. If you have any questions or require
 * permission, please contact NFUPT4 https://gitee.com/nfupt4.
 */

/**
 * @file event.store.ts
 * @author edocsitahw
 * @version 1.1
 * @date 2026/04/26 19:04
 * @desc 事件统一管理
 * @copyright CC BY-NC-SA 2026. All rights reserved.
 * */
import { defineStore } from "pinia";
import type { Optional } from "@/types/common";
import { reactive } from "vue";
import { DG_EVENT_STORE_FUNC_KEY } from "@/utils/constant";
import { getFunctionUniqueId } from "@/utils";

type FuncParamType = Parameters<typeof window.addEventListener>;
export type ArgsType = [FuncParamType[1], Optional<EventTarget>];
type CallbackArgsType = [type: keyof DocumentEventMap, listener: FuncParamType[1], target?: EventTarget];

export const useEventStore = defineStore("event", () => {
    // data
    const events = reactive<Map<keyof DocumentEventMap, Map<symbol, ArgsType>>>(new Map());

    const delegations = reactive<Array<() => void>>([]);

    // methods
    const add = (...[type, listener, target]: CallbackArgsType) => {
        const listenerId = getFunctionUniqueId(listener, DG_EVENT_STORE_FUNC_KEY);

        if (type && events.has(type)) {
            if (!events.get(type)!.has(listenerId)) events.get(type)!.set(listenerId, [listener, target]);
        } else events.set(type, new Map([[listenerId, [listener, target]]]));
    };

    const remove = (...[type, listener]: CallbackArgsType) => {
        const listenerId = getFunctionUniqueId(listener, DG_EVENT_STORE_FUNC_KEY);

        if (type && events.has(type)) {
            if (events.get(type)!.has(listenerId)) events.get(type)!.delete(listenerId);

            if (events.get(type)!.size === 0) events.delete(type);
        }
    };

    const init = (delegation: () => void) => {
        delegations.push(delegation);
    };

    return {
        add,
        remove,
        events,
        delegations,
        init
    };
});

declare module "@/utils" {
    interface IFunctionId {
        [DG_EVENT_STORE_FUNC_KEY]: true;
    }
}

export default useEventStore;
