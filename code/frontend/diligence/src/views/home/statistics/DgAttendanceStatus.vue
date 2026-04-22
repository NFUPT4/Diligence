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

            {{ $t(LOCAL("title")) }}
        </template>

        <template #value>
            {{ $t(LOCAL("value")) }}
            {{ checkInStat.complete === checkInStat.total ? "✅" : `${checkInStat.complete}/${checkInStat.total}` }}
        </template>

        <template #sub>
            <!-- 有打卡任务 -->
            <div v-if="todayStatus?.status.length">
                <!-- 错过打卡时间 -->
                <i18n-t
                    v-if="checkInStat.miss"
                    :keypath="LOCAL('miss-task')"
                    tag="span">
                    <template #count>
                        {{ checkInStat.miss }}
                    </template>
                </i18n-t>

                <!-- 临近打卡截至或下次打卡开始 -->
                <i18n-t
                    v-else-if="recentClockInfo?.idx! >= 0"
                    :keypath="recentClockInfo!.inSegment ? LOCAL('deadline') : LOCAL('approaching')"
                    tag="span">
                    <template #name>
                        {{
                            recentClock?.name ||
                            $t(
                                LOCAL(
                                    recentClockInfo!.inSegment
                                        ? "default-name-this"
                                        : "default-name-next"
                                )
                            )
                        }}
                    </template>

                    <template #time>
                        {{ formatTime(recentClockInfo!.gap) }}
                    </template>
                </i18n-t>

                <!-- 完成打卡 -->
                <span v-else>
                    {{ $t(LOCAL("finish")) }}
                </span>
            </div>

            <!-- 无打卡任务 -->
            <span v-else>
                {{ $t(LOCAL("no-task")) }}
            </span>
        </template>
    </dg-state-card>
</template>

<script lang="ts" setup>
    /**
     * @file DgAttendanceStatus.vue
     * @author edocsitahw
     * @version 1.1
     * @date 2026/04/16 19:17
     * @desc 主页考勤状态组件
     * @copyright CC BY-NC-SA
     * */
    import DgStateCard from "@/views/home/statistics/DgStateCard.vue";
    import { useClockStore } from "@/stores/clock.store";
    import { calcTimeDiff } from "@/utils";
    import { storeToRefs } from "pinia";
    import { useI18n } from "vue-i18n";

    /* state */
    const LOCAL = (key: string, type: string = "template") => `home.attendance-status.${type}.${key}`;
    const { recentClockInfo, checkInStat, todayStatus, recentClock } = storeToRefs(useClockStore());
    const { t } = useI18n();

    /* methods */

    // 格式化时间戳
    const formatTime = (stamp: number) => {
        const diffInfo = calcTimeDiff(stamp);

        return Object.entries(diffInfo).reduce(
            (acc: string, [key, value]: [string, number]) => (value > 0 ? `${acc}${value}${t(`common.${key}`)}` : acc),
            ""
        );
    };
</script>

<style lang="sass" scoped></style>
