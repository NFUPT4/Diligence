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
                class="fas fa-chart-line" />

            {{ $t(LOCAL("title")) }}
        </template>

        <template #value> {{ attendanceRate?.personalRate }} % </template>

        <template #sub>
            {{
                attendanceRate
                    ? $t(
                        LOCAL(
                            attendanceRate.personalRate >= attendanceRate.deptAvgRate ? "hight-than" : "low-than"
                        )
                    )
                    : ""
            }}
            · {{ $t(LOCAL(rateDegree)) }}
        </template>
    </dg-state-card>
</template>

<script lang="ts" setup>
    /**
     * @file DgAttendanceRate.vue
     * @author edocsitahw
     * @version 1.1
     * @date 2026/04/16 20:09
     * @desc 主页考勤率组件
     * @copyright CC BY-NC-SA
     * */
    import DgStateCard from "@/views/home/statistics/DgStateCard.vue";
    import { attendanceApi } from "@/api/attendance";
    import { useAsyncState } from "@vueuse/core";
    import { computed } from "vue";

    /* state */
    const { state: attendanceRate } = useAsyncState(attendanceApi.getAttendanceRate, null, { immediate: true });
    const LOCAL = (key: string, type: string = "template") => `home.attendance-rate.${type}.${key}`;

    /* computed */

    // 考勤率等级对应键
    const rateDegree = computed(() => {
        if (!attendanceRate.value) return "loading";

        const rate = attendanceRate.value.personalRate / attendanceRate.value.deptAvgRate;

        if (rate >= 1.2) return "excellent";
        else if (rate >= 1) return "good";
        else return "improve";
    });
</script>

<style lang="sass" scoped></style>
