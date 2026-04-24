/*
 * Copyright (c) 2026 NFUPT4. All rights reserved.
 * This source code is licensed under the CC BY-NC-SA
 * (Creative Commons Attribution-NonCommercial-NoDerivatives) License.
 * This software is protected by copyright law. Reproduction, distribution, or use for commercial
 * purposes is prohibited without the organization's permission. If you have any questions or require
 * permission, please contact NFUPT4 https://gitee.com/nfupt4.
 */

/**
 * @file clock.store.ts
 * @author edocsitahw
 * @version 1.1
 * @date 2026/04/22 16:21
 * @desc 打卡相关的状态管理
 * @copyrigh-t CC BY-NC-SA 2026. All rights reserved.
 * */
import type { Nullable, TodayStatusItem } from "@/types/common";
import { attendanceApi } from "@/api/attendance";
import { type ComputedRef, computed } from "vue";
import { useAsyncState } from "@vueuse/core";
import { defineStore } from 'pinia';


export const useClockStore = defineStore('clock', () => {
    /* state */

    // 今日打卡状态结果
    const { state: todayStatus } = useAsyncState(attendanceApi.getTodayStatus, null, { immediate: true });

    /* computed */

    // 即将到来或结束的打卡信息
    const recentClockInfo: ComputedRef<
        Nullable<{
            idx: number; // 打卡索引
            gap: number; // 当前时间距离下次打卡时间的间隔
            inSegment: boolean; // 是否在打卡时间段内
        }>
    > = computed(() => {
        if (!todayStatus.value) return null;

        const now = new Date();

        for (let i = 0; i < todayStatus.value.status.length; i++) {
            const item = todayStatus.value.status[i]!;

            if (item.startTime && item.startTime > now)
                return { idx: i, gap: item.startTime.getTime() - now.getTime(), inSegment: false };

            else if (!item.state && item.endTime && item.endTime > now)
                return { idx: i, gap: item.endTime.getTime() - now.getTime(), inSegment: true };
        }

        return { idx: -1, gap: 0, inSegment: false };
    });

    // 即将到来的或即将结束的打卡
    const recentClock: ComputedRef<Nullable<TodayStatusItem>> = computed(() => {
        if (!todayStatus.value || !recentClockInfo.value) return null;

        return todayStatus.value.status[recentClockInfo.value?.idx ?? -1] || null;
    });

    // 打卡统计信息
    const checkInStat: ComputedRef<{
        miss: number; // 缺卡次数
        complete: number; // 完成次数
        total: number; // 总次数
    }> = computed(() => {
        if (!todayStatus.value) return { miss: 0, complete: 0, total: 0 };

        const now = new Date();
        let miss = 0,
            complete = 0;

        for (const item of todayStatus.value.status) {
            if (item.state) complete++;
            else if (item.endTime && item.endTime < now) miss++;
        }

        return { miss, complete, total: todayStatus.value.status.length };
    });

    return {
        todayStatus,
        recentClockInfo,
        checkInStat,
        recentClock
    };
});

