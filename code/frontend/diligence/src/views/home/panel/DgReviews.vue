<!--
  - Copyright (c) 2026 NFUPT4. All rights reserved.
  - This source code is licensed under the CC BY-NC-SA
  - (Creative Commons Attribution-NonCommercial-NoDerivatives) License.
  - This software is protected by copyright law. Reproduction, distribution, or use for commercial
  - purposes is prohibited without the organization's permission. If you have any questions or require
  - permission, please contact NFUPT4 https://gitee.com/nfupt4.
  -->

<template>
    <dg-panel class="dg-home-reviews dhr">
        <template #title>
            <h3 class="dhr-title">
                <i
                    class="fas fa-location-dot"
                    style="color: #2d6a4f" />
                {{ $t(LOCAL("title")) }}
            </h3>
        </template>

        <template #badge>
            <span class="dhr-badge">
                <i class="fas fa-shield-alt" />
                {{ $t(LOCAL("badge")) }}
            </span>
        </template>

        <template #default>
            <!-- 无打卡信息 -->
            <div
                v-if="checkInStat && (checkInStat.total === 0 || checkInStat.miss + checkInStat.complete === checkInStat.total)"
                class="dhr-main-noclock">
                {{ $t(LOCAL(checkInStat.total ? "finish" : "no-task")) }}
            </div>

            <!-- 加载中 -->
            <div v-else-if="todayStatusLoading"> <i class="fas fa-spinner fa-pulse" /> {{ $t(LOCAL("loading-data")) }} </div>

            <main v-else class="dhr-main">
                <!-- 实时信息 -->
                <div class="dhr-main-realtime">
                    <!-- 时间 -->
                    <div class="dhr-main-realtime-time">
                        {{ timeInfo.hours }}:{{ timeInfo.minutes }}:{{ timeInfo.seconds }}
                    </div>

                    <!-- 日期 -->
                    <div class="dhr-main-realtime-date">
                        {{ timeInfo.year }}{{ $t("common.year") }}{{ timeInfo.month }}{{ $t("common.month")
                        }}{{ timeInfo.day }}
                        {{ $t("common.day-ri") }}
                    </div>
                </div>

                <!-- 有即将到来或截止的打卡 -->
                <template v-if="recentClock && distance && location">
                    <!-- 位置信息 -->
                    <div class="dhr-main-location">
                        <div class="dhr-main-location-title">
                            <i
                                class="fas fa-location-dot"
                                style="color: var(--primary-color); font-size: 1.6rem" />

                            <h3 style="font-size: 1rem; font-weight: 600">{{ $t(LOCAL("location-pos")) }}</h3>
                        </div>

                        <!-- 位置信息 -->
                        <div class="dhr-main-location-info">
                            <template v-if="loading">
                                <i class="fas fa-spinner fa-pulse" /> {{ $t(LOCAL("loading-pos")) }}
                            </template>

                            <template v-else-if="!position || errorMsgKey">
                                <i class="fas fa-exclamation-triangle" />{{
                                    $t(LOCAL(errorMsgKey || "location-failed"))
                                }}
                            </template>

                            <template v-else>
                                <i class="fas fa-map-pin" />

                                {{ address }}
                            </template>
                        </div>

                        <!-- 距离信息 -->
                        <i18n-t
                            class="dhr-main-location-distance"
                            :class="{ invaild: !distanceValid }"
                            :keypath="LOCAL('distance')"
                            tag="div">
                            <template #distance>{{ distance?.toFixed(2) || "---" }}</template>

                            <template #range>{{ location?.radius.toFixed(2) || "---" }}</template>
                        </i18n-t>

                        <!-- 错误指南 -->
                        <div
                            class="dhr-main-location-guide"
                            :class="{ invaild: !distanceValid }">
                            {{
                                $t(
                                    LOCAL(
                                        distance && location
                                            ? distanceValid
                                                ? "pos-valid"
                                                : "pos-invalid"
                                            : errorMsgKey
                                              ? "request-permission"
                                              : "location-failed"
                                    )
                                )
                            }}
                        </div>
                    </div>

                    <!-- 打卡按钮 -->
                    <button
                        class="dhr-main-btn"
                        :disabled="!distanceValid"
                        @click="handleClock">
                        <i class="fas fa-fingerprint" />

                        <i18n-t
                            :keypath="LOCAL(distanceValid ? 'clock-in' : 'clock-disabled')"
                            tag="span">
                            <template #name>
                                {{ recentClock?.name || "" }}
                            </template>
                        </i18n-t>
                    </button>

                    <!-- 今日打卡记录 -->
                    <div
                        class="dhr-main-status"
                        v-if="todayStatus?.status">
                        <div><i class="far fa-calendar-check" /> {{ $t(LOCAL("today-records")) }}</div>
                        <div class="dhr-main-status-list">
                            <div
                                class="dhr-main-status-item"
                                v-for="(task, index) of todayStatus.status"
                                :key="index">
                                <i
                                    class="dhr-main-status-item-dot"
                                    :class="{
                                        [task.state
                                            ? 'sucess'
                                            : task.startTime && task.startTime > now
                                              ? 'wait'
                                              : 'miss']: true
                                    }" />

                                {{ task.name || formatClockTime(task) }}
                            </div>
                        </div>
                    </div>
                </template>
            </main>
        </template>
    </dg-panel>
</template>

<script lang="ts" setup>
    /**
     * @file DgReviews.vue
     * @author edocsitahw
     * @version 1.1
     * @date 2026/04/16 20:41
     * @desc 主页打卡组件
     * @copyright CC BY-NC-SA
     * */
    import { ref, computed, watch, onMounted, onUnmounted } from "vue";
    import type { Nullable, TodayStatusItem } from "@/types/common";
    import useLocationStore from "@/stores/location.store";
    import DgPanel from "@/views/home/panel/DgPanel.vue";
    import useClockStore from "@/stores/clock.store";
    import { attendanceApi, clockApi } from "@/api";
    import { useAsyncState } from "@vueuse/core";
    import { ElMessage } from "element-plus";
    import { storeToRefs } from "pinia";
    import { haversine } from "@/utils";
    import { useI18n } from "vue-i18n";

    /* state */

    const LOCAL = (key: string, type: string = "template") => `home.reviews.${type}.${key}`;

    const { t } = useI18n();
    const now = ref<Date>(new Date());
    let interval: Nullable<number> = null;

    const { position, positionError, positionLoading, address, addressLoading } = storeToRefs(useLocationStore());
    const { recentClock, checkInStat, todayStatusLoading, todayStatus } = storeToRefs(useClockStore());

    // 打卡应在地点信息
    const {
        state: location,
        isLoading: locationLoading,
        execute: locationExecute
    } = useAsyncState(
        async () => (recentClock.value ? attendanceApi.getLocation(recentClock.value.locationId) : null),
        null,
        { immediate: true }
    );

    /* computed */

    // 当前时间信息
    const timeInfo = computed(() => processTime(now.value));

    // 错误信息键
    const errorMsgKey = computed<Nullable<string>>(() => {
        if (positionError.value)
            switch ((positionError.value as GeolocationPositionError)?.code) {
                case 1:
                    return "user-refused";
                case 2:
                    return "position-unavailable";
                case 3:
                    return "location-timeout";
                default:
                    return "location-failed";
            }

        return null;
    });

    // 当前位置与打卡位置的距离
    const distance = computed<Nullable<number>>(() => {
        if (position.value && location.value)
            return haversine(
                position.value.coords.longitude,
                position.value.coords.latitude,
                location.value.longitude,
                location.value.latitude
            );

        return null;
    });

    // 距离是否有效且合理
    const distanceValid = computed(
        () => distance.value !== null && location.value && distance.value <= location.value.radius
    );

    // 地址相关部分是否在加载
    const loading = computed(() => positionLoading.value || locationLoading.value || addressLoading.value);

    /* methods */

    // 更新时间
    const updateTime = () => {
        now.value = new Date();
    };

    // 打卡
    const handleClock = () => {
        if (!position.value || !recentClock.value) return;

        clockApi
            .checkIn({
                longitude: position.value.coords.longitude,
                latitude: position.value.coords.latitude,
                locationId: recentClock.value?.locationId,
                time: now.value.toISOString()
            })
            .then(resp =>
                resp ? ElMessage.success(t(LOCAL("success", "script"))) : ElMessage.error(t("failed", "script"))
            )
            .catch(e => ElMessage.error(e.message));
    };

    // 处理时间
    const processTime = (date: Date) => ({
        year: date.getFullYear(),
        month: (date.getMonth() + 1).toString().padStart(2, "0"),
        day: date.getDate().toString().padStart(2, "0"),
        hours: date.getHours().toString().padStart(2, "0"),
        minutes: date.getMinutes().toString().padStart(2, "0"),
        seconds: date.getSeconds().toString().padStart(2, "0")
    });

    // 格式化打卡时间
    const formatClockTime = (clockInfo: TodayStatusItem) => {
        const time = processTime((clockInfo.startTime || clockInfo.endTime)!);

        return `${time.hours}:${time.minutes}`;
    };

    /* watch */

    watch(
        () => recentClock.value?.locationId,
        () => locationExecute()
    );

    /* onMounted */

    onMounted(() => {
        updateTime();

        interval = window.setInterval(updateTime, 1000);
    });

    /* onUnmounted */

    onUnmounted(() => {
        if (interval !== null) {
            clearInterval(interval);

            interval = null;
        }
    });
</script>

<style lang="sass" scoped>
    @use "@/style/global" as *

    .dhr
        &-main
            transition: all 0.2s

            &-back
                display: inline-flex
                align-items: center
                gap: 8px
                color: var(--text-muted)
                text-decoration: none
                font-size: 0.85rem
                margin-bottom: 20px
                cursor: pointer

                +mobile()
                    margin-top: 20px

                &:hover
                    color: var(--primary-color)

            &-realtime
                text-align: center
                margin-bottom: 28px

                +mobile()
                    height: 40%
                    display: flex
                    flex-direction: column
                    justify-content: center

                &-time
                    font-size: 3.2rem
                    font-weight: 700
                    letter-spacing: 2px
                    color: var(--time-text-color)
                    font-family: monospace

                &-date
                    font-size: 0.9rem
                    color: var(--date-date-color)
                    margin-top: 6px

            &-location
                background: var(--location-bg)
                border-radius: 36px
                padding: 20px
                margin-bottom: 28px
                border: 1px solid var(--location-border)

                &-title
                    display: flex
                    align-items: center
                    gap: 12px
                    margin-bottom: 12px

                &-info
                    font-size: 0.85rem
                    color: var(--location-info-color)
                    line-height: 1.4
                    margin-bottom: 12px
                    word-break: break-word

                &-distance
                    font-size: 0.7rem
                    background: var(--location-dest-bg)
                    display: inline-block
                    padding: 4px 12px
                    border-radius: 40px
                    color: var(--primary-color)

                    &.invaild
                        background: var(--location-dest-err-bg)
                        color: var(--location-dest-err-color)

                &-guide
                    margin-top: 12px
                    font-size: 0.7rem
                    color: var(--primary-color)

                    &.invaild
                        color: var(--location-dest-err-color)

            &-btn
                background: var(--primary-color)
                border: none
                width: 100%
                padding: 18px
                border-radius: 60px
                font-weight: 700
                font-size: 1.2rem
                color: white
                display: flex
                align-items: center
                justify-content: center
                gap: 12px
                cursor: pointer
                transition: all 0.2s
                box-shadow: 0 8px 20px rgba(45, 106, 79, 0.3)
                margin-bottom: 20px

                &:active
                    transform: scale(0.98)

                &:disabled
                    background: var(--clock-btn-disabled-color)
                    cursor: not-allowed
                    box-shadow: none

            &-status
                background: var(--clock-status-bg)
                border-radius: 28px
                padding: 16px
                font-size: 0.8rem
                display: flex
                justify-content: space-between
                align-items: center
                flex-wrap: wrap
                gap: 10px
                overflow-x: hidden

                &-list
                    overflow-x: auto
                    display: flex
                    flex-direction: row
                    gap: 10px

                &-item
                    &-dot
                        width: 10px
                        height: 10px
                        border-radius: 10px
                        display: inline-block
                        margin-right: 6px

                        &.sucess
                            background: var(--primary-color)
                        &.wait
                            background: var(--clock-status-wait)
                        &.miss
                            background: var(--clock-status-miss)

            &-noclock
                background: var(--clock-bg)
                border-radius: 24px
                padding: 16px
                margin-top: 8px
                border: 1px solid var(--clock-border)
                text-align: center
</style>
