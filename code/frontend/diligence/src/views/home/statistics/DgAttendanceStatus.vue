<!--
  - Copyright (c) 2026 NFUPT4. All rights reserved.
  - This source code is licensed under the CC BY-NC-SA
  - (Creative Commons Attribution-NonCommercial-NoDerivatives) License.
  - This software is protected by copyright law. Reproduction, distribution, or use for commercial
  - purposes is prohibited without the organization's permission. If you have any questions or require
  - permission, please contact NFUPT4 https://gitee.com/nfupt4.
  -->

<template>
    <dg-state-card>
        <template #title>
            <i
                style="margin-right: 4px"
                class="far fa-calendar-check" />

            {{ $t("home.attendance-status.template.title") }}
        </template>

        <template #value>
            {{ $t("home.attendance-status.template.value") }} {{ clockInfo.complete }}/{{ clockInfo.total }}
        </template>

        <template #sub>
            {{ noteText }}

            <i18n-t keypath="home.attendance-status.template.deadline" tag="span">

                <template #name>

                    {{  }}

                </template>

            </i18n-t>

        </template>
    </dg-state-card>
</template>

<script lang="ts" setup>
    /**
     * @file DgAttendanceStatus.vue
     * @author edocsitahw
     * @version 1.1
     * @date 2026/04/16 19:17
     * @desc
     * @copyright CC BY-NC-SA
     * */
    import DgStateCard from "@/views/home/statistics/DgStateCard.vue";
    import { attendanceApi } from "@/api/attendance";
    import useAuthStore from "@/stores/auth.store";
    import { useI18n } from "vue-i18n";
    import type { Nullable, TodayStatusResult } from "@/types/common";
    import { computed, type ComputedRef, watchEffect, ref, type Ref } from "vue";

    /* state */
    const _todayStatus: Ref<Nullable<TodayStatusResult>> = ref(null);

    const authStore = useAuthStore();
    const { t } = useI18n();

    /* computed */
    const todayStatus: ComputedRef<TodayStatusResult> = computed(() => _todayStatus.value!);

    const recentClockInfo = computed(() => {
        if (!todayStatus.value) return null;

        const now = new Date();
        let info = { idx: -1, gap: 0 };

        for (let i = todayStatus.value.status.length - 1; i >= 0; i--) {
            const curr = todayStatus.value.status[i];

            if (curr.state)
                return { idx: i, gap: now.getTime() - curr }
        }
    });

    const clockInfo = computed(() => {
        if (!todayStatus.value) return { miss: 0, complete: 0, total: 0 };

        const now = new Date();

        let miss = 0;
        let complete = 0;

        for (const item of todayStatus.value.status) {
            if (item.state) complete++;
            else if (item.endTime && new Date(item.endTime) < now) miss++;
        }

        return { miss, complete, total: todayStatus.value.status.length };
    });

    const noteText: ComputedRef<string> = computed(() => {
        if (!todayStatus.value) return "";


    });

    /* watch */
    watchEffect(async () => {
        if (authStore.authenticated) _todayStatus.value = await attendanceApi.getTodayStatus();
    });
</script>

<style lang="sass" scoped></style>
